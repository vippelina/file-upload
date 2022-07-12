import { Input } from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
};

const File: React.FC<InputFieldProps> = ({ size: _, ...props }) => {
  const [field] = useField(props);
  return <Input type="file" {...field} {...props} id={field.name} />;
};

export default File;
