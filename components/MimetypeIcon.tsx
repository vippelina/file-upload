import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconName,
  IconPrefix,
  library,
} from "@fortawesome/fontawesome-svg-core";

import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas);

const mapper: { [name: string]: IconName } = {
  ["image"]: "file-image",
  ["audio"]: "file-audio",
  ["video"]: "file-video",
  ["video/mp4"]: "file-video",
  ["text/xml"]: "file-code",
  ["audio/mpeg"]: "file-audio",
  ["video/quicktime"]: "file-video",
  // Documents
  ["application/pdf"]: "file-pdf",
  ["application/msword"]: "file-word",
  ["application/vnd.ms-word"]: "file-word",
  ["application/vnd.oasis.opendocument.text"]: "file-word",
  ["application/vnd.openxmlformats-officedocument.wordprocessingml"]:
    "file-word",
  ["application/vnd.ms-excel"]: "file-excel",
  ["application/vnd.openxmlformats-officedocument.spreadsheetml"]: "file-excel",
  ["application/vnd.oasis.opendocument.spreadsheet"]: "file-excel",
  ["application/vnd.ms-powerpoint"]: "file-powerpoint",
  ["application/vnd.openxmlformats-officedocument.presentationml"]:
    "file-powerpoint",
  ["application/vnd.oasis.opendocument.presentation"]: "file-powerpoint",
  ["text/plain"]: "file-text",
  ["text/html"]: "file-code",
  ["application/json"]: "file-code",
  // Archives
  ["application/gzip"]: "file-archive",
  ["application/zip"]: "file-archive",
};
interface MimetypeIconProps {
  mimetype: string;
}

const MimetypeIcon: React.FC<MimetypeIconProps> = ({ mimetype }) => {
  const iconString = mapper[mimetype] || "file";
  console.log("vippe moimetype", mimetype);
  console.log("vippe gotIconString", iconString);
  return <FontAwesomeIcon icon={["fas", iconString]} />;
};

export default MimetypeIcon;
