import React, { useState, useContext } from 'react';
import { FeeContext } from '../context/Fee';

const FeePage = () => {
  const {
    vouchers,
    deadline,
    adminAllowed,
    generateVoucher,
    generateStudentVoucher,
    payFee,
    setFeeDeadline,
    allowVoucherGeneration,
    disallowVoucherGeneration,
  } = useContext(FeeContext);

  const [studentId, setStudentId] = useState('');
  const [month, setMonth] = useState('');
  const [feePaid, setFeePaid] = useState(false);
  const [newDeadline, setNewDeadline] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');

  const handleGenerateVoucher = () => {
    if (studentId && month) {
      generateVoucher(studentId, month);
    }
  };

  const handleStudentVoucherGeneration = () => {
    if (selectedStudentId && month) {
      generateStudentVoucher(selectedStudentId, month);
    }
  };

  const handleFeePayment = () => {
    if (selectedStudentId && month) {
      payFee(selectedStudentId, month);
      setFeePaid(true);
    }
  };

  const handleSetDeadline = () => {
    if (newDeadline) {
      setFeeDeadline(new Date(newDeadline));
    }
  };

  const handleAllowVoucherGeneration = () => {
    allowVoucherGeneration();
  };

  const handleDisallowVoucherGeneration = () => {
    disallowVoucherGeneration();
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Fee Payment System</h1>

      {/* Admin Functions */}
      <h2 className="text-2xl font-semibold mb-4">Admin Section</h2>
      <div className="mb-6">
        <h3 className="font-semibold">Generate Voucher for Students</h3>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="px-4 py-2 w-full border border-gray-300 rounded-md mb-4"
        />
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="px-4 py-2 w-full border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleGenerateVoucher}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Generate Voucher
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Set Fee Payment Deadline</h3>
        <input
          type="date"
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
          className="px-4 py-2 w-full border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleSetDeadline}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Set Deadline
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Allow Voucher Generation After Deadline</h3>
        <button
          onClick={handleAllowVoucherGeneration}
          className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
        >
          Allow Voucher Generation
        </button>
        <button
          onClick={handleDisallowVoucherGeneration}
          className="px-4 py-2 bg-red-500 text-white rounded-lg ml-4"
        >
          Disallow Voucher Generation
        </button>
      </div>

      {/* Student Functions */}
      <h2 className="text-2xl font-semibold mb-4">Student Section</h2>
      <div className="mb-6">
        <h3 className="font-semibold">Generate Voucher</h3>
        <input
          type="text"
          placeholder="Enter Student ID"
          value={selectedStudentId}
          onChange={(e) => setSelectedStudentId(e.target.value)}
          className="px-4 py-2 w-full border border-gray-300 rounded-md mb-4"
        />
        <input
          type="month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          className="px-4 py-2 w-full border border-gray-300 rounded-md mb-4"
        />
        <button
          onClick={handleStudentVoucherGeneration}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg"
        >
          Generate Voucher
        </button>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold">Pay Fee</h3>
        <button
          onClick={handleFeePayment}
          disabled={!month || !selectedStudentId || feePaid}
          className="px-4 py-2 bg-green-500 text-white rounded-lg"
        >
          Pay Fee
        </button>
      </div>

      <div>
        <h3 className="font-semibold">Current Vouchers</h3>
        <ul>
          {vouchers.map((voucher, index) => (
            <li key={index}>
              {voucher.studentId} | {voucher.month} | {voucher.voucherGenerated ? 'Voucher Generated' : 'No Voucher'} | {voucher.paid ? 'Paid' : 'Unpaid'}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeePage;
