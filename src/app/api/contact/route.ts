import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTACTS_FILE = path.join(DATA_DIR, 'contacts.json');

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

// Ensure data directory and contacts file exist
async function ensureContactsFile() {
  try {
    await fs.access(CONTACTS_FILE);
  } catch {
    await fs.writeFile(CONTACTS_FILE, '[]', 'utf-8');
  }
}

// GET handler (optional - for listing contacts)
export async function GET() {
  try {
    await ensureContactsFile();
    const data = await fs.readFile(CONTACTS_FILE, 'utf-8');
    const contacts = JSON.parse(data);
    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error reading contacts:', error);
    return NextResponse.json(
      { error: 'Failed to read contacts' },
      { status: 500 }
    );
  }
}

// POST handler - save contact form submissions
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, message' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Ensure contacts file exists
    await ensureContactsFile();

    // Read existing contacts
    const existingData = await fs.readFile(CONTACTS_FILE, 'utf-8');
    const contacts: ContactSubmission[] = JSON.parse(existingData);

    // Create new contact entry
    const newContact: ContactSubmission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
    };

    // Add to array and save
    contacts.push(newContact);
    await fs.writeFile(CONTACTS_FILE, JSON.stringify(contacts, null, 2), 'utf-8');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Contact form submitted successfully',
        id: newContact.id 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact:', error);
    return NextResponse.json(
      { error: 'Failed to save contact submission' },
      { status: 500 }
    );
  }
}
