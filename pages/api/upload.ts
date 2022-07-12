// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable, { File } from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUploads, saveAndGetUpload } from "./models/upload.model";
import { parsedFormDataT } from "./types";

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
        filename: uploadedFile.originalFilename as string,
      });
    });
  });
};

const moveFileToPublicFolder = (
  file: File,
  customName?: string
): Promise<{ newPath: string; newName: string }> => {
  return new Promise((resolve) => {
    const oldPath = file.filepath;
    const ext = file.originalFilename?.split(".").pop();
    const newName = customName
      ? `${customName}.${ext}`
      : file.originalFilename || `untitled.${ext}`;
    const newPath = `./public/uploads/${newName}`;

    // using rename will automatically move file if path is different
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      resolve({ newPath, newName });
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { incomingFile, customName, creator, description, mimetype } =
      await parseForm(req);
    const { newPath, newName } = await moveFileToPublicFolder(
      incomingFile,
      customName
    );

    const upload = await saveAndGetUpload({
      path: newPath,
      creator: creator,
      description: description,
      mimetype: mimetype,
      filename: newName,
      created: new Date(),
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
    bodyParser: false, // for multipart/formdata to work
  },
};
