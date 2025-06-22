import React, { useState, type JSX } from "react";
import BaseNode from "./BaseNode.tsx";
import ResizeIcon from "../../../images/resize.svg";
import { NodeToolbar, Position, useReactFlow, type NodeProps } from "@xyflow/react";
import { Box } from "@mui/material";

const ResizeNode = (props: NodeProps): JSX.Element => {
    const { updateNodeData } = useReactFlow();
    const [fx, setFx] = useState(2);

    const updateData = (event: React.ChangeEvent): void => {
        const value: number = parseFloat((event.target as HTMLInputElement).value);

        if (isNaN(value))
            return;

        setFx(value);
        updateNodeData(props.id, { fx: value });
    };

    return (
        <>
            <NodeToolbar position={Position.Top}>
                <Box sx={{paddingBottom: '5px'}}>
                    <label>fx / fy: </label>
                    <input placeholder="fx / fy" type="number" min="0" step="0.1" value={fx} onChange={updateData} />
                </Box>
            </NodeToolbar>
            <BaseNode step="Resize" icon={ResizeIcon} />
        </>
    );
}

export default ResizeNode;
