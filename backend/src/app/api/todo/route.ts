import prisma from "../../../../lib/prisma";

export async function GET(request: Request) {
  const todos = await prisma.todo.findMany({
    where: {
      completed: true,
    }
  });
  return new Response(JSON.stringify(todos), { status: 200 });
}