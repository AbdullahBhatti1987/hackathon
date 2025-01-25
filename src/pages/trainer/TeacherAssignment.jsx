// import React, { useContext, useState } from "react";
// import Modal from "react-modal";
// import Button from "@/components/Button";
// import Heading1 from "@/components/Heading1";
// import ModalHeading from "@/components/ModalHeading";
// import ButtonM from "@/components/ButtonM";
// import { AssignmentContext } from "@/context/Assignment";

// Modal.setAppElement("#root"); // Required for accessibility

// const TeacherAssignment = () => {
//   const { assignments, setAssignments } = useContext(AssignmentContext); // Use context properly
//   const [isModalOpen, setIsModalOpen] = useState(false); // To handle modal visibility
//   const [assignmentDetails, setAssignmentDetails] = useState({
//     assignmentTitle: "",
//     description: "",
//     dueDate: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setAssignmentDetails({
//       ...assignmentDetails,
//       [name]: value,
//     });
//   };

//   const handleAddAssignment = () => {
//     if (
//       assignmentDetails.assignmentTitle &&
//       assignmentDetails.description &&
//       assignmentDetails.dueDate
//     ) {
//       // Add the new assignment
//       setAssignments((prevAssignments) => [
//         ...prevAssignments,
//         assignmentDetails,
//       ]);

//       // Clear the form
//       setAssignmentDetails({
//         assignmentTitle: "",
//         description: "",
//         dueDate: "",
//       });

//       setIsModalOpen(false); // Close modal after adding assignment
//     }
//   };

//   return (
//     <div className="p-6">


//       <Heading1 text={"Assignments"} />

//       <ButtonM

//        text={"Add Assignment"}
//        startIcon={""}
//        onClick={() => setIsModalOpen(true)}
//      />
//       <Modal
//         isOpen={isModalOpen}
//         onRequestClose={() => setIsModalOpen(false)}
//         className={"modalStyle"}
//       >

//         <ModalHeading text={"Add Assignment"} />
//         <div className="mb-4">
//           <label
//             htmlFor="assignment-title"
//             className="block text-sm font-medium"
//           >
//             Assignment Title
//           </label>
//           <input
//             type="text"
//             id="assignment-title"
//             name="assignmentTitle"
//             value={assignmentDetails.assignmentTitle}
//             onChange={handleInputChange}
//             placeholder="Enter assignment title"
//             className="inputClass"
//           />
//         </div>

//         <div className="mb-4">
//           <label
//             htmlFor="assignment-description"
//             className="block text-sm font-medium"
//           >
//             Assignment Description
//           </label>
//           <textarea
//             id="assignment-description"
//             name="description"
//             value={assignmentDetails.description}
//             onChange={handleInputChange}
//             placeholder="Enter assignment description"
//             className="inputClass"
//           />
//         </div>

//         <div className="mb-4">
//           <label htmlFor="due-date" className="block text-sm font-medium">
//             Due Date
//           </label>
//           <input
//             type="date"
//             id="due-date"
//             name="dueDate"
//             value={assignmentDetails.dueDate}
//             onChange={handleInputChange}
//             className="inputClass"
//           />
//         </div>

//         <div className="flex justify-end gap-3">


//           <ButtonM text={"Add Assignment"} onClick={handleAddAssignment} />
//           <ButtonM text={"Cancle"} onClick={() => setIsModalOpen(false)} />
//         </div>
//       </Modal>

//       <div className="mt-8">
//         <h2 className="text-2xl font-semibold mb-4">Assignment List</h2>
//         {assignments?.length === 0 ? (
//           <p className="text-gray-500">No assignments added yet.</p>
//         ) : (
//           <ul className="space-y-2 h-full overflow-y-auto">
//             {assignments?.map((assignment, index) => (
//               <li
//                 key={index}
//                 className={`p-4 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:shadow-xl hover:border-gray-400 ${
//                   index % 2 === 0 ? "bg-gray-100" : ""
//                 }`}
//               >
//                 <div className={`grid grid-cols-3 gap-4 items-center`}>
//                   <div className="text-gray-900 font-semibold">
//                     {assignment.assignmentTitle}
//                   </div>
//                   <div className="text-gray-800">{assignment.description}</div>
//                   <div className="text-gray-600">{assignment.dueDate}</div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default TeacherAssignment;


import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import ButtonM from "@/components/ButtonM";
import Heading1 from "@/components/Heading1";
import ModalHeading from "@/components/ModalHeading";
import SelectWithLabel from "@/components/SelectWithLabel";
import { addAssignment, fetchAssignments } from "@/api/Assignment";

Modal.setAppElement("#root"); // Required for accessibility

const Assignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // To handle modal visibility
  let [sections, setSections] = useState([]); // Placeholder for section data
  let [batches, setBatches] = useState([]); // Placeholder for batch data
  let [courses, setCourses] = useState([]); // Placeholder for course data
  let [sampleAssignments, setSampleAssignments] = useState('');
  const [assignmentDetails, setAssignmentDetails] = useState({
    assignmentTitle: "",
    description: "",
    dueDate: "",
    batch: "",
    course: "",
    section: "",
  });

  // Dummy data for dropdowns
  batches = [
    {
      _id: "1",
      name: "Batch 1",
    },
    {
      _id: "2",
      name: "Batch 2",
    },
    {
      _id: "3",
      name: "Batch 3",
    },
  ]

  sections = [
    {
      _id: "1",
      title: "Section 1",
    },
    {
      _id: "2",
      title: "Section 2",
    },
    {
      _id: "3",
      title: "Section 3",
    },
    {
      _id: "4",
      title: "Section 4",
    },
    {
      _id: "5",
      title: "Section 5",
    }
  ]

  courses = [
    {
      _id: "1",
      title: "Course 1",
    },
    {
      _id: "2",
      title: "Course 2",
    },
    {
      _id: "3",
      title: "Course 3",
    }
  ]

  sampleAssignments = [
    {
      trainer: "63fddf45d4a2a34b56781234", // Example ObjectId for Trainer
      batchNo: "63fddf98d4a2a34b56785678", // Example ObjectId for Batch
      course: "63fddfb3d4a2a34b56789012", // Example ObjectId for Course
      section: "63fddfc6d4a2a34b56783456", // Example ObjectId for Section
      title: "JavaScript Basics",
      description: "Learn the fundamentals of JavaScript, including variables, loops, and functions.",
      status: ["active"],
      dueDate: "2025-02-15T00:00:00.000Z",
    },
    {
      trainer: "63fddf45d4a2a34b56781234", // Example ObjectId for Trainer
      batchNo: "63fddf98d4a2a34b56785678", // Example ObjectId for Batch
      course: "63fddfb3d4a2a34b56789013", // Example ObjectId for Course
      section: "63fddfc6d4a2a34b56783457", // Example ObjectId for Section
      title: "React Basics",
      description: "Introduction to React.js, including components, props, and state management.",
      status: ["active"],
      dueDate: "2025-02-20T00:00:00.000Z",
    },
    {
      trainer: "63fde045d4a2a34b56781256", // Example ObjectId for Trainer
      batchNo: "63fde098d4a2a34b56785789", // Example ObjectId for Batch
      course: "63fde0b3d4a2a34b56789124", // Example ObjectId for Course
      section: "63fde0c6d4a2a34b56783567", // Example ObjectId for Section
      title: "Python for Data Science",
      description: "Master Python with a focus on data science libraries such as pandas and NumPy.",
      status: ["inactive"],
      dueDate: "2025-03-01T00:00:00.000Z",
    },
    {
      trainer: "63fde123d4a2a34b56781290", // Example ObjectId for Trainer
      batchNo: "63fde198d4a2a34b56785700", // Example ObjectId for Batch
      course: "63fde1b3d4a2a34b56789156", // Example ObjectId for Course
      section: "63fde1c6d4a2a34b56783578", // Example ObjectId for Section
      title: "Machine Learning",
      description: "Explore supervised and unsupervised learning with hands-on examples in Python.",
      status: ["completed"],
      dueDate: "2025-01-15T00:00:00.000Z",
    },
    {
      trainer: "63fde245d4a2a34b56781345", // Example ObjectId for Trainer
      batchNo: "63fde298d4a2a34b56785899", // Example ObjectId for Batch
      course: "63fde2b3d4a2a34b56789234", // Example ObjectId for Course
      section: "63fde2c6d4a2a34b56783678", // Example ObjectId for Section
      title: "Database Management Systems",
      description: "Understand the principles of relational databases and SQL queries.",
      status: ["active"],
      dueDate: "2025-02-28T00:00:00.000Z",
    },
  ];

  useEffect(async() => {
    fetchAssignments(setAssignments); // not working
    addAssignment(assignmentDetails, setAssignments); // not working
  }, [assignments])


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAssignmentDetails({
      ...assignmentDetails,
      [name]: value,
    });
  };

  const handleAddAssignment = () => {
    if (
      assignmentDetails.assignmentTitle &&
      assignmentDetails.description &&
      assignmentDetails.dueDate &&
      assignmentDetails.batch &&
      assignmentDetails.course &&
      assignmentDetails.section
    ) {
      // Log the complete assignment object to the console
      console.log("Assignment Object:", assignmentDetails);

      // Add the new assignment to the list
      setAssignments((prevAssignments) => [
        ...prevAssignments,
        assignmentDetails,
      ]);

      // Clear the form
      setAssignmentDetails({
        assignmentTitle: "",
        description: "",
        dueDate: "",
        batch: "",
        course: "",
        section: "",
      });

      setIsModalOpen(false); // Close modal after adding assignment
    } else {
      alert("Please fill out all fields.");
    }
  };

  // const toggleEditStatus = (id) => {
  //   setSampleAssignments((prevAssignments) =>
  //     prevAssignments.map((item) =>
  //       item._id === id
  //         ? { ...item, isEditingStatus: !item.isEditingStatus }
  //         : item
  //     )
  //   );
  // };

  // const handleStatusChange = (id, newStatus) => {
  //   setSampleAssignments((prevAssignments) =>
  //     prevAssignments.map((item) =>
  //       item._id === id
  //         ? { ...item, status: newStatus, isEditingStatus: false }
  //         : item
  //     )
  //   );
  // };

  console.log("assignments->", assignments)
  return (
    <div className="p-6">
      <Heading1 text={"Assignments"} />

      <ButtonM
        text={"Add Assignment"}
        startIcon={""}
        onClick={() => setIsModalOpen(true)}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className={"modalStyle"}
      >
        <ModalHeading text={"Add Assignment"} />

        {/* Batches Dropdown */}
        <SelectWithLabel
          label="Batch"
          id="batch-number"
          name="batch"
          value={assignmentDetails.batch}
          onChange={handleInputChange}
          options={batches}
          view="name"
          placeholder="Select Batch"
        />

        {/* Courses Dropdown */}
        <SelectWithLabel
          label="Course"
          id="batch-course"
          name="course"
          value={assignmentDetails.course}
          onChange={handleInputChange}
          options={courses}
          view="title"
          placeholder="Select Course"
        />

        {/* Sections Dropdown */}
        <SelectWithLabel
          label="Section"
          id="batch-section"
          name="section"
          value={assignmentDetails.section}
          onChange={handleInputChange}
          options={sections}
          view="title"
          placeholder="Select Section"
        />

        {/* Assignment Title Input */}
        <div className="mb-4">
          <label htmlFor="assignment-title" className="block text-sm font-medium">
            Assignment Title
          </label>
          <input
            type="text"
            id="assignment-title"
            name="assignmentTitle"
            value={assignmentDetails.assignmentTitle}
            onChange={handleInputChange}
            placeholder="Enter assignment title"
            className="inputClass"
          />
        </div>

        {/* Assignment Description Input */}
        <div className="mb-4">
          <label
            htmlFor="assignment-description"
            className="block text-sm font-medium"
          >
            Assignment Description
          </label>
          <textarea
            id="assignment-description"
            name="description"
            value={assignmentDetails.description}
            onChange={handleInputChange}
            placeholder="Enter assignment description"
            className="inputClass"
          />
        </div>

        {/* Due Date Input */}
        <div className="mb-4">
          <label htmlFor="due-date" className="block text-sm font-medium">
            Due Date
          </label>
          <input
            type="date"
            id="due-date"
            name="dueDate"
            value={assignmentDetails.dueDate}
            onChange={handleInputChange}
            className="inputClass"
          />
        </div>

        <div className="flex justify-end gap-3">
          <ButtonM text={"Add Assignment"} onClick={handleAddAssignment} />
          <ButtonM text={"Cancel"} onClick={() => setIsModalOpen(false)} />
        </div>
      </Modal>

      {/* <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Assignment List</h2>
        {assignments?.length === 0 ? (
          <p className="text-gray-500">No assignments added yet.</p>
        ) : (
          <ul className="space-y-2 h-full overflow-y-auto">
            {assignments?.map((assignment, index) => (
              <li
                key={index}
                className={`p-4 border border-gray-200 rounded-lg shadow-md transition-transform transform hover:shadow-xl hover:border-gray-400 ${
                  index % 2 === 0 ? "bg-gray-100" : ""
                }`}
              >
                <div className="grid grid-cols-3 gap-4 items-center">
                  <div className="text-gray-900 font-semibold">
                    {assignment.assignmentTitle}
                  </div>
                  <div className="text-gray-800">{assignment.description}</div>
                  <div className="text-gray-600">{assignment.dueDate}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div> */}

      <div className="overflow-x-auto mt-4">
        <table className="min-w-full table-auto border-collapse">
          <thead className="bg-gray-100 sticky top-0">
            <tr className="border-b">
              <th className="p-2 border border-gray-200 w-1/12">Serial No.</th>
              <th className="p-2 border border-gray-200 w-3/12">Title</th>
              <th className="p-2 border border-gray-200 w-2/12">Course</th>
              <th className="p-2 border border-gray-200 w-1/12">Section</th>
              <th className="p-2 border border-gray-200 w-2/12">Batch</th>
              <th className="p-2 border border-gray-200 w-1/12">Due Date</th>
              <th className="p-2 border border-gray-200 w-2/12">Status</th>
              <th className="p-2 border border-gray-200 w-2/12">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sampleAssignments.map((classItem, index) => (
              <tr key={classItem._id} className={index % 2 === 0 ? "bg-blue-100" : ""}>
                <td className="p-2 border border-gray-200 text-center">{index + 1}</td>
                <td className="p-2 border border-gray-200">{classItem.title}</td>
                <td className="p-2 border border-gray-200 text-center">{classItem.course}</td>
                <td className="p-2 border border-gray-200 text-center">{classItem.section}</td>
                <td className="p-2 border border-gray-200 text-center">{classItem?.batchNo}</td>
                <td className="p-2 border border-gray-200 text-center">{classItem?.dueDate}</td>
                <td className="p-2 border border-gray-200 text-center">
                  {classItem.isEditingStatus ? (
                    <select
                      value={classItem.status}
                      onChange={(e) => handleStatusChange(classItem._id, e.target.value)}
                      className="border border-gray-300 rounded p-1"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="completed">Completed</option>
                    </select>
                  ) : (
                    <span
                      className="cursor-pointer underline text-blue-600"
                      onClick={() => toggleEditStatus(classItem._id)}
                    >
                      {classItem?.status}
                    </span>
                  )}
                </td>
                <td className="p-2 border border-gray-200 text-center">
                  <div className="flex gap-2">
                    <ButtonM
                      text={"Edit"}
                      variant={"text"}
                      onClick={() => handleEditClass(classItem)}
                    />
                    <ButtonM
                      text={"Delete"}
                      variant={"text"}
                      onClick={() => handleDeleteClass(classItem)}
                    />
                  </div>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Assignment;
