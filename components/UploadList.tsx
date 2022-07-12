import {
  Table,
  TableContainer,
  Tbody,
  Text,
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
  if (isLoading) return <Text>Loading...</Text>;
  return (
    <>
      {uploads && uploads.length ? (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>File</Th>
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
      ) : (
        <Text>Add upload to see here</Text>
      )}
    </>
  );
};

export default UploadList;
