// This is a dynamic route, meaning that it will match any route that starts with /api/auth/. The [...nextauth] part is a catch-all parameter that will capture the rest of the URL and pass it to NextAuth for handling.

export { GET, POST } from "@/app/_lib/auth";
