import React, { useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import ButtonM from "@/components/ButtonM";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import Backdrop from "@mui/material/Backdrop";
import { PageContainer } from "@toolpad/core";
import Heading1 from "@/components/Heading1";
import { Box, TextField } from "@mui/material";

const AdmitCard = () => {
  const [findUser, setFindUser] = useState("");
  const [userData, setUserData] = useState("");
  const [find, setFind] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [existingCard, setExistingCard] = useState([]); // Track already enrolled students
  const [viewAdmitCard, setViewAdmitCard] = useState(null); // To manage which admit card to view

  const fetchUser = async () => {
    setUserData("");
    setExistingCard([]); // Ensure this is an empty array
    setIsLoading(true);
    setFind(false);
    try {
      setError("");

      const userResponse = await axios.get(`${AppRoutes.getSingleUser}?cnic=${findUser}`);
      const user = userResponse.data?.data;
      // console.log("user=>>", user)
      setUserData(user);

      if (user.course) {
        const courseId = user.course;

        // Fetch course data
        const courseResponse = await axios.get(`${AppRoutes.getSingleCourse}/${courseId}`);
        const course = courseResponse.data?.data;

        // Fetch batch data
        const batchResponse = await axios.get(`${AppRoutes.getSingleBatch}/${user.batchNo}`);
        const batch = batchResponse.data?.data;

        // Update userData with course and batchNo
        setUserData((prevDetails) => ({
          ...prevDetails,
          course: course?.title || "Course not found",
          batchNo: batch?.batchNo || "Batch not found",
        }));

        // Add the user to existingCard
        setExistingCard((prev) => [
          ...prev,
          {
            fullName: user.fullName,
            course: course?.title || "Course not found",
            batchNo: batch?.batchNo || "Batch not found",
            rollNo: user.rollNo,
            cnic: user.cnic,
          },
        ]);

        setFind(true);
        setIsLoading(false);
      } else {
        setUserData(null);
        setError("User not found. Please check the CNIC and try again.");
        setFind(false);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("An error occurred while fetching user data. Please try again later.");
      setFind(false);
      setIsLoading(false);
    }
  };

  const generateAdmitCardPDF = async (user) => {
    try {
      const admitCardContent = document.querySelector(".admit-card-content");

      if (!admitCardContent) {
        console.error("Admit card content not found.");
        return;
      }
      const canvas = await html2canvas(admitCardContent, {
        scale: 2, // Lower scale for smaller file size
        useCORS: true,
      });
      // Convert canvas to data URL with reduced quality
      const imgData = canvas.toDataURL("image/png", 0.7); // 0.7 reduces image size
      const pdf = new jsPDF("portrait", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      // Calculate image size and scaling
      const imgWidth = Math.min(canvas.width / 2, pageWidth); // Adjust image width
      const imgHeight = (canvas.height * imgWidth) / canvas.width; // Maintain aspect ratio
      const xOffset = (pageWidth - imgWidth) / 2;
      const yOffset = (pageHeight - imgHeight) / 2;
      // Add the image with adjusted size
      pdf.addImage(imgData, "PNG", xOffset, yOffset, imgWidth, imgHeight, undefined, "SLOW"); // Use compression
      // Save PDF file
      const fileName = user.fullName + "-" + user.rollNo;
      pdf.save(`${fileName || "AdmitCard"}.pdf`);
    } catch (error) {
      console.error("Error generating the PDF:", error);
    }
  };

  const handleViewAdmitCard = (student) => {
    setViewAdmitCard(student);
  };

  const handleDownloadAdmitCard = async (student) => {
    setIsLoading(true); // Start loading
    await generateAdmitCardPDF(student); // Wait for PDF generation
    setTimeout(() => {
      setIsLoading(false); // Stop loading once PDF is ready
    }, 2000);
  };

  return (
    <div className="h-full w-10/12 mx-auto flex items-center justify-start gap-8">
      {isLoading && (
        <Backdrop
          sx={{
            color: "#eee",
            width: "100%",
            height: "100%",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={isLoading}
        >
          <div className="loader"></div>
        </Backdrop>
      )}
      <div
        className={`overflow-auto ${!error ? "w-full" : "w-8/12"} scrollbar-custom rounded-lg shadow-xl`}
        style={{ height: "calc(100vh - 2rem)", backgroundColor: "#f9f9f9" }}
      >
        <div className="bg-white h-full rounded-lg shadow-lg p-8 space-y-6">
          <Heading1
            text={"Download AdmitCard"}
            className={"text-3xl font-semibold text-center bg-blue-100 p-2 py-6 rounded-md w-full"}
          />

          <PageContainer>
            <Box className={"flex gap-4 w-full"}>
              <TextField
                fullWidth
                label="Find User by cnic"
                placeholder="00000-0000000-0"
                value={findUser}
                onChange={(e) => setFindUser(e.target.value)}
                id="findUser"
                className="w-1/2"
              />
              <ButtonM onClick={fetchUser} color="primary" text="Find User" className={"w-1/2 h-14"} />
            </Box>

            <div className="flex items-center gap-4">
              {error && <span className="text-red-500 text-sm">{error}</span>}

              {find && <div className="flex gap-2">{/* Removed Download PDF and Close buttons from here */}</div>}
            </div>
            {userData && (
              <table className="table-auto w-full py-6 text-sm my-12 border-collapse border border-gray-300">
                <thead>
                  <tr>
                    <th className="border border-gray-300 px-4 py-2 text-center truncate">Full Name</th>
                    <th className="border border-gray-300 px-4 py-2 text-center truncate">Course</th>
                    <th className="border border-gray-300 px-4 py-2 text-center truncate">Batch No</th>
                    <th className="border border-gray-300 px-4 py-2 text-center truncate">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {existingCard.map((student, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                      <td className="border border-gray-300 px-4 py-2 w-3/12 truncate">{student.fullName}</td>
                      <td className="border border-gray-300 px-4 py-2 w-3/12 truncate">{student.course}</td>
                      <td className="border border-gray-300 px-4 py-2 w-2/12 truncate">{student.batchNo}</td>
                      <td className="border border-gray-300 px-4 py-2 w-4/12 text-center">
                        <div className="flex justify-center gap-2">
                          <ButtonM onClick={() => handleViewAdmitCard(student)} color="primary" text="View" />
                          <ButtonM onClick={() => handleDownloadAdmitCard(student)} color="primary" text="Download" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </PageContainer>

          {/* Render Admit Card when "View" is clicked */}
          <div className="">
            {viewAdmitCard && (
              <div
                className={"admit-card-content"}
                style={{
                  width: "210mm",
                  height: "297mm",
                  margin: "0 auto",
                  padding: "10mm",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                  backgroundColor: "#fff",
                }}
              >
                <div className="border-2 flex flex-col justify-between h-full w-full" style={{ padding: "10mm" }}>
                  <div className="flex flex-wrap justify-center h-1/2 w-full ">
                    <div className="border-r-2 flex justify-center items-center w-1/2 border-dashed border-black">
                      <div className="h-[85.60mm] w-[53.98mm] flex flex-col items-center border-2 border-blue-300 justify-between bg-blue-100 rounded-lg shadow-lg p-4">
                        <img
                          src="https://res.cloudinary.com/dbhoqcunj/image/upload/v1737329683/logo-OpazD70S_wiethh.png"
                          alt="Logo"
                          className="w-24"
                        />
                        <img
                          src={userData.imageUrl}
                          alt="Profile"
                          className="w-28 h-28 rounded-full shadow-md border-2 border-green-100"
                        />

                        <h6 className="text-sm text-gray-700 text-center capitalize font-semibold">
                          {userData.fullName}
                        </h6>
                        <h6 className="text-gray-700 text-center text-xs font-semibold">Course: {userData.course}</h6>
                        <h6 className="text-gray-700 text-center text-xs font-semibold">Roll No: {userData.rollNo}</h6>
                      </div>
                    </div>
                    <div className="flex justify-center items-center w-1/2">
                      <div className="h-[85.60mm] w-[53.98mm] flex flex-col justify-between bg-blue-100 border-2 border-blue-300 rounded-lg shadow-md p-4">
                        <h2 className="text-sm font-bold text-primary text-center underline pb-2">
                          Student Information
                        </h2>
                        <div className="text-xs text-gray-700 flex flex-col justify-between gap-3">
                          <ul className="space-y-1 list-none">
                            <li className="flex">
                              <span className="font-semibold w-1/3">Name:</span>
                              <span className="w-2/3">{userData.fullName}</span>
                            </li>
                            <li className="flex">
                              <span className="font-semibold w-1/3">F Name:</span>
                              <span className="w-2/3">{userData.fatherName}</span>
                            </li>
                            <li className="flex">
                              <span className="font-semibold w-1/3">Cnic No:</span>
                              <span className="w-2/3">{userData.cnic}</span>
                            </li>
                            <li className="flex">
                              <span className="font-semibold w-1/3">Batch No:</span>
                              <span className="w-2/3">{userData.batchNo}</span>
                            </li>
                          </ul>

                          <div className="flex justify-center mt-2">
                            <QRCode value={`${userData.rollNo}`} size={75} />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-md font-bold text-red-600">Notice: </span>
                            <span className="text-justify text-xs">
                              If found, please return to SMIT Gulshan Campus, 4th Floor, Mumtaz Mobile Mall, Gulshan e
                              Iqbal, Karachi.
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" h-1/2 flex flex-col gap-4 border-t-2 py-16 justify-center border-dashed border-black">
                    <h1 className="text-red-600 font-bold text-2xl">Instructions:</h1>
                    <ul className="flex flex-col gap-4">
                      <li>Please colour print of this Admit/ID card</li>
                      <li>No student will be allowed to enter in Entry Test without attestation of Admit/ID Card</li>
                      <li>
                        Bring CNIC and Last qualification Marksheet/Certification. (both original) at the time of
                        Attestation.
                      </li>
                      <li>
                        Address: Saylani Head office 4th floor Bahadurabad char minaar chowrangi/Gulshan Campus (2nd
                        Floor, Mumtaz Mobile Mall, Gulshan Chowrangi)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmitCard;
