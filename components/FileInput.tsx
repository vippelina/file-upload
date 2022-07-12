import React from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  Textarea,
  Button,
} from "@chakra-ui/react";
import {
  Formik,
  FormikHelpers,
  FormikProps,
  Form,
  Field,
  FieldProps,
} from "formik";
interface fileInputProps {}

interface UploadFormValues {
  creator: string;
  description: string;
  upload?: File;
  customName?: string;
}
import UploadFileInput from "./File";

const UploadForm: React.FC<fileInputProps> = ({}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);

  const [selectedFiles, setSelectedFiles] = React.useState<
    HTMLInputElement["files"] | null
  >(null);

  console.log("vippe selectedFiles", selectedFiles);

  // const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   console.log("vippe form data", e.currentTarget);
  //   const formData = new FormData();
  //   if (!selectedFiles?.length) return;

  //   // prepare payload
  //   formData.append("upload", selectedFiles[0]);

  //   const response = await fetch("/api/upload", {
  //     method: "POST",
  //     body: formData,
  //   });
  //   // TODO samla på dig all data o skicka till servern
  // };

  // <input type="file" onChange={(e) => setSelectedFiles(e.target.files)} />
  const initialValues: UploadFormValues = {
    creator: "",
    description: "",
  };

  const handleFileChange = () => {};
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, actions) => {
        const formData = new FormData();
        if (!selectedFile) throw new Error("no file added");
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
            <UploadFileInput
              name="upload"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.currentTarget.files || !e.currentTarget.files.length)
                  throw new Error("Crazy no file");
                setFieldValue("upload", e.currentTarget.files[0]);
                setSelectedFile(e.currentTarget.files[0]);
              }}
            />
            {/* <Field
              id="upload"
              name="upload"
              type="file"
              required
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                if (!e.currentTarget.files || !e.currentTarget.files.length)
                  throw new Error("Crazy no file");
                setFieldValue("upload", e.currentTarget.files[0]);
                setSelectedFile(e.currentTarget.files[0]);
              }}
              as={UploadFileInput}
              placeholder="About the file..."
            /> */}
          </FormControl>
          {/* <FormControl>
            <UploadFileInput name="upload" setFieldValue={setFieldValue} />
          </FormControl> */}
          <Button type="submit" isLoading={isSubmitting}>
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );

  // return (
  //   <>
  //     <form onSubmit={onFormSubmit}>
  //       <FormControl>
  //         <FormLabel htmlFor="creator">Your name: </FormLabel>
  //         <Input required id="creator" type="text" />
  //       </FormControl>
  //       <FormControl>
  //         <FormLabel htmlFor="Description">Short description: </FormLabel>
  //         <Textarea required id="description" />
  //       </FormControl>
  //       <FormControl>
  //         <FormLabel htmlFor="customName">
  //           Add a custom file name(optional):{" "}
  //         </FormLabel>
  //         <Input id="customName" type="text" />
  //       </FormControl>
  //       <FormControl>
  //         <FormLabel htmlFor="name">Upload file:</FormLabel>
  //         <Input required id="upload" type="file" />
  //       </FormControl>
  //       <Button type="submit">Submit</Button>
  //     </form>
  //   </>
  // );
};

export default UploadForm;
