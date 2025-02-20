// src/app/api/submit-survey/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Parse the survey data
    const surveyData = await request.json();
    console.log('Original survey data:', JSON.stringify(surveyData));
    
    // Convert to array format expected by the Google Apps Script
    // The script expects an array where each element corresponds to a form item
    const formattedData = [
      surveyData.language || '',
      surveyData.referralSource || '',
      surveyData.languageLevel || '',
      surveyData.motivation || '',
      surveyData.dailyGoal || ''
    ];
    
    console.log('Formatted data for Google Script:', JSON.stringify(formattedData));
    
    // Latest Google Apps Script Web App URL
    const webAppUrl = 'https://script.google.com/macros/s/AKfycbym1tRa7V_x6coQwH7ta6pkhIVj6FWuECl2pCDtpT9ebGDfdse6SXr46bx3x4h6fXP2/exec';

    // Make the request to Google Apps Script
    const response = await fetch(webAppUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedData),
    });

    // Get the response text
    const responseText = await response.text();
    console.log('Google Apps Script response:', responseText);

    if (response.ok) {
      return NextResponse.json({ 
        message: 'Survey data submitted successfully',
        googleResponse: responseText
      }, { status: 200 });
    } else {
      return NextResponse.json({ 
        message: 'Failed to submit survey data',
        status: response.status,
        googleResponse: responseText
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in submit-survey API route:', error);
    
    return NextResponse.json({ 
      message: 'Error submitting survey data', 
      error: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}