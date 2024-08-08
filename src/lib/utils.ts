import crypto from "crypto";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { env } from "@/env";

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, env.SALT, 1000, 64, "sha512", (err, derivedKey) => {
      console.log("err", err);
      if (err) reject(err);
      const pass = env.SALT + ":" + derivedKey.toString("hex");
      resolve(pass);
    });
  });
}

export function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const [salt, key] = hash.split(":");

    crypto.pbkdf2(password, salt, 1000, 64, "sha512", (err, derivedKey) => {
      if (err) reject(err);
      resolve(key === derivedKey.toString("hex"));
    });
  });
}

export const UserSchema = z
  .object({
    fullName: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    location: z.string(),
    phoneNumber: z.string(),
    role: z.enum(["user", "admin", "owner"]).optional(),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  remember: z.enum(["on"]).optional(),
});

export function SignUserJwt<T extends Record<string, unknown>>(user: T) {
  const token = jwt.sign(user, env.JWTPRIVATEKEY as string, {
    expiresIn: "1d",
  });
  return token;
}

export function VerifyUserJwt<T extends Record<string, unknown>>(
  token: string
) {
  try {
    const user = jwt.verify(token, env.JWTPRIVATEKEY);
    return user as T;
  } catch (err) {
    return null;
  }
}
