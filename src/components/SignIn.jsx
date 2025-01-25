import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppRoutes } from "@/constant/constant";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import AppTheme from "../shared-theme/AppTheme";
import Cookies from "js-cookie";
import { IconButton, InputAdornment, InputLabel, OutlinedInput } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  borderRadius: "10px",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  [theme.breakpoints.up("sm")]: {
    maxWidth: "450px",
  },
  boxShadow: "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  ...theme.applyStyles("dark", {
    boxShadow: "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: "calc((1 - var(--template-frame-height, 0)) * 100dvh)",
  minHeight: "100%",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage: "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
    ...theme.applyStyles("dark", {
      backgroundImage: "radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))",
    }),
  },
}));

export default function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [logOutTime, setLogOutTime] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const [messageApi, contextHolder] = message.useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const decodeToken = async () => {
  //     try {
  //       const token = Cookies.get("token");
  //       if (token) {
  //         // console.error("Token found");
  //         setTimeout(() => {
  //           if (user.role === "admin") {
  //             navigate("/admin");
  //           } else if (user.role === "trainer") {
  //             navigate("/trainer");
  //           } else if (user.role === "student") {
  //             navigate("/student");
  //           } else {
  //             messageApi.success("You are not authorized to login this dashboard");
  //           }
  //         }, 1000);
  //         return;
  //       }
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //     }
  //   };

  //   decodeToken();
  // }, [navigate]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!emailError && !passwordError) {
      const currentUser = { email, password };
      setIsLoading(true);
      axios
        .post(AppRoutes.login, currentUser)
        .then((response) => {
          const { token, user } = response?.data?.data;
          {
            contextHolder;
          }
        
          setUser(user);

          messageApi.success("Sign-in successful!");

          Cookies.set("token", token);
          const getToken = Cookies.get("token");
          console.log("user=>", user)
          setTimeout(() => {

            console.log("userRole", user.role[0])
            if (user.role[0] === "admin") {
              navigate("/admin");
            } else if (user.role[0] === "trainer") {
              navigate("/trainer");
            } else if (user.role[0] === "student") {
              navigate("/student");
            } else {
              messageApi.success("You are not authorized to login this dashboard");
            }
          }, 1000);
        })
        .catch((error) => {
          messageApi.error("Login failed. Please check your credentials.");
          setIsLoading(false);
        });

      return;
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const validateInputs = () => {
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 8 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <SignInContainer direction="column" justifyContent="space-between" className="">
        <Card variant="outlined">
          <img src="https://student.saylaniwelfare.com/assets/logo-OpazD70S.png" className="w-24" />
          <Typography
            component="h1"
            variant="h3"
            className="text-center"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign in
          </Typography>
          <Box>
            {contextHolder}
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <TextField
                  error={emailError}
                  id="email"
                  value={email}
                  label="Email"
                  autoComplete="email"
                  autoFocus
                  type="email"
                  name="email"
                  fullWidth
                  maxRows={4}
                  placeholder="example@email.com"
                  color={emailError ? "error" : "primary"}
                  helperText={emailErrorMessage}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>

              <FormControl sx={{ marginTop: "15px" }} variant="outlined" error={passwordError}>
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••"
                  autoComplete="current-password"
                  autoFocus
                  required
                  fullWidth
                  label="Password"
                  color={passwordError ? "error" : "primary"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label={showPassword ? "hide the password" : "display the password"}
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        onMouseUp={handleMouseUpPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {passwordError && <FormHelperText>{passwordErrorMessage}</FormHelperText>}
              </FormControl>

              <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
              <ForgotPassword open={open} handleClose={handleClose} />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                onClick={validateInputs}
                disabled={isLoading}
              >
                Sign In
              </Button>
              {isLoading && <div className="loader"></div>}

              <Link
                component="button"
                type="button"
                onClick={handleClickOpen}
                variant="body2"
                className="hover:bg-transparent"
                sx={{ alignSelf: "center" }}
              >
                Forgot your password?
              </Link>
            </Box>
            <Divider>or</Divider>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography sx={{ textAlign: "center" }}>
                Don&apos;t have an account?{" "}
                <Link href="" variant="body2" sx={{ alignSelf: "center" }}>
                  Sign up
                </Link>
              </Typography>
            </Box>
          </Box>
        </Card>
      </SignInContainer>
    </AppTheme>
  );
}
