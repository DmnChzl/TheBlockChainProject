import { Injectable } from '@angular/core';
import { FileRecord } from '@shared/models/file-record.model';
import { generateHashFromFile } from '@shared/utils/cryptoUtils';

@Injectable()
export class FileRecordService {
  async getFileRecord(file: File): Promise<FileRecord> {
    const fileHash = await generateHashFromFile(file);

    return {
      fileName: file.name,
      fileHash,
      fileSize: file.size,
      mimeType: file.type,
      updatedAt: file.lastModified,
    };
  }
}
