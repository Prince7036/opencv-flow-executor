import { type JSX } from "react";
import BaseNode from "./BaseNode.tsx";
import SharpenIcon from "../../../images/sharpen.svg";

const SharpenNode = (): JSX.Element => {
    return (
        <BaseNode step="Sharpen" icon={SharpenIcon} />
    );
}

export default SharpenNode;
