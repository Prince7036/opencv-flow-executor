import { type JSX } from 'react';
import { Box, Typography } from "@mui/material";
import { Handle, Position } from "@xyflow/react";

type BaseNodeProps = {
  step: string,
  icon: string
};

const BaseNode = (props: BaseNodeProps): JSX.Element => {
  return (
    <>
      <Handle type="target" position={Position.Left} />
      <Box draggable={true} sx={{ background: 'white', width: '6rem', borderRadius: 2, border: "1px solid #ccc", padding: '0.3rem', textAlign: 'center' }}>
        <img src={props.icon} alt="image" style={{ width: '4rem', height: '4rem' }} />
        <Typography>{props.step}</Typography>
      </Box>
      <Handle type="source" position={Position.Right} />
    </>
  );
};

export default BaseNode;