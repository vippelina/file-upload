import React from "react";

interface fileInputProps {}

const FileInput: React.FC<fileInputProps> = ({}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedFiles, setSelectedFiles] = React.useState<
    HTMLInputElement["files"] | null
  >(null);

  console.log("vippe selectedFiles", selectedFiles);
  const onFormSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const formData = new FormData();
    if (!selectedFiles?.length) return;

    // prepare payload
    formData.append("upload", selectedFiles[0]);

    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    // TODO samla på dig all data o skicka till servern
  };

  return (
    <>
      <form>
        <p>State:</p>
        <p>Loading: {isLoading ? "true" : "false"}</p>
        <p>SelectedFiles: {selectedFiles?.length}</p>
        <input type="file" onChange={(e) => setSelectedFiles(e.target.files)} />
        <input type="submit" onClick={onFormSubmit} />
      </form>
    </>
  );
};

export default FileInput;
