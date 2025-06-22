import React, { type JSX } from "react";
import { Panel } from "@xyflow/react";
import {Box, Grid, Typography} from "@mui/material";
import InvertIcon from '../../images/invert.svg';
import ThresholdIcon from '../../images/threshold.svg';
import RotateIcon from '../../images/rotate.svg';
import ErodeIcon from '../../images/erode.svg';
import DilateIcon from '../../images/dilate.svg';
import ResizeIcon from '../../images/resize.svg';
import BlurIcon from '../../images/blur.svg';
import FilterIcon from '../../images/filter.svg';
import DeNoiseIcon from '../../images/denoise.svg';
import SharpenIcon from '../../images/sharpen.svg';

type NodeItem = {
  type: string,
  step: string,
  icon: string
};

const SidePanel = (): JSX.Element => {
  const nodes: NodeItem[] = [
    {
      type: "INVERT",
      step: "Invert",
      icon: InvertIcon
    },
    {
      type: "THRESHOLD",
      step: "Threshold",
      icon: ThresholdIcon
    },
    {
      type: "ROTATE",
      step: "Rotate",
      icon: RotateIcon
    },
    {
      type: "ERODE",
      step: "Erode",
      icon: ErodeIcon
    },
    {
      type: "DILATE",
      step: "Dilate",
      icon: DilateIcon
    },
    {
      type: "RESIZE",
      step: "Resize",
      icon: ResizeIcon
    },
    {
      type: "BLUR",
      step: "Blur",
      icon: BlurIcon
    },
    {
      type: "FILTER",
      step: "Filter",
      icon: FilterIcon
    },
    {
      type: "DENOISE",
      step: "Denoise",
      icon: DeNoiseIcon
    },
    {
      type: "SHARPEN",
      step: "Sharpen",
      icon: SharpenIcon
    }
  ];

  const onDragStart = (event: React.DragEvent<HTMLDivElement>, type: string): void => {
    event.dataTransfer.setData("react-flow", type);
    event.dataTransfer.effectAllowed = "move";
  }

  return (
    <>
      <Panel position="top-right" style={{ height: '85vh', width: '18vw', background: 'white', borderRadius: 2, border: "1px solid #ccc", padding: '1rem', overflowY: 'scroll' }}>
        <Grid container spacing={2} size={12} >
        {
          nodes.map((element: NodeItem, key: number) => {
            return (
              <Grid size={6} key={key} onDragStart={(event: React.DragEvent<HTMLDivElement>) => onDragStart(event, element.type)} sx={{ cursor: 'grab'}}>
                <Box draggable={true} sx={{ background: 'white', width: '6rem', borderRadius: 2, border: "1px solid #ccc", padding: '0.3rem', textAlign: 'center' }}>
                  <img src={element.icon} alt="image" style={{ width: '4rem', height: '4rem' }} />
                  <Typography>{element.step}</Typography>
                </Box>
              </Grid>
            )
          })
        }
        </Grid>
      </Panel>
    </>
  );
};

export default SidePanel;