import * as z from "zod";

export const waitingListValidation = z.object({
  email: z.string().email("Invalid email address"),
});

export type WaitingListFormData = z.infer<typeof waitingListValidation>;
