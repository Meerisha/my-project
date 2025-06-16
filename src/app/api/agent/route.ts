import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';

// Set to true to use mock responses (useful when OpenAI quota is exceeded)
const USE_MOCK = true;

const mockResponses = [
  "Hello! I'm a test agent. I'm working perfectly, but currently using mock responses since your OpenAI quota needs attention.",
  "I can see your message! Once you resolve the OpenAI billing issue, I'll be powered by GPT-3.5 Turbo.",
  "Everything is set up correctly on the technical side. The only issue is the OpenAI API quota.",
  "Your agent infrastructure is working great! Just need to sort out the OpenAI credits.",
  "Mock response: I'm functioning well and ready to use real AI once the quota is resolved!"
];

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (USE_MOCK) {
      // Mock response for testing
      const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
      return NextResponse.json({ 
        response: `${randomResponse}\n\nYour message was: "${message}"`,
        timestamp: new Date().toISOString(),
        mode: 'mock'
      });
    }

    // Real OpenAI API call
    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      messages: [
        {
          role: 'system',
          content: 'You are a helpful test agent. Respond to user messages in a friendly and helpful way. Keep your responses concise but informative.'
        },
        {
          role: 'user',
          content: message
        }
      ],
    });

    return NextResponse.json({ 
      response: text,
      timestamp: new Date().toISOString(),
      mode: 'openai'
    });

  } catch (error) {
    console.error('Agent error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
} 