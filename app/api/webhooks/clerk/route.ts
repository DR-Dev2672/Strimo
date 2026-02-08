

export const runtime = "nodejs";


import { Webhook } from "svix";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

const connectionString = process.env.DATABASE_URL;




export async function POST(req: Request){

  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

    let event: WebhookEvent;

   const payload  = await req.text()
   
   
   console.log(payload)

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
  

  if (eventType === "user.created") {
    console.log("this works");
    

  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      email: 'alice@prisma.io',
      posts: {
        create: {
          title: 'Hello World',
          content: 'This is my first post!',
          published: true,
        },
      },
    },
    // include: {
    //   posts: true,
    // },
  })
  console.log('Created user:', user)

    
  }

  // if (eventType === "user.updated") {
  //   await db.user.update({
  //     where: {
  //       externalUserId: payload.data.id,
  //     },
  //     data: {
  //       username: payload.data.username,
  //       imageUrl: payload.data.image_url,
  //     },
  //   });
  // }
 
  // if (eventType === "user.deleted") {
  //   // await resetIngresses(payload.data.id);
    

  //   await db.user.delete({
  //     where: {
  //       externalUserId: payload.data.id,
  //     },
  //   });
  // }
 
  return new Response('', { status: 200 })
}
