import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import FileInput from "./FileInput";
import { useSWRConfig } from "swr";
interface fileInputProps {}

interface UploadFormValues {
  creator: string;
  description: string;
  upload: File | undefined;
  customName: string;
}

const UploadForm: React.FC<fileInputProps> = ({}) => {
  const initialValues: UploadFormValues = {
    creator: "",
    description: "",
    upload: undefined,
    customName: "",
  };
  const { mutate } = useSWRConfig();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        const formData = new FormData();
        let key: keyof UploadFormValues;
        for (key in values) {
          formData.append(key, values[key] as string | Blob);
        }

        if (values.customName) formData.append("customName", values.customName);

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        actions.setSubmitting(false);
        mutate("/api/upload");
        actions.resetForm();
      }}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <FormControl>
            <FormLabel htmlFor="creator">Your name: </FormLabel>
            <Field
              id="creator"
              name="creator"
              required
              as={Input}
              placeholder="Your name"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">File description: </FormLabel>
            <Field
              id="description"
              name="description"
              required
              as={Textarea}
              placeholder="About the file..."
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="description">Upload file: </FormLabel>
            <FileInput
              name="upload"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.currentTarget.files || !e.currentTarget.files.length) {
                  return setFieldValue("upload", undefined);
                }
                setFieldValue("upload", e.currentTarget.files[0]);
              }}
              required
              value={undefined}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="customName">
              Custom filename(optional):{" "}
            </FormLabel>
            <Field
              id="customName"
              name="customName"
              as={Input}
              placeholder="my_filename"
            />
          </FormControl>
          <Button type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default UploadForm;
