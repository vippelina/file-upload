import { IconName, library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import mapper from "../utils/mimetypeIconMapper";
library.add(fas);

interface MimetypeIconProps {
  mimetype: string;
}

const MimetypeIcon: React.FC<MimetypeIconProps> = ({ mimetype }) => {
  const iconString = mapper[mimetype] || "file";
  return <FontAwesomeIcon icon={["fas", iconString]} />;
};

export default MimetypeIcon;
