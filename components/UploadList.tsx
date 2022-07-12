import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import useUploads from "../utils/useUploads";
import ListItem from "./ListItem";
interface UploadListProps {}

const UploadList: React.FC<UploadListProps> = ({}) => {
  const { uploads, isLoading } = useUploads();
  if (uploads && uploads.length) {
    console.log("vippe passing key to listItem", uploads[0]._id);
  }

  return (
    <>
      {uploads && uploads.length && (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>File uploads</TableCaption>
            <Thead>
              <Tr>
                <Th>Name of file</Th>
                <Th>Uploaded by</Th>
                <Th>Description</Th>
                <Th>Uploaded at</Th>
                <Th>Filetype</Th>
              </Tr>
            </Thead>
            <Tbody>
              {uploads.map((upload) => (
                <ListItem {...upload} key={upload._id} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UploadList;
