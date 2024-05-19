import prisma from '../../../../lib/prisma';

import { NextRequest, NextResponse } from 'next/server';
export const POST = async (_request: NextRequest) => {
  const { email, password } = await _request.json();
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });
    if(!user || user.password !== password) {
      return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }
    return new NextResponse(JSON.stringify("Login with sucess"), { status: 200 });
  } catch (error) {
    console.error (error);
  }
};

export const GET = async (_request: NextRequest) => {
  return new NextResponse('hello');
}