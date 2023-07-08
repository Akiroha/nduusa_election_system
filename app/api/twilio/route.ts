const twilio = require('twilio');
import { NextResponse } from 'next/server';

export async function POST(req: any) {
  const accountId = process.env.twilio_ACCOUNT_SID;
  const authToken = process.env.twilio_AUTH_TOKEN;
  const client = new twilio(accountId, authToken);

  const body = await req.json();
  const { path, users } = body;

  let promiseArray: any[] = [];

  users.forEach((user: any) => {
    promiseArray.push(
      sendPassword(client, user.name, user.phone, user.pass, path)
    );
  });

  let res = await Promise.all(promiseArray);

  return NextResponse.json(res);
}

const sendPassword = (
  client: any,
  name: string,
  phone: string,
  pass: string,
  path: string
) => {
  const message = `Hello ${name}!\nWelcome to the NDUUSA 2023 Elections\n\nPlease visit ${path} in order to vote. Your credentials are:\n\nPhone number: ${phone}\nPassword: ${pass}\n\nDO NOT REPLY.`;

  return client.messages.create({
    body: message,
    from: process.env.twilio_PHONE_NUMBER,
    to: phone,
  });
};
