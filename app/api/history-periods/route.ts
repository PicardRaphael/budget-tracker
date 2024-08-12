import { getHistoryPeriods } from '@/lib/back-end/getHistoryPeriods';
import { authMiddleware } from '@/middleware/authMiddleware';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
export async function handleHistoryPeriodsRequest(userId: string) {
  const periods = await getHistoryPeriods(userId);
  return Response.json(periods);
}
export async function GET(request: Request) {
  return authMiddleware(request, (userId) =>
    handleHistoryPeriodsRequest(userId)
  );
}
