import * as z from "zod";

export const resetPasswordSchema = z.object({
  email: z.email().nonempty("This Field is Required"),
  newPassword: z
    .string()
    .nonempty("required")
    .min(6, "min length is 6")
    .max(14, "max length is 14"),
});

export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
