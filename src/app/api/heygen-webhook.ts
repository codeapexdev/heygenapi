import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

const HEYGEN_WEBHOOK_SECRET = process.env.HEYGEN_API_KEY as string;

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('signature');

  if (!signature || !verifySignature(rawBody, signature)) {
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 });
  }

  try {
    const event = JSON.parse(rawBody);

    switch (event.event_type) {
      case 'avatar_video.success':
        const videoUrl = event.event_data.url;
        console.log(`Video successfully generated: ${videoUrl}`);
        // Implement additional logic (e.g., download the video, notify users)
        break;
      case 'avatar_video.fail':
        const errorMessage = event.event_data.msg;
        console.log(`Video generation failed: ${errorMessage}`);
        // Implement error handling logic
        break;
      default:
        console.log(`Unhandled event type: ${event.event_type}`);
    }

    return NextResponse.json({ message: 'Webhook received.' }, { status: 200 });
  } catch (error) {
    console.error('Error processing webhook event:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

function verifySignature(payload: string, signature: string): boolean {
  const hmac = crypto.createHmac('sha256', HEYGEN_WEBHOOK_SECRET);
  hmac.update(payload);
  const computedSignature = hmac.digest('hex');
  return computedSignature === signature;
}
