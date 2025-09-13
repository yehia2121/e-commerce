
import * as z from "zod";

export const updatePasswordSchema = z
  .object({
    currentPassword: z.string().nonempty("Enter Your Old Password"),
    password: z.string().nonempty("Enter Your New Password"),
    rePassword: z.string().nonempty("Enter Your Repassword"),
  })
  .refine((object) => object.password === object.rePassword, {
    path: ["rePassword"],
    error: "Password & rePassword Isn't Match",
  });

export type updatePasswordType = z.infer<typeof updatePasswordSchema>;
