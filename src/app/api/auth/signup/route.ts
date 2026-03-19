import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { signupSchema, type SignupFormData, type SignupResponse, type SignupErrorResponse } from "@/types/auth";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validatedData: SignupFormData = signupSchema.parse(body);

    const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    });

    const data = await response.json();

    if (!response.ok) {
      const errorResponse: SignupErrorResponse = {
        message: data.message || "Signup failed",
        errors: data.errors || undefined,
      };
      return NextResponse.json(errorResponse, { status: response.status });
    }

    const successResponse: SignupResponse = {
      message: data.message || "Account created successfully",
      user: data.user || undefined,
      token: data.token || undefined,
    };
    return NextResponse.json(successResponse, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const validationError: SignupErrorResponse = {
        message: "Validation error",
        errors: error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      };
      return NextResponse.json(validationError, { status: 400 });
    }

    console.error("Signup error:", error);
    const serverError: SignupErrorResponse = {
      message: "Internal server error",
    };
    return NextResponse.json(serverError, { status: 500 });
  }
}
