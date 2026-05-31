import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Single-admin authentication. Credentials are kept in environment variables
 * (ADMIN_EMAIL / ADMIN_PASSWORD) rather than a users collection — there is one
 * operator for this agency tool, so a user table would be overengineering.
 */
function constantTimeEquals(a: string, b: string): boolean {
  // Hash to a fixed length first so timingSafeEqual never sees mismatched
  // buffer sizes (which would itself leak length and throw).
  const ha = createHash("sha256").update(a).digest();
  const hb = createHash("sha256").update(b).digest();
  return timingSafeEqual(ha, hb);
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    Credentials({
      credentials: {
        email: { label: "E-mail", type: "email" },
        password: { label: "Wachtwoord", type: "password" },
      },
      authorize(credentials) {
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (!adminEmail || !adminPassword) return null;

        const email = String(credentials?.email ?? "").toLowerCase().trim();
        const password = String(credentials?.password ?? "");

        const emailOk = constantTimeEquals(email, adminEmail.toLowerCase().trim());
        const passwordOk = constantTimeEquals(password, adminPassword);
        if (!emailOk || !passwordOk) return null;

        return { id: "admin", email: adminEmail, name: "Beheerder" };
      },
    }),
  ],
});
