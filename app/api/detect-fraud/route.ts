
import { NextResponse } from 'next/server';

export async function POST() {
  // Alternating mock response for clear UI testing
  const mockResult = Math.random() < 0.5
    ? { isFraud: true, confidence: 0.85 }
    : { isFraud: false, confidence: 0.92 };

  await new Promise(resolve => setTimeout(resolve, 500));
  return NextResponse.json(mockResult);
}