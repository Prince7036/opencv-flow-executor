import React, { useState, type JSX } from "react";
import BaseNode from "./BaseNode.tsx";
import BlurIcon from "../../../images/blur.svg";
import { NodeToolbar, useReactFlow, type NodeProps } from "@xyflow/react";
import { Box } from "@mui/material";

const BlurNode = (props: NodeProps): JSX.Element => {
    const { updateNodeData } = useReactFlow();
    const [ksize, setKsize] = useState(3);

    const updateDate = (event: React.ChangeEvent): void => {
        const value: number = parseInt((event.target as HTMLInputElement).value);

        if (isNaN(value))
            return;

        setKsize(value);
        updateNodeData(props.id, { ksize: value });
    };

    return (
        <>
            <NodeToolbar>
                <Box sx={{paddingBottom: '5px'}}>
                    <label>ksize: </label>
                    <input placeholder="ksize" type="number" min={0} value={ksize} onChange={updateDate} />
                </Box>
            </NodeToolbar>
            <BaseNode step="Blur" icon={BlurIcon} />
        </>
    );
}

export default BlurNode;
