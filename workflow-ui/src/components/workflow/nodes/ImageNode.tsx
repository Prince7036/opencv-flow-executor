import { type JSX } from "react";
import { Box, Typography } from "@mui/material";
import ImageIcon from "../../../images/image.svg";
import { Handle, Position } from "@xyflow/react";

type ImageNodeProps = {
    data: {
        input: boolean;
        output: boolean;
        label: string;
    };
};

const ImageNode = ({ data }: ImageNodeProps): JSX.Element => {
  return (
    <>
      {data.output && <Handle type="target" position={Position.Left} />}
      <Box sx={{ background: 'white', width: '6rem', borderRadius: 2, border: "1px solid #ccc", padding: '0.3rem', textAlign: 'center' }}>
        <img src={ImageIcon} alt="image" style={{ width: '4rem', height: '4rem' }} />
        <Typography>{data.label}</Typography>
      </Box>
    {data.input && <Handle type="source" position={Position.Right} />}
    </>
  );
};

export default ImageNode;