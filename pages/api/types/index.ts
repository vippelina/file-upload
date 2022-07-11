import { File } from "formidable";
export type parsedFormDataT = {
  customName?: string;
  incomingFile: File;
  creator: string;
  description: string;
  mimetype: string;
};

export interface UploadT {
  creator: string;
  description: string;
  mimetype: string;
  publicUrl: string;
}
