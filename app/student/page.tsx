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
import {
  deleteStudentById,
  getStudent,
  getStudentsByName,
  updateStudent,
} from "../actions/student/actions";
import Navbar from "../components/Navbar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Trash2, Pencil, CalendarIcon } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface Student {
  id: number;
  name: string | null;
  birth_date: Date | null;
  address: string | null;
  email: string | null;
  phone_number: string | null;
}

export default function Student() {
  const [students, setStudents] = useState<Student[]>([]);
  const [studentName, setStudentName] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [editableStudent, setEditableStudent] = useState<Student | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentData = await getStudent();
      setStudents(studentData);
    };

    fetchStudents();
  }, [refresh]);

  async function fetchAllStudents() {
    const students = await getStudent();
    return students;
  }

  async function fetchStudents() {
    if (studentName) {
      const studentData = await getStudentsByName(studentName);
      if (studentData.length !== 0) {
        setStudents(studentData);
        toast({
          className: "bg-green-900",
          description: `${studentName} found`,
        });
      } else {
        toast({
          variant: "destructive",
          description: `${studentName} not found`,
        });
        setStudents([]);
      }
    } else {
      toast({
        variant: "destructive",
        description: `Student Name can't be empty`,
      });
    }
  }

  async function handleDelete(name: string, id: number) {
    await deleteStudentById(id);
    setRefresh((prev) => !prev);
    toast({
      className: "bg-green-900",
      description: `${name} deleted successfully`,
    });
  }

  async function handleUpdate() {
    if (editableStudent) {
      await updateStudent(editableStudent);
      setRefresh((prev) => !prev);
      toast({
        className: "bg-green-900",
        description: `${editableStudent.name} updated successfully`,
      });
    }
  }

  return (
    <div className="w-[100%]">
      <Navbar title="Students List" />
      <div className="flex items-center gap-2 p-5">
        <Search onClick={fetchStudents} className="cursor-pointer" />
        <Input
          placeholder="John Doe"
          onChange={async (e) => {
            setStudentName(e.target.value);
            if (e.target.value === "") {
              const students = await fetchAllStudents();
              setStudents(students);
            }
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              fetchStudents();
            }
          }}
        />
      </div>
      {students.length > 0 ? (
        <div className="px-5 grid gap-5">
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead>Student ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Birth Date</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="p-5">{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>
                    {student.birth_date!.toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell>{student.address}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.phone_number}</TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button
                            className="bg-yellow-300 w-[40px]"
                            onClick={() => setEditableStudent(student)}
                          >
                            <Pencil className="text-black" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent>
                          <SheetHeader>
                            <SheetTitle>Edit Student</SheetTitle>
                          </SheetHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Name</Label>
                              <Input
                                className="col-span-3"
                                value={editableStudent?.name || ""}
                                onChange={(e) =>
                                  setEditableStudent({
                                    ...editableStudent!,
                                    name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Birth Date</Label>
                              <Input
                                type="date"
                                className="col-span-3"
                                value={
                                  editableStudent?.birth_date
                                    ? editableStudent.birth_date
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                                }
                                onChange={(e) => {
                                  const selectedDate = e.target.value;
                                  setEditableStudent({
                                    ...editableStudent!,
                                    birth_date: selectedDate
                                      ? new Date(selectedDate)
                                      : null,
                                  });
                                }}
                              />
                            </div>

                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Address</Label>
                              <Input
                                className="col-span-3"
                                value={editableStudent?.address || ""}
                                onChange={(e) =>
                                  setEditableStudent({
                                    ...editableStudent!,
                                    address: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Email</Label>
                              <Input
                                className="col-span-3"
                                value={editableStudent?.email || ""}
                                onChange={(e) =>
                                  setEditableStudent({
                                    ...editableStudent!,
                                    email: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label className="text-right">Phone Number</Label>
                              <Input
                                className="col-span-3"
                                value={editableStudent?.phone_number || ""}
                                onChange={(e) =>
                                  setEditableStudent({
                                    ...editableStudent!,
                                    phone_number: e.target.value,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <SheetFooter>
                            <Button onClick={handleUpdate}>Save changes</Button>
                            <SheetClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </SheetClose>
                          </SheetFooter>
                        </SheetContent>
                      </Sheet>
                      <Dialog>
                        <DialogTrigger>
                          <div className="bg-red-500 h-full rounded-md flex justify-center items-center w-[40px]">
                            <Trash2 className="text-black w-4" />
                          </div>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete {student.name}?</DialogTitle>
                            <DialogDescription>
                              This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          <Button
                            variant="destructive"
                            onClick={() => {
                              handleDelete(student.name!, student.id);
                            }}
                          >
                            Delete
                          </Button>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="p-5 text-center">Data Not Found</div>
      )}
    </div>
  );
}
