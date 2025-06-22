import { type JSX } from "react";
import ThresholdIcon from "../../../images/threshold.svg";
import BaseNode from "./BaseNode.tsx";

const ThresholdNode = (): JSX.Element => {
    return (
        <BaseNode step="Threshold" icon={ThresholdIcon} />
    );
};

export default ThresholdNode;