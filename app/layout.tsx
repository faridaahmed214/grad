import { ThemeProvider } from "../context/ThemeContext";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { Toaster } from 'react-hot-toast';
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <style>
          {`
            body {
              transition: background-color 0.3s ease, color 0.3s ease;
            }
          `}
        </style>
      </head>
      <body>
        <SessionProvider refetchInterval={5 * 60} refetchOnWindowFocus={true}>
          <ThemeProvider>
            <ThemeRegistry>{children}</ThemeRegistry>
          </ThemeProvider>
          <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
