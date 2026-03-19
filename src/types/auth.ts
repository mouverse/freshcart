import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/\d/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  rePassword: z.string(),
  phone: z.string().regex(/^[+]?[\d\s()-]+$/, "Invalid phone number format"),
}).refine((data) => data.password === data.rePassword, {
  message: "Passwords do not match",
  path: ["rePassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;

export interface SignupResponse {
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  token?: string;
}

export interface SignupErrorResponse {
  message: string;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}
