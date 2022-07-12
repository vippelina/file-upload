import { Td, Tr, Link } from "@chakra-ui/react";
import React from "react";
import MimetypeIcon from "./MimetypeIcon";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export interface ListItemProps {
  creator: string;
  created: Date;
  filename: string;
  description: string;
  path: string;
  _id: string;
  mimetype: string;
}

const getPublicPath = (path: string): string => {
  const base = "http://localhost:3000"; // todo make dynamic
  const strippedPath = path.replace("./public", "");
  console.log("vippe strippedpath", strippedPath);
  return `${base}${strippedPath}`;
};

const ListItem: React.FC<ListItemProps> = ({
  created,
  creator,
  filename,
  path,
  description,
  mimetype,
  _id,
}) => {
  console.log("vippe path", path);
  console.log("vippe filename", filename);
  const publicPath = getPublicPath(path);
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
