import { type JSX } from "react";
import BaseNode from "./BaseNode.tsx";
import GrayScaleIcon from "../../../images/grayscale.svg";

const GrayScaleNode = (): JSX.Element => {
  return (
    <BaseNode step="GrayScale" icon={GrayScaleIcon} />
  );
}

export default GrayScaleNode;