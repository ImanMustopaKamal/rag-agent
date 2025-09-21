import { z } from "zod";
import {
  ALLOWED_FILE_EXTENSION,
  formatFileSize,
  MAX_FILE_SIZE,
} from "../constants/file.constant";

export const fileSchema = z.object({
  originalname: z
    .string()
    .refine((name) => name.endsWith(ALLOWED_FILE_EXTENSION), {
      message: "Only .md files are allowed",
    }),
  size: z.number().max(MAX_FILE_SIZE, {
    message: `File size must not exceed ${formatFileSize(MAX_FILE_SIZE)}`,
  }),
});

export type FileValidation = z.infer<typeof fileSchema>;
