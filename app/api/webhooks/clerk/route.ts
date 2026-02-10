

export const runtime = "nodejs";


import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

// const connectionString = process.env.DATABASE_URL;




export async function POST(req: Request){

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

    let event: WebhookEvent;

   const  payload  = await req.text()
   const parsedPayload = JSON.parse(payload)
   
  //  console.log(body.data)

  try {
    const headerPayload = headers();
    const svixHeaders = { 
      "svix-id": (await headerPayload).get("svix-id") ?? "",
      "svix-timestamp": (await headerPayload).get("svix-timestamp") ?? "",
      "svix-signature": (await headerPayload).get("svix-signature") ?? "",
    };

    // 3️ Verify webhook signature
    const webhook = new Webhook(WEBHOOK_SECRET);
     event = webhook.verify(payload, svixHeaders) as WebhookEvent;

                   
  } catch (error) {
    console.error("❌ Clerk Webhook Error:", error);
    return new NextResponse("Webhook verification failed", { status: 400 });
  }


  const eventType = event.type;
  console.log(eventType,"this is event type");
  console.log(parsedPayload.data);
  

  if (eventType === "user.created") {
    await prisma.user.create({
      data: {
        externalUserId: parsedPayload.data.id,
        username: parsedPayload.data.username,
        imageUrl: parsedPayload.data.image_url,
        stream: {
          create: {
            name: `${parsedPayload.data.username}'s stream`,
          },
        },
      },
    });

    
  }

  // if (eventType === "user.updated") {
  //   await prisma.user.update({
  //     where: {
  //       externalUserId: parsedPayload.data.id,
  //     },
  //     data: {
  //       username: parsedPayload.data.username,
  //       imageUrl: parsedPayload.data.image_url,
  //     },
  //   });
  // }
 
  // if (eventType === "user.deleted") {
  //   // await resetIngresses(parsedPayload.data.id);
    

  //   await prisma.user.delete({
  //     where: {
  //       externalUserId: parsedPayload.data.id,
  //     },
  //   });
  // }
 
  return new Response('', { status: 200 })
}
