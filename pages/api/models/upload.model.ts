import getDbClient from "../services/database.service";
import { parsedFormDataT, UploadT } from "../types";
import { Document, WithId } from "mongodb";

const dbName = process.env.DB_NAME;

const getUploadsCollection = async () => {
  const client = await getDbClient;
  const db = client.db(dbName);
  const uploadsCol = db.collection<UploadT>("uploads");
  return uploadsCol;
};

export async function saveAndGetUpload(
  upload: UploadT
): Promise<WithId<UploadT>> {
  const uploadsCol = await getUploadsCollection();
  const result = await uploadsCol.insertOne(upload);
  const inserted = await uploadsCol.findOne({ _id: result.insertedId });
  if (!inserted) throw new Error("Somehow the upload was not saved");
  return inserted;
}

export async function getAllUploads(): Promise<Array<WithId<UploadT>>> {
  const uploadsCol = await getUploadsCollection();
  return uploadsCol.find().toArray();
}
