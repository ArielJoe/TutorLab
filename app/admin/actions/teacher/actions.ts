"use server";

import prisma from "../../../lib/db";

interface Teacher {
  id: string;
  name: string | null;
  address: string | null;
  email: string | null;
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

export async function updateTeacher(data: Teacher) {
  await prisma.teacher.update({
    where: { id: data.id },
    data,
  });
}

export async function deleteTeacherById(id: string) {
  await prisma.studyContract.deleteMany({
    where: {
      Schedule_Teacher_id: id,
    },
  });

  await prisma.teacher.delete({
    where: {
      id: id,
    },
  });
}
