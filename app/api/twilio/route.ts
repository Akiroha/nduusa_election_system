const twilio = require('twilio');
import { NextResponse } from 'next/server';

export async function POST(request: any) {
  console.log('request.data: ', request.data);
  const accountId = process.env.twilio_ACCOUNT_SID;
  const authToken = process.env.twilio_AUTH_TOKEN;
  const from = process.env.twilio_PHONE_NUMBER;

  const client = new twilio(accountId, authToken);

  const res = await client.messages.create({
    body: 'My guy, how far?',
    from: from,
    to: '+19083427114',
  });

  return NextResponse.json(res);
}
