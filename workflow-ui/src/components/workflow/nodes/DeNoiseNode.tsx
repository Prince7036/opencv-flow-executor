import React, { useState, type JSX } from "react";
import BaseNode from "./BaseNode.tsx";
import DeNoiseIcon from "../../../images/denoise.svg";
import { NodeToolbar, useReactFlow, type NodeProps } from "@xyflow/react";
import { Box } from "@mui/material";

const DeNoiseNode = (props: NodeProps): JSX.Element => {
    const { updateNodeData } = useReactFlow();
    const [h, setH] = useState(10);
    const [templateWindowSize, setTemplateWindowSize] = useState(7);
    const [searchWindowSize, setSearchWindowSize] = useState(21);

    const updateH = (event: React.ChangeEvent): void => {
        const value = parseInt((event.target as HTMLInputElement).value);

        if (isNaN(value))
            return;

        setH(value);
        updateNodeData(props.id, { h: value });
    };

    const updateTemplateWindowSize = (event: React.ChangeEvent): void => {
        const value: number = parseInt((event.target as HTMLInputElement).value);

        if (isNaN(value))
            return;

        setTemplateWindowSize(value);
        updateNodeData(props.id, { templateWindowSize: value });
    };

    const updateSearchWindowSize = (event: React.ChangeEvent): void => {
        const value: number = parseInt((event.target as HTMLInputElement).value);

        if (isNaN(value))
            return;

        setSearchWindowSize(value);
        updateNodeData(props.id, { searchWindowSize: value });
    };

    return (
        <>
            <NodeToolbar>
                <Box sx={{paddingBottom: '5px'}}>
                    <label>h: </label>
                    <input placeholder="h" type="number" min={0} value={h} onChange={updateH} />
                </Box>
                <Box sx={{paddingBottom: '5px'}}>
                    <label>templateWindowSize: </label>
                    <input placeholder="templateWindowSize" type="number" min={0} value={templateWindowSize} onChange={updateTemplateWindowSize} />
                </Box>
                <Box sx={{paddingBottom: '5px'}}>
                    <label>searchWindowSize: </label>
                    <input placeholder="searchWindowSize" type="number" min={0} value={searchWindowSize} onChange={updateSearchWindowSize} />
                </Box>
            </NodeToolbar>
            <BaseNode step="DeNoise" icon={DeNoiseIcon} />
        </>
    );
}

export default DeNoiseNode;
