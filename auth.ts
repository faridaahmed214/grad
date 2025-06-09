// app/auth.ts or wherever your auth config is
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "user@example.com" },
        password: { label: "Password", type: "password", placeholder: "********" },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials provided");

        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://deploygrad.runasp.net";

        try {
          const res = await axios.post(`${apiUrl}/api/Accounts/login`, {
            email: credentials.email,
            password: credentials.password,
          });

          const user = res.data;

          if (user && user.token) {
            return {
              id: user.email,
              name: user.userName,
              email: user.email,
              token: user.token,
            };
          }

          throw new Error("Invalid credentials");
        } catch (error: any) {
          const errorMessage = error?.response?.data?.message || error.message || "Login failed";
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken as string;
      return session;
    },
    // Add this redirect callback
    async redirect({ url, baseUrl }) {
      // If the URL starts with the base URL, allow it
      if (url.startsWith(baseUrl)) return url;
      // If it's a relative URL, prepend the base URL
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Otherwise, return to the home page
      return `${baseUrl}/home`;
    },
  },
});
