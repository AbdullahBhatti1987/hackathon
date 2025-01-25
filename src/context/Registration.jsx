import { createContext, useState, useEffect } from 'react';

// Create context
export const RegistrationContext = createContext();

function RegistrationContextProvider({ children }) {
  const [registrations, setRegistrations] = useState([]);
  const [quizPassed, setQuizPassed] = useState(false);

  // Load registration data from localStorage when the component mounts
  useEffect(() => {
    const storedRegistrations = JSON.parse(localStorage.getItem("registrations"));
    if (storedRegistrations) {
      setRegistrations(storedRegistrations);
    }
  }, []);

  // Save registration data to localStorage
  useEffect(() => {
    if (registrations.length > 0) {
      localStorage.setItem("registrations", JSON.stringify(registrations));
    }
  }, [registrations]);

  // Function to handle student registration after passing quiz
  const handleRegister = (student) => {
    if (quizPassed) {
      setRegistrations([...registrations, student]);
    } else {
      alert('You must pass the quiz to register.');
    }
  };

  // Function to handle setting quiz status
  const handleQuizStatus = (status) => {
    setQuizPassed(status);
  };

  return (
    <RegistrationContext.Provider value={{ registrations, handleRegister, handleQuizStatus }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export default RegistrationContextProvider;
