import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const { url, params = {}, headers = {} } = await req.json();

  console.log("Request:", { url, params, headers });

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", 
      prompt: params.prompt,
      max_tokens: params.max_tokens || 60
    });

    console.log("Response:", response.data);

    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ message: error.message });
  }
}
