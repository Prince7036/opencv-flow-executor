import React, { useState, type JSX } from "react";
import BaseNode from "./BaseNode.tsx";
import FilterIcon from "../../../images/filter.svg";
import { NodeToolbar, useReactFlow, type NodeProps } from "@xyflow/react";
import { Box } from "@mui/material";

const FilterNode = (props: NodeProps): JSX.Element => {
    const { updateNodeData } = useReactFlow();
    const [d, setD] = useState(9);
    const [sigmaColor, setSigmaColor] = useState(75);
    const [sigmaSpace, setSigmaSpace] = useState(75);

    const updateD = (event: React.ChangeEvent): void => {
        const value: number = parseInt((event.target as HTMLInputElement).value);

        if (isNaN(value))
            return;

        setD(value);
        updateNodeData(props.id, { d: value });
    };

    const updateSigmaColor = (event: React.ChangeEvent): void => {
        const value: number = parseInt((event.target as HTMLInputElement).value);

        if (isNaN(value))
            return;

        setSigmaColor(value);
        updateNodeData(props.id, { sigmaColor: value });
    };

    const updateSigmaSpace = (event: React.ChangeEvent): void => {
        const value: number = parseInt((event.target as HTMLInputElement).value);

        if (isNaN(value))
            return;

        setSigmaSpace(value);
        updateNodeData(props.id, { sigmaSpace: value });
    };

    return (
        <>
            <NodeToolbar>
                <Box sx={{paddingBottom: '5px'}}>
                    <label>d: </label>
                    <input placeholder="d" type="number" min={0} value={d} onChange={updateD} />
                </Box>
                <Box sx={{paddingBottom: '5px'}}>
                    <label>sigmaColor: </label>
                    <input placeholder="sigmaColor" type="number" min={0} value={sigmaColor} onChange={updateSigmaColor} />
                </Box>
                <Box sx={{paddingBottom: '5px'}}>
                    <label>sigmaSpace: </label>
                    <input placeholder="sigmaSpace" type="number" min={0} value={sigmaSpace} onChange={updateSigmaSpace} />
                </Box>
            </NodeToolbar>
            <BaseNode step="Filter" icon={FilterIcon} />
        </>
    );
}

export default FilterNode;
