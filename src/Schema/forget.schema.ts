import * as z from "zod";

export const forgetPassSchema = z.object({
  email: z.email().nonempty("Enter Your Email"),
});

export type forgetType = z.infer<typeof forgetPassSchema>;
