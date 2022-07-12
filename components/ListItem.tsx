import React from "react";
import { Tr, Td, Text } from "@chakra-ui/react";

export interface ListItemProps {
  creator: string;
  created: Date;
  filename: string;
  description: string;
  path: string;
}

const getPublicPath = (path: string) => {
  return "http://svt.se"; // todo fix
};

const ListItem: React.FC<ListItemProps> = ({
  created,
  creator,
  filename,
  path,
  description,
}) => {
  const publicPath = getPublicPath(path);
  console.log("vippe in i listitem render");
  return (
    <Tr>
      <Td>
        <a href={publicPath}>{filename}</a>
      </Td>
      <Td>{creator}</Td>
      <Td>{description}</Td>
      <Td>{created.toDateString()}</Td>
    </Tr>
  );
};

export default ListItem;
