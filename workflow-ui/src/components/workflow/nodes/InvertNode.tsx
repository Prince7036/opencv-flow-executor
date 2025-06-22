import { type JSX } from "react";
import InvertIcon from "../../../images/invert.svg";
import BaseNode from "./BaseNode.tsx";

const InvertNode = (): JSX.Element => {
  return (
    <BaseNode step="Invert" icon={InvertIcon} />
  );
};

export default InvertNode;