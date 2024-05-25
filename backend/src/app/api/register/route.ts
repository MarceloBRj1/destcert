import prisma from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export const POST = async (request: NextRequest) => {
  try {
    const headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');

    const { email, password, username } = await request.json();

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return new NextResponse(JSON.stringify({ error: 'Email already exists' }), { status: 400, headers });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: username,
        password: hashedPassword,
      },
    });
    
    return new NextResponse(JSON.stringify((newUser)), { status: 201, headers });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
  }
};

export const OPTIONS = async (request: NextRequest) => {
  const headers = new Headers();
  headers.append('Access-Control-Allow-Origin', '*'); 
  headers.append('Access-Control-Allow-Methods', 'POST');
  headers.append('Access-Control-Allow-Headers', 'Content-Type');

  return new NextResponse(null, { status: 204, headers });
};