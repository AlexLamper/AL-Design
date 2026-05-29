import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Vul je naam in").max(120),
  email: z.string().email("Vul een geldig e-mailadres in"),
  phone: z.string().max(40).optional().or(z.literal("")),
  projectType: z.string().min(1, "Kies een projecttype").max(80),
  message: z.string().min(10, "Vertel kort waar we je mee kunnen helpen").max(4000),
  // Honeypot — must stay empty (bots fill it).
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
