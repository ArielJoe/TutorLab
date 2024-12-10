"use server";

import prisma from "../../lib/db";

interface Teacher {
  id: number;
  name: string | null;
  birth_date: Date | null;
  address: string | null;
  phone_number: string | null;
}

export async function getTeacher(): Promise<Teacher[]> {
  const teachers = await prisma.teacher.findMany();
  return teachers;
}

export async function getTeachersByName(name: string): Promise<Teacher[]> {
  return await prisma.teacher.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
}
