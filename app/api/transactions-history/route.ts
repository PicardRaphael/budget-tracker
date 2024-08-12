import { handleServerError, handleValidationError } from '@/lib/apiHelpers';
import { getTransactionsHistory } from '@/lib/back-end/getTransactionsHistory';
import { authMiddleware } from '@/middleware/authMiddleware';
import { OverviewQuerySchema } from '@/schema/overview';
import { NextResponse } from 'next/server';

async function handleTransactionsHistoryRequest(
  userId: string,
  request: Request
) {
  try {
    const { searchParams } = new URL(request.url);
    const from = searchParams.get('from');
    const to = searchParams.get('to');

    const queryParams = OverviewQuerySchema.safeParse({
      from,
      to,
    });

    if (!queryParams.success) {
      return handleValidationError(queryParams.error);
    }

    const transactions = await getTransactionsHistory(
      userId,
      queryParams.data.from,
      queryParams.data.to
    );
    return NextResponse.json(transactions);
  } catch (error) {
    return handleServerError(error);
  }
}
export async function GET(request: Request) {
  return authMiddleware(request, (userId) =>
    handleTransactionsHistoryRequest(userId, request)
  );
}
