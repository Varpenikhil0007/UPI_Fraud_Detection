import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const reportDbUri = 'mongodb+srv://varpenikhil07:zjj8uEKSyT3EW1ex@upi-report-entry.nhpwogo.mongodb.net/?retryWrites=true&w=majority&appName=upi-report-entry';
const reportClient = new MongoClient(reportDbUri);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Connect to the reports database
    await reportClient.connect();
    const db = reportClient.db('upi-reports');
    const reportsCollection = db.collection('reports');

    // Add timestamp to the report
    const reportData = {
      ...body,
      timestamp: new Date(),
    };

    // Insert the report into the database
    const result = await reportsCollection.insertOne(reportData);

    return NextResponse.json({
      message: 'Report submitted successfully',
      reportId: result.insertedId
    }, { status: 201 });

  } catch (error) {
    console.error('Error submitting report:', error);
    return NextResponse.json({
      error: 'Failed to submit report'
    }, { status: 500 });
  } finally {
    // Close the database connection
    await reportClient.close();
  }
}