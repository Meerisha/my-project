import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    const { text } = await generateText({
      model: openai('gpt-3.5-turbo'),
      prompt: message || 'What is love?',
    });

    return Response.json({ response: text });
  } catch (error) {
    console.error('Agent API Error:', error);
    return Response.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}