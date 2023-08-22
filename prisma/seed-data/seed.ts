import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('...Start seeding');

  await prisma.country.createMany({
    data: [{ name: 'Vietnam' }, { name: 'United States' }],
  });

  await prisma.state.createMany({
    data: [
      {
        countryId: 1,
        name: 'Lam Dong',
      },
      {
        countryId: 1,
        name: 'Ho Chi Minh',
      },
      {
        countryId: 1,
        name: 'Ha Noi',
      },
      {
        countryId: 2,
        name: 'Alaska',
      },
      {
        countryId: 2,
        name: 'California',
      },
    ],
  });

  await prisma.city.createMany({
    data: [
      {
        stateId: 1,
        name: 'Da Lat',
      },
      {
        stateId: 1,
        name: 'Bao Loc',
      },
      {
        stateId: 2,
        name: 'District 1',
      },
      {
        stateId: 2,
        name: 'District 2',
      },
      {
        stateId: 3,
        name: 'Hoan Kiem District',
      },
      {
        stateId: 3,
        name: 'Tay Ho District',
      },
      {
        stateId: 4,
        name: 'Adak',
      },
      {
        stateId: 4,
        name: 'Akiak',
      },
      {
        stateId: 5,
        name: 'Los Angeles',
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
