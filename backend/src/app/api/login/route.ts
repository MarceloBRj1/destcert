import { Prisma, PrismaClient } from '@prisma/client';
import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose';


export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'Email does not exist' }), { status: 401 });
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    const payload = {
      id: user.id,
      email: user.email,
    };

    const token = await new SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('2h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return new NextResponse(JSON.stringify({ token, userId: user.id }), { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return new NextResponse(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
  }
};
  
export const GET = async (_request: NextRequest) => {
  return new NextResponse('hello');
}