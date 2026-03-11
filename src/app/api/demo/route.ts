import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const UPLOADS_FILE = path.join(DATA_DIR, 'uploads.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads', 'demos');

// Allowed file types for demo uploads
const ALLOWED_MIME_TYPES = [
  'audio/mpeg',
  'audio/mp3',
  'audio/wav',
  'audio/x-wav',
  'audio/ogg',
  'audio/flac',
  'audio/aiff',
  'audio/x-aiff',
];

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

interface DemoUpload {
  id: string;
  artist_name: string;
  email: string;
  genre: string;
  message: string;
  fileName: string;
  fileSize: number;
  timestamp: string;
}

// Ensure required directories and files exist
async function ensureUploadsStructure() {
  try {
    await fs.access(UPLOADS_DIR);
  } catch {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  }

  try {
    await fs.access(UPLOADS_FILE);
  } catch {
    await fs.writeFile(UPLOADS_FILE, '[]', 'utf-8');
  }
}

// POST handler - handle demo uploads
export async function POST(request: NextRequest) {
  try {
    await ensureUploadsStructure();

    const formData = await request.formData();
    
    // Extract fields
    const artist_name = formData.get('artist_name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const genre = formData.get('genre')?.toString() || '';
    const message = formData.get('message')?.toString() || '';
    const file = formData.get('file') as File | null;

    // Validate required fields
    if (!artist_name || !email || !file) {
      return NextResponse.json(
        { error: 'Missing required fields: artist_name, email, and file are required' },
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

    // Validate file type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Allowed: MP3, WAV, OGG, FLAC, AIFF' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 50MB' },
        { status: 400 }
      );
    }

    // Generate unique filename
    const fileExt = path.extname(file.name).toLowerCase();
    const uniqueId = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    const safeArtistName = artist_name.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newFileName = `${safeArtistName}_${uniqueId}${fileExt}`;
    const filePath = path.join(UPLOADS_DIR, newFileName);

    // Save file
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    await fs.writeFile(filePath, buffer);

    // Create upload metadata
    const uploadEntry: DemoUpload = {
      id: `demo_${uniqueId}`,
      artist_name: artist_name.trim(),
      email: email.trim().toLowerCase(),
      genre: genre.trim(),
      message: message.trim(),
      fileName: newFileName,
      fileSize: file.size,
      timestamp: new Date().toISOString(),
    };

    // Save metadata to uploads.json
    const existingData = await fs.readFile(UPLOADS_FILE, 'utf-8');
    const uploads: DemoUpload[] = JSON.parse(existingData);
    uploads.push(uploadEntry);
    await fs.writeFile(UPLOADS_FILE, JSON.stringify(uploads, null, 2), 'utf-8');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Demo uploaded successfully',
        data: {
          id: uploadEntry.id,
          fileName: newFileName,
          artist_name: uploadEntry.artist_name,
        }
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error uploading demo:', error);
    return NextResponse.json(
      { error: 'Failed to upload demo' },
      { status: 500 }
    );
  }
}

// GET handler - list all demo uploads
export async function GET() {
  try {
    await ensureUploadsStructure();
    const data = await fs.readFile(UPLOADS_FILE, 'utf-8');
    const uploads = JSON.parse(data);
    return NextResponse.json(uploads);
  } catch (error) {
    console.error('Error reading uploads:', error);
    return NextResponse.json(
      { error: 'Failed to read uploads' },
      { status: 500 }
    );
  }
}
