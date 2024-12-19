"use client";

import { User } from "lucide-react";
import Navbar from "../../components/Navbar";
import { getStudent } from "../actions/student/actions";
import { useEffect, useState } from "react";
import Chart from "../../components/LineChart";

interface Student {
  id: string;
  name: string | null;
  birth_date: Date | null;
  address: string | null;
  email: string | null;
  phone_number: string | null;
}

export default function Dashboard() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentData = await getStudent();
      setStudents(studentData);
    };

    fetchStudents();
  }, []);

  return (
    <div>
      <Navbar title="Dashboard" />
      <div className="w-full flex p-5 gap-5">
        <div className="w-[50%]">
          <Chart />
        </div>
        <div className="flex justify-between items-center border border-primary rounded-md w-[50%] p-3 h-12">
          <div className="flex gap-2">
            <User />
            <p>Students</p>
          </div>
          <p>{students.length}</p>
        </div>
      </div>
    </div>
  );
}
