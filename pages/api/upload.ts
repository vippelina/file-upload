// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable, { File } from "formidable";
import fs from "fs";
import type { NextApiRequest, NextApiResponse } from "next";

const dbName = process.env.DB_NAME;
type Data = {
  name: string;
};

enum fileTypeT {
  pdf = "PDF",
  jpg = "jpg",
}

type parsedFormDataT = {
  customName?: string;
  incomingFile: File;
  creator: string;
  description: string;
  filetype: string;
  // return {
  //   customName: "ny nytt namn", //undefined om
  //   incomingFile: "filen som man får",
  //   publicUrl: undefined,
  //   creator: "Vibeke Tengroth",
  //   description: "hej hej här är en bild",
  //   filetype: "pdf", // todo make enum
  // };
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

//ska returnera alla fält
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
        filetype: uploadedFile.filepath,
        customName: fields.customName as string,
      });
    });
  });

  // form.on("file", (name, incomingFile) => {
  //   file.name = name;
  //   file.file = incomingFile;
  // });
  // form.on("end", () => {
  //   if (file) return resolve(file);
  //   return reject(new Error("Incoming form data did not have a file"));
  // });
  // form.on("error", (err) => {
  //   return reject(err);
  // });
  // kolla om det inte finns någon fil, i så fall returnera fel
  // parsea filen sätt custom filename om finns
  // return {
  //   customName: "ny nytt namn", //undefined om
  //   incomingFile: "filen som man får",
  //   publicUrl: undefined,
  //   creator: "Vibeke Tengroth",
  //   description: "hej hej här är en bild",
  //   filetype: fileTypeT.pdf, // todo make enum
  // };
};

const moveFileToPublicFolder = (
  file: File,
  customName?: string
): Promise<string> => {
  return new Promise((resolve) => {
    const oldPath = file.filepath;
    const newPath = `./public/uploads/${customName || file.originalFilename}`;

    // using rename will automatically move file if path is different
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      resolve(newPath);
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const client = await getDbClient;
  // const db = client.db(dbName);
  // const uploads = db.collection("uploads");
  // const upload = await uploads.insertOne({ name: "hejehj" });
  // const savedUpload = await uploads.findOne({ name: "hejehj" });

  if (req.method === "GET") {
    res.status(200);
  }
  if (req.method === "POST") {
    // parsea formet
    try {
      const parsedForm = await parseForm(req);

      // flytta filen till rätt ställe
      const publicPath = await moveFileToPublicFolder(
        parsedForm.incomingFile,
        parsedForm.customName
      );

      // // spara filen och returnera en ny lista med alla filer
      // const upload = saveFile()
    } catch (e) {
      console.log("vippe in i cathens");
      console.log("vippe got err", e);
      res.status(500);
      res.end();
    }
    //res.status(200).json(savedFile); // TODO FIX SO THAT THE SAVED FILE*S PATH IS RETURNED
    //res.status(200).json({ name: "John Doe" });
  } else {
    // Handle any other HTTP method
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};
