import { BeforeAll, AfterAll, After } from "@cucumber/cucumber";
import { BackofficeBackendApp } from "../../../../../../src/apps/backoffice/backend/BackofficeBackendApp";
import { PrismaClient } from "@prisma/client";

let application: BackofficeBackendApp;

BeforeAll(async () => {
  application = new BackofficeBackendApp();
  const prisma = new PrismaClient();

  await application.start();

  await prisma.author.create({
    data: {
      "id": "4efcbfa6-c063-46ee-a3fe-99da347f1507",
      "name": "Test auth"
    }
  })

  await prisma.category.create({
    data: {
      "id": "917a8905-5674-4150-bff4-fb263d4420fe",
      "name": "name"
    }
  });


});

AfterAll(async () => {
  const prisma = new PrismaClient();
  await prisma.copy.deleteMany();
  await prisma.book.deleteMany();
  await prisma.author.deleteMany();
  await prisma.category.deleteMany();
  await application.stop();
});

export { application }
