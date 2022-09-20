const { PrismaClient } = require('@prisma/client');
const { env } = require('process');
const prisma = new PrismaClient();

async function main() {
  await prisma.member.create({
    data: {
      email: 'grant.tuttle@gmail.com',
      boards: {
        create: [
          {
            board: {
              connectOrCreate: {
                where: {
                  name: 'main',
                },
                create: {
                  name: 'main',
                }
              }
            }
          }
        ]
      }
    },
  });
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
