import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');
const RELEASES_FILE = path.join(DATA_DIR, 'releases.json');

// Ensure releases file exists
async function ensureReleasesFile() {
  try {
    await fs.access(RELEASES_FILE);
  } catch {
    // Create default releases if file doesn't exist
    const defaultReleases = [
      {
        id: 'BBX001',
        title: 'No Releases Yet',
        artist: 'BoomBoxx Records',
        releaseDate: new Date().toISOString().split('T')[0],
        catalogNumber: 'BBX001',
        format: 'Digital',
        genre: 'Electronic',
        coverImage: '/images/releases/placeholder.jpg',
        tracklist: [],
        links: {}
      }
    ];
    await fs.writeFile(RELEASES_FILE, JSON.stringify(defaultReleases, null, 2), 'utf-8');
  }
}

// GET handler - return all releases
export async function GET(request: NextRequest) {
  try {
    await ensureReleasesFile();
    const data = await fs.readFile(RELEASES_FILE, 'utf-8');
    const releases = JSON.parse(data);
    
    // Sort by release date (newest first)
    releases.sort((a: any, b: any) => 
      new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
    );

    return NextResponse.json(releases);
  } catch (error) {
    console.error('Error reading releases:', error);
    return NextResponse.json(
      { error: 'Failed to read releases' },
      { status: 500 }
    );
  }
}

// POST handler - add a new release (optional, for admin use)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, artist, releaseDate, catalogNumber, format, genre, coverImage, tracklist, links } = body;

    // Validate required fields
    if (!title || !artist || !catalogNumber) {
      return NextResponse.json(
        { error: 'Missing required fields: title, artist, catalogNumber' },
        { status: 400 }
      );
    }

    // Ensure releases file exists
    await ensureReleasesFile();

    // Read existing releases
    const existingData = await fs.readFile(RELEASES_FILE, 'utf-8');
    const releases = JSON.parse(existingData);

    // Check for duplicate catalog number
    if (releases.some((r: any) => r.catalogNumber === catalogNumber)) {
      return NextResponse.json(
        { error: `Release with catalog number ${catalogNumber} already exists` },
        { status: 400 }
      );
    }

    // Create new release entry
    const newRelease = {
      id: catalogNumber,
      title: title.trim(),
      artist: artist.trim(),
      releaseDate: releaseDate || new Date().toISOString().split('T')[0],
      catalogNumber: catalogNumber.trim().toUpperCase(),
      format: format || 'Digital',
      genre: genre || 'Electronic',
      coverImage: coverImage || '/images/releases/placeholder.jpg',
      tracklist: tracklist || [],
      links: links || {}
    };

    // Add to array and save
    releases.push(newRelease);
    await fs.writeFile(RELEASES_FILE, JSON.stringify(releases, null, 2), 'utf-8');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Release added successfully',
        release: newRelease
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error adding release:', error);
    return NextResponse.json(
      { error: 'Failed to add release' },
      { status: 500 }
    );
  }
}
