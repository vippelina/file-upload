import { File } from "formidable";

export interface parsedFormDataT {
  customName?: string;
  incomingFile: File;
  creator: string;
  description: string;
  mimetype: string;
  filename: string;
}

export interface UploadT {
  creator: string;
  description: string;
  mimetype: string;
  path: string;
  created: Date;
  filename: string;
}
