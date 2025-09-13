import * as z from "zod";

export const PayOnlineSchema = z.object({
  details: z.string().nonempty("This Field Required"),
  phone: z
    .string()
    .regex(/^(?:\+20|0)?(10|11|12|15)[0-9]{8}$/, "Please Enter Your Number"),
  city: z.string().nonempty("This Field Required"),
});

export type PayOnlineType = z.infer<typeof PayOnlineSchema>;
