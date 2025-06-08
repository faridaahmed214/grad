import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  useTheme,
  IconButton,
  InputAdornment,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { getInputStyle } from "../styles/forget";

const emailSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const codeSchema = Yup.object({
  code: Yup.string().required("Code is required"),
});

const passwordSchema = Yup.object({
  password: Yup.string().min(6, "Too short").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

const ForgotPasswordForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const theme = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);

  const handleSendCode = (values: { email: string }) => {
    setEmail(values.email);
    setStep(2);
  };

  const handleVerifyCode = () => setStep(3);
  const handleResetPassword = () => alert("Password successfully reset");

  const renderTextField = (
    name: string,
    placeholder: string,
    type: string = "text",
    visible: boolean = true,
    toggleVisibility?: () => void
  ) => (
    <Field
      name={name}
      as={TextField}
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      type={visible ? type : "password"}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Box
              component="img"
              src="/assets/padlock.svg"
              alt="Icon"
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
        endAdornment: toggleVisibility && (
          <InputAdornment position="end">
            <IconButton onClick={toggleVisibility} edge="end">
              <Box
                component="img"
                src={visible ? "/assets/seen.svg" : "/assets/unseen.svg"}
                alt="Toggle Visibility"
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
      sx={getInputStyle(theme)}
    />
  );

  return (
    <Box sx={{ width: "100%", maxWidth: 400, mx: "auto" }}>
      <Box sx={{ mb: 3, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontFamily: "PressStart2P, sans-serif",
            color: theme.palette.primary.main,
            textShadow: `0 0 5px ${theme.palette.primary.light}`,
          }}
        >
          Forgot Password
        </Typography>
      </Box>

      {step === 1 && (
        <Formik
          initialValues={{ email: "" }}
          validationSchema={emailSchema}
          onSubmit={handleSendCode}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form>
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

              <Button fullWidth variant="contained" type="submit">
                Send Code
              </Button>
            </Form>
          )}
        </Formik>
      )}

      {step === 2 && (
        <Formik
          initialValues={{ code: "" }}
          validationSchema={codeSchema}
          onSubmit={handleVerifyCode}
        >
          {({ errors, touched, handleChange, handleBlur }) => (
            <Form>
              <Box
                display="flex"
                alignItems="center"
                position="absolute"
                top={16}
                left={16}
                zIndex={10}
              >
                <IconButton onClick={() => setStep(1)} size="small">
                  <ArrowBackIcon fontSize="small" />
                </IconButton>
              </Box>

              <Field
                name="code"
                as={TextField}
                fullWidth
                placeholder="Verification Code"
                variant="outlined"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box
                        component="img"
                        src="/assets/verified.svg"
                        alt="verified Icon"
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
                error={Boolean(touched.code && errors.code)}
                helperText={touched.code && errors.code}
                sx={getInputStyle(theme)}
              />

              <Button fullWidth variant="contained" type="submit">
                Verify
              </Button>

              <Box textAlign="center" mt={2}>
                <Typography
                  onClick={() => alert("Code resent")}
                  sx={{ cursor: "pointer", color: theme.palette.primary.main }}
                >
                  Resend Code
                </Typography>
              </Box>
            </Form>
          )}
        </Formik>
      )}

      {step === 3 && (
        <Formik
          initialValues={{ password: "", confirmPassword: "" }}
          validationSchema={passwordSchema}
          onSubmit={handleResetPassword}
        >
          <Form>
            {renderTextField(
              "password",
              "Password",
              "text",
              isPasswordVisible,
              () => setIsPasswordVisible(!isPasswordVisible)
            )}

            {renderTextField(
              "confirmPassword",
              "Confirm Password",
              "text",
              isConfirmPasswordVisible,
              () => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
            )}

            <Button fullWidth variant="contained" type="submit">
              Reset Password
            </Button>
          </Form>
        </Formik>
      )}
    </Box>
  );
};

export default ForgotPasswordForm;
