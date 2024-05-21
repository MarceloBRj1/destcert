import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { SignJWT } from 'jose';

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new NextResponse(JSON.stringify({ error: 'Invalid credentials' }), { status: 401 });
    }

    const payload = {
      userId: user.id,
      userEmail: user.email,
    };

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return new NextResponse(
      JSON.stringify({ token, userId: user.id }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to login' }), { status: 500 });
  }
};
