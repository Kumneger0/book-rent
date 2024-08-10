import { prisma } from "@/db";
import { env } from "@/env";
import { User } from "@prisma/client";
import crypto from "crypto";
import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";
import { ReadonlyURLSearchParams } from "next/navigation";
import { z } from "zod";

export function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, env.SALT, 1000, 64, "sha512", (err, derivedKey) => {
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
    fullName: z.string().min(5, { message: "please provide your name " }),
    email: z
      .string()
      .email()
      .min(1, { message: "please provide valid email please" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string(),
    location: z.string(),
    phoneNumber: z.string(),
    role: z.enum(["user", "admin", "owner"]).optional(),
    terms: z.enum(["on"], { message: "you need to accept our terms policy" }),
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
    expiresIn: "7d",
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

export async function verify<T extends Record<string, unknown>>(
  token: string
): Promise<T> {
  const { payload } = await jwtVerify(
    token,
    new TextEncoder().encode(env.JWTPRIVATEKEY)
  );

  return payload as T;
}

export async function getUser(email: string | undefined) {
  if (!email) return null;
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
}

export const addBookSchema = z.object({
  name: z.string().min(1, "Name is required"),
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
});

type ParamType = { name: string; value: string };

export function useCreateQueryString(
  searchParams: ReadonlyURLSearchParams
): (param: ParamType[] | ParamType) => string {
  return (param: ParamType[] | ParamType) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Array.isArray(param)) {
      param.forEach(({ name, value }) => {
        params.set(name, value);
      });
    }
    if (!Array.isArray(param)) {
      params.set(param.name, param.name);
    }
    return params.toString();
  };
}

export async function getBooks({
  email,
  filterBy,
}: {
  email: string;
  filterBy?: {
    bookName: string;
    status: string;
  };
}) {
  const books = await prisma.user.findFirst({
    where: {
      email: email,
      Book: {
        every: {
          bookName: {
            contains: filterBy?.bookName,
          },
        },
      },
    },
    include: {
      Book: {
        select: {
          id: true,
          bookNo: true,
          bookName: true,
          status: true,
          price: true,
        },
      },
    },
  });

  return books?.Book.map((book, i) => ({
    id: book.id,
    No: String(book.id),
    BookNo: i,
    bookName: book.bookName,
    status: book.status,
    price: String(book.price),
  }));
}