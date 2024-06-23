import { PrismaClient } from "@prisma/client";
import { Category } from "../domain/Category";
import { CategoryRepository } from "../domain/CategoryRepository";
import { CategoryId } from "../domain/CategoryId";
import { CategoryName } from "../domain/CategoryName";

export class PrismaCategoryRepository implements CategoryRepository {
  private readonly prismaClient = new PrismaClient().category;
  
  async save(category: Category): Promise<void> {
    await this.prismaClient.create({
      data: {
        id: category.toPrimitives().id,
        name: category.toPrimitives().name
      }
    })
  }

  async getAll(): Promise<Category[]> {
    const categoriesDB = await this.prismaClient.findMany({});

    if(categoriesDB.length == 0) {
      return [];
    }

    const categoriesDomain = categoriesDB.map(categoryDB => Category.create({
      id: new CategoryId(categoryDB.id),
      name: new CategoryName(categoryDB.name)
    }))

    return categoriesDomain
  }

}
