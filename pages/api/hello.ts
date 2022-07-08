// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs";
type Data = {
  name: string;
};

interface ProcessedFile {
  name?: string;
  file?: File;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    // Process a POST request
    console.log("vippe in i post");
    console.log("dirname", __dirname);

    // parse the formData with formidable
    const form = new formidable.IncomingForm();
    const file: ProcessedFile = { name: "" };
    form.on("file", (name, incomingFile) => {
      console.log("got file!");
      file.name = name;
      file.file = incomingFile;
      const oldPath = incomingFile.filepath;
      const newPath = `./public/uploads/${incomingFile.originalFilename}`;
      console.log("vippe old path", oldPath);
      console.log("vippe got newPath", newPath);
      fs.rename(oldPath, newPath, function (err) {
        console.log("vippe got err", err);
        if (err) throw err;
        console.log("bubba!");
        console.log("newpath", newPath);
      });
    });
    form.parse(req, () => {
      //
    });
    form.on("end", () => {
      console.log("vippe klar!", file);
    });
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
