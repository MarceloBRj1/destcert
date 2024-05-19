import prisma
 from '../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
export const POST = async (_request: NextRequest) => {
  try {
    const { email, password, username } = await _request.json();
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    
    if (existingUser) {
      return new NextResponse(JSON.stringify({ error: 'Email already exists' }), { status: 400 });
    }
    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: username,
        password: password,
      }
    })

    return new NextResponse(JSON.stringify(newUser), { status: 200 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to create user' }), { status: 500 });
  }
};
