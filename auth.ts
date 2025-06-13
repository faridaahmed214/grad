// app/auth.ts
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

        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://deploygrad.runasp.net";

        try {
          const res = await axios.post(`${apiUrl}/api/Accounts/login`, {
            email: credentials.email, 
            password: credentials.password,
          });

          const user = res.data;
          console.log(res.data)
          if (user && user.token) {
            return {
              id: user.email,
              name: user.userName,
              email: user.email,
              token: user.token,
            };
          }

          return null;
        } catch (error: any) {
          console.error("Login error:", error?.response?.data || error.message);
          const errorMessage = error?.response?.data?.message || error.message || "Login failed";
          throw new Error(JSON.stringify({ message: errorMessage }));
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
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      return `${baseUrl}/home`;
    },
  },
});
