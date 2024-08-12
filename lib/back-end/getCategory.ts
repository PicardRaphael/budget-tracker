import { TransactionType } from '@/types/type';
import { prisma } from '../prisma';

export async function getCategory(userId: string, type: TransactionType) {
  const categories = await prisma.category.findMany({
    where: {
      userId,
      ...(type && { type }), // include type in the filters if it's defined
    },
    orderBy: {
      name: 'asc',
    },
  });

  return categories;
}
export type GetCategoryResponseType = Awaited<ReturnType<typeof getCategory>>;
