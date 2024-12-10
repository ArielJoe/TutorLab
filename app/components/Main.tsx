"use client";

import addStudent from "../actions/student/actions";

export default function Home() {
  function handleClick() {
    addStudent({
      name: "Udin",
      birth_date: new Date("2005-04-28"),
      address: "Jl. ABC No.123",
    });
  }

  return (
    <div className="grid gap-2">
      <button className="bg-red-500 p-2" onClick={handleClick}>
        add
      </button>
      <button className="bg-red-500 p-2">remove</button>
    </div>
  );
}
