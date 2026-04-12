import { prisma } from "@/lib/prisma";

export const getStreamByUserId = async (userId: string) => {
  const stream = await prisma.stream.findUnique({
    where: { userId },
  });
  if(stream==null){
    throw new Error("Stream not found");
  }

  return stream;
};