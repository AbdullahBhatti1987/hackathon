import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import OutlinedInput from "@mui/material/OutlinedInput";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import { message } from "antd";

function UpdatePassword({ open, handleClose }) {
  const [employeeDetails, setEmployeeDetails] = useState({ cnic: "", password: "" });
  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);

  const savePassword = async () => {
    try {
      setIsLoading(true);
      const response = await axios.put(AppRoutes.getFindUpdateWithPassword, employeeDetails);
      console.log("Password updated successfully:", response.data);
      messageApi.success("Update Password successfully!");
      setIsLoading(false);
      resetForm();
      handleClose();
    } catch (error) {
      setIsLoading(false);
      console.error("Error updating password:", error);
      messageApi.success("Error updating password:, error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    savePassword();
  };

  const resetForm = () => {
    setEmployeeDetails({ cnic: "", password: "" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: { backgroundImage: "none" },
      }}
      className={""}
    >
      {contextHolder}
      {isLoading && <div className="loader"></div>}
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, width: "100%" }}
     
      >
        <DialogContentText>Search your account using CNIC and Create your password.</DialogContentText>
        <OutlinedInput
          autoFocus
          required
          margin="dense"
          id="cnic"
          name="cnic"
          placeholder="CNIC Number"
          type="text"
          fullWidth
          value={employeeDetails.cnic}
          onChange={handleChange}
        />
        <OutlinedInput
          required
          margin="dense"
          id="password"
          name="password"
          placeholder="Enter New Password"
          type="password"
          fullWidth
          value={employeeDetails.password}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions sx={{ pb: 3, px: 3 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" type="submit" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Password"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

UpdatePassword.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default UpdatePassword;
