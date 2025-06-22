import React, { useState, type JSX } from "react";
import BaseNode from "./BaseNode.tsx";
import DilateIcon from "../../../images/dilate.svg";
import { NodeToolbar, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { Box } from "@mui/material";

const DilateNode = (props: NodeProps):JSX.Element => {
    const { updateNodeData } = useReactFlow();
    const [kx, setKx] = useState(2);
    const [ky, setKy] = useState(2);

    const updateKernelX = (event: React.ChangeEvent): void => {
        const value: number = parseFloat((event.target as HTMLInputElement).value);

        if (isNaN(value))
            return;

        setKx(value);
        updateNodeData(props.id, { kx: value });
    };

    const updateKernelY = (event: React.ChangeEvent): void => {
        const value: number = parseFloat((event.target as HTMLInputElement).value);

        if (isNaN(value))
            return;

        setKy(value);
        updateNodeData(props.id, { ky: value });
    };

    return (
        <>
            <NodeToolbar position={Position.Top}>
                <Box sx={{paddingBottom: '5px'}}>
                    <label>kernel x: </label>
                    <input placeholder="kernel x" type="number" min="0" value={kx} onChange={updateKernelX}/>
                </Box>
                <Box sx={{paddingBottom: '5px'}}>
                    <label>kernel y: </label>
                    <input placeholder="kernel y" type="number" min="0" value={ky} onChange={updateKernelY}/>
                </Box>
            </NodeToolbar>
            <BaseNode step="Dilate" icon={DilateIcon} />
        </>
    );
}

export default DilateNode;