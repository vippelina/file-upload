import React from "react";
import useUploads from "../utils/useUploads";
import ListItem from "./ListItem";
interface UploadListProps {}
import {
  TableContainer,
  Table,
  TableCaption,
  Tr,
  Td,
  Tbody,
  Th,
  Thead,
  Tfoot,
} from "@chakra-ui/react";

const today = new Date();

const mockData = [
  {
    creator: "vibeke tengeroth",
    created: today,
    filename: "vippelajlaj.mp3",
    path: "./public/uploads/vippelur.mp3",
    description: "a very long description or a short one depending on whartt h",
  },
  {
    creator: "anders tengeroth",
    created: today,
    filename: "anderslajlaj.mp3",
    path: "./public/uploads/vippelur.mp3",
    description: "a very long description or a short one depending on whartt h",
  },
  {
    creator: "vibeke tengeroth",
    created: today,
    filename: "vippelajlaj.mp3",
    path: "./public/uploads/vippelur.mp3",
    description: "a very long description or a short one depending on whartt h",
  },
];

// export interface ListItemProps {
//   creator: string;
//   created: Date;
//   filename: string;
//   description: string;
//   relativePath: string;
// }

const UploadList: React.FC<UploadListProps> = ({}) => {
  const { uploads, isLoading, isError } = useUploads();

  return (
    <>
      {mockData.length && (
        <TableContainer>
          <Table variant="simple">
            <TableCaption>File uploads</TableCaption>
            <Thead>
              <Tr>
                <Th>Name of file</Th>
                <Th>Uploaded by</Th>
                <Th>Description</Th>
                <Th>Uploaded at</Th>
              </Tr>
            </Thead>
            <Tbody>
              <>
                {mockData.map((d) => (
                  <ListItem {...d} />
                ))}
              </>
              <ListItem {...mockData[0]} />
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </>
  );
};

export default UploadList;
