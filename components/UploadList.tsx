import React from "react";
import useUploads from "../utils/useUploads";
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

const UploadList: React.FC<UploadListProps> = ({}) => {
  const { uploads, isLoading, isError } = useUploads();
  return (
    <>
      <TableContainer>
        <Table variant="simple">
          <TableCaption>File uploads</TableCaption>
          <Thead>
            <Tr>
              <Th>Name of file</Th>
              <Th>Uploaded by</Th>
              <Th>Uploaded at</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>
                <a href="http://svt.se">samlad_info.pdf</a>
              </Td>
              <Td>Vibeke Tengroth</Td>
              <Td>{new Date().toDateString()}</Td>
            </Tr>
            <Tr>
              <Td>
                <a href="http://svt.se">siljan.mp3</a>
              </Td>
              <Td>Vibeke Tengroth</Td>
              <Td>{new Date().toDateString()}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UploadList;
