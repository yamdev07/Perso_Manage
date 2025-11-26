import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
  const employees = await prisma.employee.findMany();
  return new Response(JSON.stringify(employees), { status: 200 });
}

export async function POST(req) {
  const body = await req.json();
  const employee = await prisma.employee.create({ data: { ...body, salary: Number(body.salary) } });
  return new Response(JSON.stringify(employee), { status: 201 });
}

export async function PUT(req) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  const body = await req.json();
  const employee = await prisma.employee.update({ where: { id }, data: { ...body, salary: Number(body.salary) } });
  return new Response(JSON.stringify(employee), { status: 200 });
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const id = Number(url.searchParams.get("id"));
  await prisma.employee.delete({ where: { id } });
  return new Response(null, { status: 204 });
}
