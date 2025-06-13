import { NextRequest, NextResponse } from 'next/server';

// Backend server configuration
const PYTHON_BACKEND_URL = process.env.PYTHON_BACKEND_HOST || 'http://localhost:8001';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Forward all query parameters to the backend
    const backendUrl = `${PYTHON_BACKEND_URL}/api/wiki_cache?${searchParams.toString()}`;
    
    const response = await fetch(backendUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend responded with status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching wiki cache:', error);
    return NextResponse.json(
      { error: 'Failed to connect to the Python backend' },
      { status: 503 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const response = await fetch(`${PYTHON_BACKEND_URL}/api/wiki_cache`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend responded with status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error saving wiki cache:', error);
    return NextResponse.json(
      { error: 'Failed to connect to the Python backend' },
      { status: 503 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Forward all query parameters to the backend
    const backendUrl = `${PYTHON_BACKEND_URL}/api/wiki_cache?${searchParams.toString()}`;
    
    const response = await fetch(backendUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend responded with status: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error deleting wiki cache:', error);
    return NextResponse.json(
      { error: 'Failed to connect to the Python backend' },
      { status: 503 }
    );
  }
} 