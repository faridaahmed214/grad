"use client";
import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from 'react-hot-toast';

interface LoginFormProps {
  onSignupClick: () => void;
  onForgotPasswordClick: () => void;
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginForm: React.FC<LoginFormProps> = ({
  onSignupClick,
  onForgotPasswordClick,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const router = useRouter();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const handleLoginSubmit = async (values: {
    email: string;
    password: string;
  }) => {
    setLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });
    setLoading(false);

    if (result?.error) {
      toast.error(result.error);
    } else if (result?.ok) {
      toast.success("Login successful!");
      router.push("/home");
    }
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleLoginSubmit}
      enableReinitialize={true} // Add this line
    >
      {({ errors, touched, handleChange, handleBlur, resetForm }) => {
        // Add useEffect to reset form when modal closes
        React.useEffect(() => {
          return () => {
            resetForm();
          };
        }, [resetForm]);
        
        return (
          <Form>
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "PressStart2P, sans-serif",
                  color: theme.palette.primary.main,
                  textShadow: `0 0 5px ${theme.palette.primary.light}`,
                }}
              >
                Login
              </Typography>
            </Box>
  
            <Field
              name="email"
              as={TextField}
              fullWidth
              variant="outlined"
              placeholder="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      component="img"
                      src="/assets/communication.svg"
                      alt="Email Icon"
                      sx={{
                        width: 24,
                        height: 24,
                        filter:
                          theme.palette.mode === "dark"
                            ? "invert(84%) sepia(23%) saturate(437%) hue-rotate(54deg) brightness(96%) contrast(91%)"
                            : "invert(48%) sepia(79%) saturate(384%) hue-rotate(87deg) brightness(94%) contrast(88%)",
                      }}
                    />
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
              sx={{
                mb: 2,
                borderRadius: "8px",
                background: theme.palette.background.default,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.primary.light,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                  },
                },
              }}
            />
  
            <Field
              name="password"
              as={TextField}
              fullWidth
              variant="outlined"
              placeholder="Password"
              type={isPasswordVisible ? "text" : "password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      component="img"
                      src="/assets/padlock.svg"
                      alt="Email Icon"
                      sx={{
                        width: 24,
                        height: 24,
                        filter:
                          theme.palette.mode === "dark"
                            ? "invert(84%) sepia(23%) saturate(437%) hue-rotate(54deg) brightness(96%) contrast(91%)"
                            : "invert(48%) sepia(79%) saturate(384%) hue-rotate(87deg) brightness(94%) contrast(88%)",
                      }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      <Box
                        component="img"
                        src={
                          isPasswordVisible
                            ? "/assets/seen.svg"
                            : "/assets/unseen.svg"
                        }
                        alt="Visibility Icon"
                        sx={{
                          width: 30,
                          height: 30,
                          filter:
                            theme.palette.mode === "dark"
                              ? "invert(84%) sepia(23%) saturate(437%) hue-rotate(54deg) brightness(96%) contrast(91%)"
                              : "invert(48%) sepia(79%) saturate(384%) hue-rotate(87deg) brightness(94%) contrast(88%)",
                        }}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
              sx={{
                mb: 3,
                borderRadius: "8px",
                background: theme.palette.background.default,
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.primary.light,
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                  },
                },
              }}
            />
  
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              disabled={loading}
              sx={{
                padding: "10px 20px",
                fontSize: "1.1rem",
                borderRadius: "8px",
                backgroundColor: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: theme.palette.primary.light,
                  boxShadow: `0 0 15px ${theme.palette.primary.main}`,
                },
                "&:active": {
                  boxShadow: `0 0 20px ${theme.palette.primary.light}`,
                },
              }}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
  
            {/* Links section */}
            <Box sx={{ mt: 3, textAlign: "center" }}>
              <Typography
                onClick={onForgotPasswordClick}
                sx={{
                  fontSize: "0.9rem",
                  color: theme.palette.primary.light,
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
              >
                Forgot Password?
              </Typography>
  
              <Typography sx={{ mt: 2, fontSize: "0.9rem" }}>
                Don't have an account?{" "}
                <span
                  onClick={onSignupClick}
                  style={{
                    color: theme.palette.primary.main,
                    cursor: "pointer",
                    textDecoration: "underline",
                  }}
                >
                  Sign Up
                </span>
              </Typography>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
