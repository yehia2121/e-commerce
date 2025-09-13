import * as z from "zod";

export const codeSchema = z.object({
  resetCode: z.string().max(6, "Max Length Is 6").min(6, "Min Lenght Is 6"),
});

export type codeType = z.infer<typeof codeSchema>;
