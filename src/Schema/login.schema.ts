import * as z from "zod";

export const loginSchema = z.object({
  email: z.email().nonempty("required"),
  password: z.string().min(6, "min length is 6").max(12, "max length is 12"),
});

export type loginType = z.infer<typeof loginSchema>;
