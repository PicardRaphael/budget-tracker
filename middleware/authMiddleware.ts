import { currentUser } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function authMiddleware(
  request: Request,
  handler: (userId: string) => Promise<Response>
) {
  const user = await currentUser();
  if (!user) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }
  return handler(user.id);
}
