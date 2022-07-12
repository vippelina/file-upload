import { File } from "formidable";
export type parsedFormDataT = {
  customName?: string;
  incomingFile: File;
  creator: string;
  description: string;
  mimetype: string;
  filename: string;
};

export interface UploadT {
  creator: string;
  description: string;
  mimetype: string;
  publicUrl: string;
  created: Date;
  filename: string;
}
