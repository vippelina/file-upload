// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import getDbClient from "./services/database.service";
import fs from "fs";

const dbName = process.env.DB_NAME;
type Data = {
  name: string;
};

interface ProcessedFile {
  name?: string;
  file?: File;
}

const saveIncomingFile = (req: NextApiRequest): Promise<ProcessedFile> => {
  return new Promise<ProcessedFile>((resolve, reject) => {
    const form = new formidable.IncomingForm();
    const file: ProcessedFile = {};
    //TODO ONLY USE PARSE
    form.parse(req, (err) => {
      reject(err);
    });
    form.on("file", (name, incomingFile) => {
      file.name = name;
      file.file = incomingFile;
    });
    form.on("end", () => {
      if (file) return resolve(file);
      return reject(new Error("Incoming form data did not have a file"));
    });
    form.on("error", (err) => {
      return reject(err);
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await getDbClient;
  const db = client.db(dbName);
  const uploads = db.collection("uploads");
  const upload = await uploads.insertOne({ name: "hejehj" });
  const savedUpload = await uploads.findOne({ name: "hejehj" });
  console.log("vippe savedUpload", savedUpload);
  res.status(200);
  res.end();
  if (req.method === "GET") {
    res.status(200);
  }
  if (req.method === "POST") {
    // parse the formData with formidable
    // 1.  spara filen och få pathen
    // 2. Spara ner metadata i mongo
    // 3. Returnera UploadedFile
    const savedFile = await saveIncomingFile(req);

    if (!savedFile) res.status(404);
    //res.status(200).json(savedFile); // TODO FIX SO THAT THE SAVED FILE*S PATH IS RETURNED
    //res.status(200).json({ name: "John Doe" });
  } else {
    // Handle any other HTTP method
  }
}

// kod för att flytta filen
// const oldPath = incomingFile.filepath;
// const newPath = `./public/uploads/${incomingFile.originalFilename}`;
// console.log("vippe old path", oldPath);
// console.log("vippe got newPath", newPath);
// fs.rename(oldPath, newPath, function (err) {
//   console.log("vippe got err", err);
//   if (err) throw err;
//   console.log("bubba!");
//   console.log("newpath", newPath);
// });

export const config = {
  api: {
    bodyParser: false,
  },
};
