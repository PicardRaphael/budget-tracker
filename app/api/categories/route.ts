import { handleServerError, handleValidationError } from '@/lib/apiHelpers';
import { getCategory } from '@/lib/back-end/getCategory';
import { authMiddleware } from '@/middleware/authMiddleware';
import { NextResponse } from 'next/server';
import { z } from 'zod';

async function handleCategoriesRequest(userId: string, request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const paramType = searchParams.get('type');
    const validator = z.enum(['expense', 'income']);
    const queryParams = validator.safeParse(paramType);

    if (!queryParams.success) {
      return handleValidationError(queryParams.error);
    }

    const type = queryParams.data;
    const categories = await getCategory(userId, type);

    return NextResponse.json(categories);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function GET(request: Request) {
  return authMiddleware(request, (userId) =>
    handleCategoriesRequest(userId, request)
  );
}
