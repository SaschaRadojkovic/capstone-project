import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ token }) {
      console.log("token", token);
      // `/admin` requires admin role

      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: ["/api", "/barcodeScanner", "/product", "/products", "/settings"],
};
