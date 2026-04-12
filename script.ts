import { prisma } from "./lib/prisma"


async function main() {
  const user = await prisma.user.create({
    data: {
      username: 'alice',
      imageUrl: 'https://example.com/alice.jpg',
      externalUserId: 'external-alice-123',
      bio: 'Hello, I am Alice!',
    },
  })
  console.log('Created user:', user)

  // Fetch all users
  const allUsers = await prisma.user.findMany()
  console.log('All users:', JSON.stringify(allUsers, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })