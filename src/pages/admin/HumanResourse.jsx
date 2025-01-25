import React, { useState } from "react";
// import Modal from "react-modal";
import ButtonM from "@/components/ButtonM";
import AssignmentCard from "@/components/AssignmentCard";
// import ModalHeading from "@/components/ModalHeading";
// import InputWithLabel from "@/components/InputWithLabel";
// import SelectWithLabel from "@/components/SelectWithLabel";
// import axios from "axios";
// import { AppRoutes } from "@/constant/constant";
// import MultipleValueSelection from "@/components/MultipleValueSelection";
// // import { fetchUserByCNIC, updateUserRoleAndRights } from "@/api/User";


// Modal.setAppElement("#root");

const HumanResource = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [cnic, setCnic] = useState("");
//   const [userDetails, setUserDetails] = useState(null);
//   const [staffDetails, setStaffDetails] = useState({
//     role: "",
//     rights: "",
//   });


// const handleFindUser = async () => {
   

//     try {
//       const response = await axios.get(`${AppRoutes.getAllUsers}?cnic=${cnic}`);
//       console.log("findUser =>", response.data);
//     } catch (error) {
//       console.error("Error fetching user:", error);
//     }
//   };



//   const handleCnic = (e) => {
//     const user = e.target.value;
//     setCnic(user);
//   };

  
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "cnic") {
//       setCnic(value);
//     } else {
//       setStaffDetails({
//         ...staffDetails,
//         [name]: value,
//       });
//     }
//   };


//   const handleConfirmAndAssign = async (e) => {
//     e.preventDefault();
//     if (userDetails) {
//       await updateUserRoleAndRights(userDetails.id, staffDetails);
//       alert("Role and rights updated successfully.");
//       resetForm();
//     } else {
//       alert("No user selected.");
//     }
//   };
//   const handleMultipleValue = (e) => {
//     const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
//     onChange(selectedOptions);
//   };

//   const resetForm = () => {
//     setCnic("");
//     setUserDetails(null);
//     setStaffDetails({ role: "", rights: "" });
//     setIsModalOpen(false);
//   };

  return (
    <div>
       <ButtonM text="Add Staff" onClick={() => setIsModalOpen(true)} />
        <div>
          <AssignmentCard />
        </div>

    </div>
  );
};

export default HumanResource;


{/* <Modal */}
//   isOpen={isModalOpen}
//   onRequestClose={resetForm}
//   className={"modalStyle z-50"}
// >
//         <ModalHeading text="Add Staff" />

//         <InputWithLabel
//           label="Find Staff"
//           id="cnic"
//           name="cnic"
//           value={cnic}
//           onChange={handleCnic}
//           placeholder="Enter CNIC"
//         />
//           <div className="flex justify-end">
//             <ButtonM text="Find User" onClick={handleFindUser} className={"w-1/2"} />
//           </div>

//         <form onSubmit={handleConfirmAndAssign}>
//           {!userDetails && (
//             <div className="mt-4">
//               {/* <p><strong>User Found:</strong> {userDetails.name}</p> */}
//               <SelectWithLabel
//                 label="Assign Role"
//                 id="role"
//                 name="role"
//                 value={staffDetails.role}
//                 onChange={handleInputChange}
//                 options={[
//                   { id: 1, value: "Admin", name: "Admin" },
//                   { id: 2, value: "Teacher", name: "Teacher" },
//                   { id: 3, value: "SupportStaff", name: "Support Staff" },
//                 ]}
//                 placeholder="Select Role"
//               />
//               <MultipleValueSelection
//                 label="Assign Role"
//                 id="role"
//                 name="role"
//                 onChange={handleMultipleValue}
//                 value={staffDetails.role}
//                 options={[
//                     { id: 1, value: "admin", name: "Admin" },
//                     { id: 2, value: "trainer", name: "Trainer" },
//                     { id: 3, value: "studentser", name: "Student" },
//                     { id: 3, value: "user", name: "User" },
//                   ]}
              
              
              
//               />

//               <InputWithLabel
//                 label="Assign Rights"
//                 id="rights"
//                 name="rights"
//                 value={staffDetails.rights}
//                 onChange={handleInputChange}
//                 placeholder="Enter Rights (comma separated)"
//               />
//             </div>
//           )}

//           <div className="flex justify-center items-center gap-3 w-full mt-4">
//             <ButtonM type="submit" text="Confirm and Assign" className={"w-1/2"} />
//             <ButtonM text="Cancel" onClick={resetForm} className={"w-1/2"} />
//           </div>
//         </form>
//       </Modal>