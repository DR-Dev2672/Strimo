"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
  TrackSource,
} from "livekit-server-sdk";



import { prisma } from "@/lib/prisma";
import { getSelf } from "@/lib/auth-service";
import { revalidatePath } from "next/cache";
console.log("URL:", process.env.LIVEKIT_URL);
console.log("KEY:", process.env.LIVEKIT_API_KEY);
console.log("SECRET:", process.env.LIVEKIT_API_SECRET);

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!,
);

const ingressClient = new IngressClient(process.env.LIVEKIT_URL!);

export const resetIngresses = async (hostIdentity: string) => {
  const ingresses = await ingressClient.listIngress({
    roomName: hostIdentity,
  });

  const rooms = await roomService.listRooms([hostIdentity]);

  for (const room of rooms) {
    await roomService.deleteRoom(room.name);
  }

  for (const ingress of ingresses) {
    if (ingress.ingressId) {
      await ingressClient.deleteIngress(ingress.ingressId);
    }
  }
};

export const createIngress = async (ingressType: IngressInput) => {
  const self = await getSelf();

  await resetIngresses(self.id);

  const options: CreateIngressOptions = {
    name: self.username,
    roomName: self.id,
    participantName: self.username,
    participantIdentity: self.id,
  };


  if (ingressType === IngressInput.WHIP_INPUT) {
    options.bypassTranscoding = true;
  } else {
    (options as any).video = {
      source: TrackSource.CAMERA,
      preset: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
    };
    (options as any).audio = {
      source: TrackSource.MICROPHONE,
      preset: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
    };
  }
 

  const ingress = await ingressClient.createIngress(
    ingressType,
    options,
  );
 

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create ingress");
  }
  await prisma.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey,
    },
  });

  revalidatePath(`/u/${self.username}/keys`);
  return ingress;
};