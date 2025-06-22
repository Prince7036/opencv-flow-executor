import { type JSX } from "react";
import RotateIcon from "../../../images/rotate.svg";
import BaseNode from "./BaseNode.tsx";

const RotateNode = (): JSX.Element => {
    return (
        <BaseNode step="Rotate" icon={RotateIcon} />
    );
};

export default RotateNode;