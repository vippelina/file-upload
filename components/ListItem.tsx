import { ExternalLinkIcon } from "@chakra-ui/icons";
import { Link, Td, Tr } from "@chakra-ui/react";
import React from "react";
import MimetypeIcon from "./MimetypeIcon";

export interface ListItemProps {
  creator: string;
  created: Date;
  filename: string;
  description: string;
  path: string;
  _id: string;
  mimetype: string;
}

const ListItem: React.FC<ListItemProps> = ({
  created,
  creator,
  filename,
  description,
  mimetype,
}) => {
  const formattedDate = new Date(created).toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <Tr>
      <Td>
        <Link href={`/uploads/${filename}`} target="_blank">
          {filename}
          <ExternalLinkIcon mx="2px" />
        </Link>
      </Td>
      <Td>{creator}</Td>
      <Td maxW={200}>{description}</Td>
      <Td>{formattedDate}</Td>
      <Td>
        <MimetypeIcon mimetype={mimetype} />
      </Td>
    </Tr>
  );
};

export default ListItem;
