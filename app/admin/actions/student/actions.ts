"use server";

import prisma from "../../../lib/db";

interface Student {
  id: string;
  name: string | null;
  birth_date: Date | null;
  address: string | null;
  email: string | null;
  phone_number: string | null;
  parents_phone_number: string | null;
}

export async function getStudent(): Promise<Student[]> {
  const students = await prisma.student.findMany();
  return students;
}

export async function getStudentsByName(name: string): Promise<Student[]> {
  return await prisma.student.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  });
}

export async function updateStudent(data: Student) {
  await prisma.student.update({
    where: { id: data.id },
    data,
  });
}

export async function deleteStudentById(id: string) {
  await prisma.selectedCourse.deleteMany({
    where: {
      Invoice_Student_id: id,
    },
  });

  await prisma.studentAttendance.deleteMany({
    where: {
      StudyContract_Student_id: id,
    },
  });

  await prisma.studyContract.deleteMany({
    where: {
      Student_id: id,
    },
  });

  await prisma.invoice.deleteMany({
    where: {
      Student_id: id,
    },
  });

  await prisma.student.delete({
    where: {
      id: id,
    },
  });
}
