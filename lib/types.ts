import { z } from "zod";

export const signUpSchema = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password should be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    // for connecting the error to the confirmPassword field
    path: ["confirmPassword"],
  });

// infer is used to get the type of the schema and Exporting this type to use in the Server side
export type SignUpForm = z.infer<typeof signUpSchema>;
