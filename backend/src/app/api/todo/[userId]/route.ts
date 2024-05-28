import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../../../../lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { StatusCodes } from 'http-status-codes';

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.pathname.split('/').pop();

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: Number(userId),
        deleted: false,
      },
    });

    if (!todos || todos.length === 0) {
      return NextResponse.json({ error: 'Nenhum todo encontrado para este usuário' }, { status: 404 });
    }

    return NextResponse.json(todos, { status: 200 });
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Erro ao buscar tarefas do usuário' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { userId, name, completed } = await request.json();

    if (!userId || !name) {
      return NextResponse.json({ error: 'User ID and name are required' }, { status: 400 });
    }

    const newTodo = await prisma.todo.create({
      data: {
        userId: Number(userId),
        name: name,
        completed: completed ?? false, 
        deleted: false,
      },
    });

    return NextResponse.json(newTodo, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Erro ao criar nova tarefa' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const urlParts = request.url.split('/');
  const todoIdIndex = urlParts.indexOf('todo') + 1;
  const todoId = parseInt(urlParts[todoIdIndex]);

  try {
    const todo = await prisma.todo.findUnique({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    }
    await prisma.todo.delete({
      where: {
        id: todoId,
      },
    });

    return NextResponse.json({ message: 'Todo deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
}

