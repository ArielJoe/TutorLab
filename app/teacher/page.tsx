"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getStudent, getStudentsByName } from "../actions/student/actions";
import Navbar from "../components/Navbar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getTeacher, getTeachersByName } from "../actions/teacher/actions";

interface Teacher {
  id: number;
  name: string | null;
  birth_date: Date | null;
  address: string | null;
  phone_number: string | null;
}

export default function Teacher() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherName, setTeacherName] = useState("");

  useEffect(() => {
    const fetchTeachers = async () => {
      const teacherData = await getTeacher();
      setTeachers(teacherData);
    };

    fetchTeachers();
  }, []);

  async function fetchAllTeachers() {
    const teachers = await getTeacher();
    return teachers;
  }

  async function fetchTeachers() {
    if (teacherName) {
      const teacherData = await getTeachersByName(teacherName);
      if (teacherData.length !== 0) {
        setTeachers(teacherData);
        toast({
          description: `${teacherName} found`,
        });
      } else {
        toast({
          description: `${teacherName} not found`,
        });
        setTeachers([]);
      }
    } else {
      toast({
        description: `Teacher Name can't be empty`,
      });
    }
  }

  return (
    <div className="w-[100%]">
      <Navbar title="Teachers List" />
      <div className="p-5 grid gap-5">
        <div className="flex items-center gap-2">
          <Search onClick={fetchTeachers} className="cursor-pointer" />
          <Input
            placeholder="John Doe"
            onChange={async (e) => {
              setTeacherName(e.target.value);
              if (e.target.value === "") {
                const teachers = fetchAllTeachers();
                setTeachers(await teachers);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchTeachers();
              }
            }}
          />
        </div>
        <Table className="border">
          <TableHeader>
            <TableRow>
              <TableHead>Teacher ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Birth Date</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teachers.map((teacher) => (
              <TableRow key={teacher.id}>
                <TableCell className="p-5">{teacher.id}</TableCell>
                <TableCell>{teacher.name}</TableCell>
                <TableCell>
                  {teacher.birth_date!.toISOString().split("T")[0]}
                </TableCell>
                <TableCell>{teacher.address}</TableCell>
                <TableCell>{teacher.phone_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
