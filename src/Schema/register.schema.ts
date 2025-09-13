import * as z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, "name should be atleast 3 chars")
      .nonempty("required")
      .max(10, "max length is 10"),
    email: z.email().nonempty("required"),
    password: z
      .string()
      .nonempty("required")
      .min(6, "min length is 6")
      .max(14, "max length is 14"),
    rePassword: z.string(),
    phone: z.string().regex(/^(\+20|20){0,1}01[0251][0-9]{8}$/),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["repassword"],
    error: "password and repassword not match",
  });

export type registerType = z.infer<typeof registerSchema>