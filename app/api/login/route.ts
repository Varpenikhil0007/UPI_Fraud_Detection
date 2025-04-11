import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const baseUrl = process.env.API_URL || 'https://upi-fraud-detection-backend1.onrender.com';
    const data = await request.json();

    const response = await fetch(`${baseUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    });

    const responseData = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: responseData.error || 'Login failed' },
        { status: response.status }
      );
    }

    // Create response with the user data
    const jsonResponse = NextResponse.json({
      name: responseData.name,
      email: responseData.email,
      token: responseData.token
    });

    // Set the token in an HTTP-only cookie
    jsonResponse.cookies.set({
      name: 'token',
      value: responseData.token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/'
    });

    return jsonResponse;
  } catch (error: any) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}