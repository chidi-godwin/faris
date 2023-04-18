import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.merchant.createMany({
    data: [
      {
        name: 'Amazon',
        isBezosRelated: true,
      },
      {
        name: 'Washington Post',
        isBezosRelated: true,
      },
      {
        name: 'Whole Foods',
        isBezosRelated: true,
      },
      {
        name: 'Blue Origin',
        isBezosRelated: true,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
