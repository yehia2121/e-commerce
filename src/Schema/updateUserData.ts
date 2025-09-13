import * as z from "zod";

export const updateUserDataSchema = z.object({
  name: z.string().nonempty("This Field is Required"),
  email: z.email().nonempty("This Field is Required"),
  phone: z.string().regex(/^(\+20|20){0,1}01[0251][0-9]{8}$/),
});

export type updateUserDatatype = z.infer<typeof updateUserDataSchema>;
