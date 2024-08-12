import { NextResponse } from 'next/server';
import { ZodError } from 'zod';

export function handleValidationError(error: ZodError) {
  return NextResponse.json({ error: error.errors }, { status: 400 });
}

export function handleServerError(error: unknown) {
  console.error('Server error:', error);
  return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
}
