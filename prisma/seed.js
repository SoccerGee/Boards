const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    /*
        Add DB seed here.
    */
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
