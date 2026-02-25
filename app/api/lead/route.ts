import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { z } from "zod";

const LeadPayloadSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(3),
  messenger: z.string().min(2),
  message: z.string().min(3),
  source: z.string().min(2)
});

async function sendToTelegram(payload: z.infer<typeof LeadPayloadSchema>) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) return;

  const text = [
    "Новая заявка с сайта",
    `Имя: ${payload.name}`,
    `Контакт: ${payload.phone}`,
    `Канал: ${payload.messenger}`,
    `Источник: ${payload.source}`,
    `Сообщение: ${payload.message}`
  ].join("\n");

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,
      text
    })
  });
}

async function sendEmail(payload: z.infer<typeof LeadPayloadSchema>) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT ?? "0");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SMTP_TO;
  const from = process.env.SMTP_FROM ?? user;

  if (!host || !port || !user || !pass || !to || !from) return;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: {
      user,
      pass
    }
  });

  await transporter.sendMail({
    from,
    to,
    subject: `Новая заявка (${payload.source})`,
    text: [
      `Имя: ${payload.name}`,
      `Контакт: ${payload.phone}`,
      `Канал: ${payload.messenger}`,
      `Сообщение: ${payload.message}`,
      `Источник: ${payload.source}`
    ].join("\n")
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = LeadPayloadSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: "INVALID_PAYLOAD"
        },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV !== "production") {
      console.log("[lead] payload", parsed.data);
    }

    await Promise.allSettled([sendToTelegram(parsed.data), sendEmail(parsed.data)]);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        ok: false,
        error: "SERVER_ERROR"
      },
      { status: 500 }
    );
  }
}
