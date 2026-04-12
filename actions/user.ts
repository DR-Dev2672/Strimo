"use server";


import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { getSelf } from "@/lib/auth-service";
import { User } from "@/generated/prisma/client";

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf();

  const validData = {
    bio: values.bio,
  };

  const user = await prisma.user.update({
    where: { id: self.id },
    data: { ...validData }
  });

  revalidatePath(`/${self.username}`);
  revalidatePath(`/u/${self.username}`);

  return user;
};