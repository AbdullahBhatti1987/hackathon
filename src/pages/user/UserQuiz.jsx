import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Typography, Button, CircularProgress, Modal, Backdrop } from "@mui/material";
import questions from "../../content/quizdata.jsx";
import Heading1 from "@/components/Heading1.jsx";
import { PageContainer } from "@toolpad/core";
import ButtonM from "@/components/ButtonM.jsx";
import { AppRoutes } from "@/constant/constant.js";

const UserQuiz = () => {
  const [findUser, setFindUser] = useState("");
  const [userData, setUserData] = useState("");
  const [quizStarted, setQuizStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(3600); // 60 minutes
  const [completed, setCompleted] = useState(false);
  const [show, setShow] = useState(false);
  const [main, setMain] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [existingUser, setexistingUser] = useState([]); // Track already enrolled students
  const [remainingQuestions, setRemainingQuestions] = useState([...questions].sort(() => Math.random() - 0.5));

  const currentQuestion = remainingQuestions[currentQuestionIndex];

  useEffect(() => {
    if (timer > 0 && quizStarted) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (timer === 0) {
      handleFinish();
    }
  }, [timer, quizStarted]);

  const fetchUser = async () => {
    setUserData("");
    setIsLoading(true);

    setError("");
    try {
      const userResponse = await axios.get(`${AppRoutes.getSingleUser}?cnic=${findUser}`);
      const user = userResponse.data?.data;
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

        // Add the user to existingUser
        setexistingUser((prev) => [
          ...prev,
          {
            fullName: user.fullName,
            course: course?.title || "Course not found",
            batchNo: batch?.batchNo || "Batch not found",
            rollNo: user.rollNo,
            cnic: user.cnic,
          },
        ]);
        setShow(true);
        setFindUser("");
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

  const handleStartQuiz = () => {
    setShow(false);
    setMain(false);
    setQuizStarted(true);
  };

  const handleAnswer = (option) => {
    if (option === currentQuestion.answer) {
      setScore(score + 1);
    }
    if (currentQuestionIndex < 29) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    setCompleted(true);
    setShowModal(true);
    setShow(true);
    setMain(true);
    setUserData("")
    // yahn data chala jaega api.post quiz ki api hit hogi or user ka object with quiz name, marks, date and result chala jaega db me.
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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
        <div className="bg-white  rounded-lg shadow-lg p-8 space-y-6">
          {main && <Heading1
            text={" Quiz"}
            className={"text-3xl font-semibold text-center bg-blue-100 p-2 py-6 rounded-md w-full"}
          />}
          {main && (
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
              </div>
              {userData && show && (
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
                    {existingUser.map((student, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                        <td className="border border-gray-300 px-4 py-2 w-3/12 truncate">{student.fullName}</td>
                        <td className="border border-gray-300 px-4 py-2 w-3/12 truncate text-center">
                          {student.course}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 w-2/12 truncate text-center">
                          {student.batchNo}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 w-4/12 text-center">
                          <div className="flex justify-center gap-2">
                            <ButtonM onClick={() => handleStartQuiz(student)} color="primary" text="Start Quiz" />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </PageContainer>
          )}
        </div>

        {quizStarted && !completed && (
          <Box className="w-full bg-white p-8 rounded-lg shadow-md ">
            <Typography variant="h5" className="text-center font-bold bg-blue-100 p-6 rounded-md">
              Quiz Title
            </Typography>
            <h3 className="text-2xl my-12">
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </h3>
            <Typography variant="body6" className=" py-6  text-xl"></Typography>
            <Box className="grid grid-cols-2 gap-8 h-48 my-12">
              {currentQuestion.options.map((option, index) => (
                <Button key={index} variant="contained" onClick={() => handleAnswer(option)}>
                  {option}
                </Button>
              ))}
            </Box>
            <Box className="flex justify-between mt-6">
              <Typography className={"h-20 flex justify-center items-center text-2xl"}>
                Time Left: {formatTime(timer)}
              </Typography>
              {!completed && currentQuestionIndex < 29 ? (
                <ButtonM
                  variant="contained"
                  color="primary"
                  className={"p-6 w-1/4 h-20 text-2xl"}
                  onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                  text={"Skip"}
                />
              ) : (
                <ButtonM
                  variant="contained"
                  color="secondary"
                  className={"p-6 w-1/4 h-20 text-2xl"}
                  onClick={handleFinish}
                  text={"Finish"}
                />
              )}
            </Box>
          </Box>
        )}

{completed && (
  <Modal open={showModal}>
    <Box
      className="bg-white p-6 rounded-lg shadow-lg mx-auto"
      sx={{
        width: "400px",
        height: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 2,
        margin: "10% auto",
      }}
    >
      {/* Add an icon/image */}
      <img
        src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxAQDxMQEA8REBEQEBAPEBAODxcPEBAPFx0WFhUSFhcYICggGRslGxUVIzEhJSkrLi8uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAgYDBAUBB//EAEYQAAEDAgMFBQQFBwsFAAAAAAEAAgMEEQUSIQYxUXGRBxMiQWEjgaGxFDJygsFCYnOys8LRFSRSY3SSk6Lh8PElQ0RTw//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD4i95udTvPmo5zxPVH7zzKiglnPE9UznieqiiCWc8T1TOeJ6qKIJZzxPVM54nqooglnPE9UznieqiiCWc8T1TOeJ6qKIJZzxPVM54nqooglnPE9UznieqiiCWc8T1TOeJ6qKIJZzxPVM54nqooglnPE9UznieqiiCWc8T1TOeJ6qKIJZzxPVM54nqooglnPE9UznieqiiCWc8T1RRRBJ+88yoqT955lRQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERBJ+88yoqT955lRQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERBJ+88yoqT955lRQERZqJ4bIxx3BwPRBsRYTM69m+IWsxxyvIPAFaTgQbHQjQj1V3xFlw2ePePFp8QuDtDSg5ahg8Mv1wPyZPPqg4qL0C6yCB3BBiRZ/o5XhhQYUWQxqJagii9svEBEXtkHiKYYpCNBiRZhCvfo5QYEWV0Dh5LGQglDE57g1ozOcbADzK2ajDZWbxezczshzZPR1ty6mBQd1Gahw8TrshHzd+C69O0QwukfvIPvJQUhF67ebbr6cl4gIiICIiCT955lRUn7zzKigIiyQQl5sEFu2JElW4UcbDJI/wCo0em8k+QA3kr6rTdldHTUzziNS+TPr3MBEbA/eGsJGZxv56D0VK2AY6gPexOySuYWOfYElhsS3UbrgdFaa3FXyHNI9z3cXG55IKhPs5BELNYB8SuRV0DRuCtd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" // Replace with your desired icon/image URL
        alt="Completion Icon"
        style={{ width: "80px", height: "80px", marginBottom: "10px" }}
      />

      <Typography
        variant="h5"
        className="text-center font-bold"
        sx={{ marginBottom: "16px" }}
      >
        Quiz Completed!
      </Typography>

      {/* <Typography
        variant="body1"
        className="text-center"
        sx={{ marginBottom: "8px" }}
      >
        Your score: {score} / 30
      </Typography> */}

      <Typography
        variant="body2"
        className="text-center"
        sx={{ marginBottom: "16px" }}
      >
        Thank you for participating! You will be informed about the result very
        soon. Stay tuned!
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setShowModal(false)}
      >
        Close
      </Button>
    </Box>
  </Modal>
)}

      </div>
    </div>
  );
};

export default UserQuiz;
