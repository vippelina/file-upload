// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable, { File } from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import getDbClient from "./services/database.service";
import { parsedFormDataT, UploadT } from "./types";
import { getAllUploads, saveAndGetUpload } from "./models/upload.model";
import { json } from "stream/consumers";

const dbName = process.env.DB_NAME;
// todo fix to postresponsedata

const parseForm = (req: NextApiRequest): Promise<parsedFormDataT> => {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      // validation
      if (err) reject(err);
      if (!files.upload) reject(new Error("No file was sent"));
      if (!fields.creator) reject(new Error("Field: creator is missing"));
      if (!fields.description)
        reject(new Error("Field: description is missing"));

      // bake return data
      const uploadedFile = files.upload as File;

      return resolve({
        incomingFile: uploadedFile,
        creator: fields.creator as string,
        description: fields.description as string,
        mimetype: uploadedFile.mimetype as string,
        customName: fields.customName as string,
      });
    });
  });
};

const moveFileToPublicFolder = (
  file: File,
  customName?: string
): Promise<string> => {
  return new Promise((resolve) => {
    const oldPath = file.filepath;
    const ext = file.originalFilename?.split(".").pop();
    const name = customName ? `${customName}.${ext}` : file.originalFilename;
    const newPath = `./public/uploads/${name}`;

    // using rename will automatically move file if path is different
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      resolve(newPath);
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const parsedForm = await parseForm(req);
    const { incomingFile, customName } = parsedForm;
    // flytta filen till rätt ställe
    const publicUrl = await moveFileToPublicFolder(incomingFile, customName);

    const upload = await saveAndGetUpload({
      publicUrl,
      creator: parsedForm.creator,
      description: parsedForm.description,
      mimetype: parsedForm.mimetype,
    });
    res.status(200).json(upload);
  } else {
    if (req.method === "GET") {
      const uploads = await getAllUploads();
      res.status(200).json(uploads);
    }
    // Handle any other HTTP method
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
