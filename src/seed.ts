// Importa el Prisma Client y otros módulos necesarios
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid'; // Importa la función v4 de uuid para generar UUIDs

// Crea una instancia del Prisma Client
const prisma = new PrismaClient();

// Función para cargar los datos semilla
async function main() {
  try {
    // Crear autores (si aún no existen)
    const author1 = await prisma.author.create({
      data: { id: uuidv4(), name: 'J.K. Rowling' },
    });

    const author2 = await prisma.author.create({
      data: { id: uuidv4(), name: 'George R.R. Martin' },
    });

    // Crear categorías (si aún no existen)
    const category1 = await prisma.category.create({
      data: { id: uuidv4(), name: 'Fantasy' },
    });

    const category2 = await prisma.category.create({
      data: { id: uuidv4(), name: 'Mystery' },
    });

    // Crear libros
    const books = [
      {
        id: uuidv4(),
        title: 'Harry Potter and the Philosopher\'s Stone',
        isbn: '9780590353427',
        authorId: author1.id,
      },
      {
        id: uuidv4(),
        title: 'A Game of Thrones',
        isbn: '9780553103540',
        authorId: author2.id,
      },
      // Agrega más libros según sea necesario
    ];

    // Crear los libros y conectar con categorías
    for (const book of books) {
      const createdBook = await prisma.book.create({
        data: {
          id: book.id,
          title: book.title,
          isbn: book.isbn,
          author: {
            connect: { id: book.authorId },
          },
          categories: {
            connect: [
              { id: category1.id }, // Conectar con la categoría 1
              { id: category2.id }, // Conectar con la categoría 2
            ],
          },
          copies: {
            create: [
              {
                format: 'Hardcover',
                location: 'Shelf A',
                id: uuidv4()
              }
            ]
          }
        },
      });
      console.log(`Libro creado: ${createdBook.title}`);
    }

    console.log('Datos semilla creados correctamente');

  } catch (error) {
    console.error('Error al generar datos semilla:', error);
  } finally {
    // Cierra la conexión del Prisma Client al finalizar
    await prisma.$disconnect();
  }
}

// Ejecuta la función principal
main();
