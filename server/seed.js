import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

async function main() {
  const numberOfEntries = 15; 

  for (let i = 0; i < numberOfEntries; i++) {
    // const age = faker.date.past({ years: 1000 });
    await prisma.book.create({
      data: {
        title: faker.person.fullName(),
        author: faker.person.fullName(),
        genre: faker.helpers.arrayElement([
          'Sci_fi',
          'Romantic',
          'Devotional',
          'Action',
          'Fantasy',
          'Historical_Fiction',
          'Horror',
          'Non_Fiction',
          'Biography',
          'Self_Help',
          'Young_Adult'

        ]),
        price: faker.number.int({max:1000}),
        availability: faker.datatype.boolean(),
        
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });