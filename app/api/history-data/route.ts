import { handleServerError, handleValidationError } from '@/lib/apiHelpers';
import { getHistoryData } from '@/lib/back-end/getHistoryData';
import { authMiddleware } from '@/middleware/authMiddleware';
import { getHistoryDataSchema } from '@/schema/history';
import { NextResponse } from 'next/server';

async function handleHistoryDataRequest(userId: string, request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeframe = searchParams.get('timeframe');
    const year = searchParams.get('year');
    const month = searchParams.get('month');

    const queryParams = getHistoryDataSchema.safeParse({
      timeframe,
      year,
      month,
    });

    if (!queryParams.success) {
      return handleValidationError(queryParams.error);
    }
    const data = await getHistoryData(userId, queryParams.data.timeframe, {
      month: queryParams.data.month,
      year: queryParams.data.year,
    });
    return NextResponse.json(data);
  } catch (error) {
    return handleServerError(error);
  }
}
export async function GET(request: Request) {
  return authMiddleware(request, (userId) =>
    handleHistoryDataRequest(userId, request)
  );
}
