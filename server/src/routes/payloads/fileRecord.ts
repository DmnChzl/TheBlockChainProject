import { z } from "zod";

export const fileRecordSchema = z.object({
  fileName: z.string(),
  fileHash: z.string(),
  fileSize: z.number(),
  mimeType: z.string(),
  updatedAt: z.number(),
});

export type FileRecord = z.infer<typeof fileRecordSchema>;
