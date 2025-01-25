import { createContext, useState, useEffect } from 'react';

// Create context
export const FeeContext = createContext();

function FeeContextProvider({ children }) {
  const [vouchers, setVouchers] = useState([]);
  const [deadline, setDeadline] = useState(null);
  const [adminAllowed, setAdminAllowed] = useState(false); // Admin status for enabling voucher generation

  // Load vouchers from localStorage when the component mounts
  useEffect(() => {
    const storedVouchers = JSON.parse(localStorage.getItem('vouchers'));
    if (storedVouchers) {
      setVouchers(storedVouchers);
    }

    const storedDeadline = localStorage.getItem('feeDeadline');
    if (storedDeadline) {
      setDeadline(new Date(storedDeadline));
    }
  }, []);

  // Save vouchers and deadline to localStorage
  useEffect(() => {
    if (vouchers.length > 0) {
      localStorage.setItem('vouchers', JSON.stringify(vouchers));
    }

    if (deadline) {
      localStorage.setItem('feeDeadline', deadline.toISOString());
    }
  }, [vouchers, deadline]);

  // Admin function to generate a voucher for students
  const generateVoucher = (studentId, month) => {
    const newVoucher = {
      studentId,
      month,
      voucherGenerated: false,
      paid: false,
    };
    setVouchers([...vouchers, newVoucher]);
  };

  // Student function to generate voucher
  const generateStudentVoucher = (studentId, month) => {
    const updatedVouchers = vouchers.map((voucher) =>
      voucher.studentId === studentId && voucher.month === month && !voucher.voucherGenerated
        ? { ...voucher, voucherGenerated: true }
        : voucher
    );
    setVouchers(updatedVouchers);
  };

  // Student function to pay fee
  const payFee = (studentId, month) => {
    const updatedVouchers = vouchers.map((voucher) =>
      voucher.studentId === studentId && voucher.month === month && voucher.voucherGenerated
        ? { ...voucher, paid: true }
        : voucher
    );
    setVouchers(updatedVouchers);
  };

  // Admin function to set deadline for fee payment
  const setFeeDeadline = (date) => {
    setDeadline(date);
  };

  // Admin function to allow students to generate vouchers again after deadline
  const allowVoucherGeneration = () => {
    setAdminAllowed(true);
  };

  // Admin function to prevent students from generating vouchers after the deadline
  const disallowVoucherGeneration = () => {
    setAdminAllowed(false);
  };

  return (
    <FeeContext.Provider
      value={{
        vouchers,
        deadline,
        adminAllowed,
        generateVoucher,
        generateStudentVoucher,
        payFee,
        setFeeDeadline,
        allowVoucherGeneration,
        disallowVoucherGeneration,
      }}
    >
      {children}
    </FeeContext.Provider>
  );
}

export default FeeContextProvider;
