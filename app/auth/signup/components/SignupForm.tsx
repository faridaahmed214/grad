import axiosInstance from "@/lib/axiosSetup";
import toast from "react-hot-toast";
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
import {
  getInputStyle,
  submitButtonStyle,
  titleStyle,
} from "../style/signupFormStyles";

const validationSchema = Yup.object().shape({
  userName: Yup.string().required("Username is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Must contain an uppercase letter")
    .matches(/[a-z]/, "Must contain a lowercase letter")
    .matches(/[0-9]/, "Must contain a number")
    .matches(/[@$!%*#?&]/, "Must contain a special character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

interface SignupFormValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface SignupFormProps {
  onLoginClick?: () => void; 
}

const SignupForm: React.FC<SignupFormProps> = ({ onLoginClick }) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false); // Add this state
  const theme = useTheme();

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  const handleSubmit = async (values: SignupFormValues) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/api/Accounts/Register', {
        email: values.email,
        userName: values.userName,
        password: values.password
      });

      if (response.data) {
        toast.success('Registration successful!');
        // Set registration success state to true
        setRegistrationSuccess(true);
        // Store the token if needed
        const { email, userName, token } = response.data;
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Formik
      initialValues={{
        userName: "",
        email: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ errors, touched, handleChange, handleBlur, resetForm }) => {
        // Add useEffect to reset form when modal closes
        React.useEffect(() => {
          return () => {
            resetForm();
            setIsPasswordVisible(false);
            setIsConfirmPasswordVisible(false);
            setRegistrationSuccess(false); // Reset this state too
          };
        }, [resetForm]);

        return (
          <Form style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
            <Box sx={{ mb: 3, textAlign: "center" }}>
              <Typography variant="h4" sx={titleStyle(theme)}>
                Sign Up
              </Typography>
            </Box>

            {/* Username */}
            <Field
              name="userName"
              as={TextField}
              fullWidth
              variant="outlined"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              error={Boolean(touched.userName && errors.userName)}
              helperText={touched.userName && errors.userName}
              sx={getInputStyle(theme)}
              disabled={registrationSuccess} // Disable after success
            />

            {/* Email */}
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
              sx={getInputStyle(theme)}
              disabled={registrationSuccess} // Disable after success
            />

            {/* Password */}
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
                    <IconButton onClick={togglePasswordVisibility} edge="end" disabled={registrationSuccess}>
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
              sx={getInputStyle(theme)}
              disabled={registrationSuccess} // Disable after success
            />

            {/* Confirm Password */}
            <Field
              name="confirmPassword"
              as={TextField}
              fullWidth
              variant="outlined"
              placeholder="Confirm Password"
              type={isConfirmPasswordVisible ? "text" : "password"}
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
                    <IconButton onClick={toggleConfirmPasswordVisibility} edge="end" disabled={registrationSuccess}>
                      <Box
                        component="img"
                        src={
                          isConfirmPasswordVisible
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
              error={Boolean(touched.confirmPassword && errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
              sx={getInputStyle(theme)}
              disabled={registrationSuccess} // Disable after success
            />

            {/* Submit Button - Changes to Login Button after successful registration */}
            {registrationSuccess ? (
              <Button
                fullWidth
                variant="outlined"
                color="primary"
                onClick={onLoginClick}
                sx={{
                  ...submitButtonStyle(theme),
                  color: theme.palette.primary.light,
                  boxShadow: `0 0 10px 3px ${theme.palette.primary.main}`,
                  animation: "pulseGlow 2s infinite",
                  transition: "box-shadow 0.3s ease-in-out",
                }}
              >
                Log In
              </Button>
            ) : (
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                sx={submitButtonStyle(theme)}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </Button>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};

export default SignupForm;
