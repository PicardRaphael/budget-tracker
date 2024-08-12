import { createUserSettings } from '@/lib/back-end/createUserSettings';
import { getUserSettings } from '@/lib/back-end/getUserSettings';
import { authMiddleware } from '@/middleware/authMiddleware';
import { revalidatePath } from 'next/cache';
import { NextResponse } from 'next/server';

export async function handleUserSettingsRequest(userId: string) {
  let userSettings = await getUserSettings(userId);

  if (!userSettings) {
    userSettings = await createUserSettings(userId);
  }

  // Revalidate the home page that uses the user currency
  revalidatePath('/');
  return NextResponse.json(userSettings);
}
export async function GET(request: Request) {
  return authMiddleware(request, (userId) => handleUserSettingsRequest(userId));
}
