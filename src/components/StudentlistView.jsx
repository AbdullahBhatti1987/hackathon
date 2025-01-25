import React from "react";

function StudentlistView({ array }) {
  return (
    <div>
      <table className="table-auto w-full bg-white shadow-md rounded-lg overflow-hidden text-sm border">
        <thead className="border">
          <tr className="bg-gray-200 text-sm border">
            <th className=" border p-1">ID</th>
            <th className=" border p-1">Image</th>
            <th className=" border p-1">Full Name</th>
            <th className=" border p-1">Email</th>
            <th className=" border p-1">Mobile Number</th>
            <th className=" border p-1">CNIC</th>
            <th className=" border p-1">Father's CNIC</th>
            <th className=" border p-1">Gender</th>
            <th className=" border p-1">Date of Birth</th>
            <th className=" border p-1">Country</th>
            <th className=" border p-1">City</th>
            <th className=" border p-1">Computer Proficiency</th>
            <th className=" border p-1">Last Qualification</th>
            <th className=" border p-1">Has Laptop?</th>
            <th className=" border p-1">Address</th>
          </tr>
        </thead>
        <tbody>
          {array.map((student) => (
            <tr key={student.roll_Number} className="border-t text-sm">
              <td className=" border p-1 text-center">{student.roll_Number}</td>
              <td className=" border p-1 text-center">
                <img src={student.image} className="w-12" />
              </td>
              <td className=" border p-1 text-start">{student.fullname}</td>
              <td className=" border p-1 text-start">{student.email}</td>
              <td className=" border p-1 text-center">
                {student.mobile_Number}
              </td>
              <td className=" border p-1 text-center">{student.cnic}</td>
              <td className=" border p-1 text-center">{student.father_CNic}</td>
              <td className=" border p-1 text-center">{student.gender}</td>
              <td className=" border p-1 text-center">
                {student.date_of_birth}
              </td>
              <td className=" border p-1 text-center">{student.country}</td>
              <td className=" border p-1 text-center">{student.city}</td>
              <td className=" border p-1 text-center">
                {student.computerproficiency}
              </td>
              <td className=" border p-1 text-center">
                {student.last_qualification}
              </td>
              <td className=" border p-1 text-center">
                {student.do_you_have_laptop}
              </td>
              <td className=" border p-1 text-start">{student.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentlistView;
