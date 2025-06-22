import React, { useCallback, useRef, useState, type JSX } from "react";
import { Box, Button, Dialog, Fab } from "@mui/material";
import {
  addEdge,
  useReactFlow,
  Background,
  BackgroundVariant,
  Controls,
  Panel,
  ReactFlow,
  useEdgesState,
  useNodesState,
  getNodesBounds,
  getViewportForBounds,
  type Connection,
  type Edge,
  type Node,
  type ReactFlowInstance,
  type XYPosition,
  type ReactFlowJsonObject
} from "@xyflow/react";
import { NODE_TYPES, INITIAL_NODES, INITIAL_EDGES } from "./constant/Constant";
import { toPng } from 'html-to-image';
import SaveIcon from '@mui/icons-material/Save';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import CloseIcon from '@mui/icons-material/Close';
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import '@xyflow/react/dist/style.css'

const Editor = (): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [processedImage, setProcessedImage] = useState("");
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, setEdges, onEdgesChange] = useEdgesState(INITIAL_EDGES);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance<Node, Edge>>();
  const { getNodes, screenToFlowPosition } = useReactFlow();
  const nodeIdValue = useRef(4);

  const onConnect = useCallback((connection: Connection): void => {
    setEdges((edge) => addEdge(connection, edge));
  }, [setEdges]);

  const onInit = (reactFlowInstance: ReactFlowInstance): void => {
    setReactFlowInstance(reactFlowInstance);
  };

  const getDefaultNodeData = (type: string, nodeId: number): Record<string, any> => {
    const data: Record<string, any> = {
      label: `Node ${nodeId}`
    };

    switch (type) {
      case 'RESIZE':
        data.fx = 2;
        return data;
      case 'DILATE':
      case 'ERODE':
        data.kx = 2;
        data.ky = 2;
        return data;
      case 'BLUR':
        data.ksize = 3;
        return data;
      case 'FILTER':
        data.d = 9;
        data.sigmaColor = 75;
        data.sigmaSpace = 75;
        return data;
      case 'DENOISE':
        data.h = 10;
        data.templateWindowSize = 7;
        data.searchWindowSize = 21;
        return data;
      default:
        return data;
    }
  };

  const save = (): void => {
    const nodesBounds = getNodesBounds(getNodes());
    const viewport = getViewportForBounds(nodesBounds, 1024, 768, 0.5, 2, '1px');

    const element: HTMLElement = document.querySelector('.react-flow__viewport') as HTMLElement;
    if (element === null) {
      window.alert("Not able to download image");
      return;
    }

    toPng(element, {
      backgroundColor: 'white',
      width: 1024,
      height: 768,
      style: {
        width: '1024',
        height: '768',
        transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
      },
    }).then((dataUrl: string) => {
      const link: HTMLAnchorElement = document.createElement('a');
      link.href = dataUrl;
      link.download = "reactFlow.png";
      link.click();
    });
  };

  const saveReactFlowJsonObject = (): void => {
    if (reactFlowInstance) {
      const flow: ReactFlowJsonObject = reactFlowInstance.toObject();
      localStorage.setItem('opencv-workflow', JSON.stringify(flow));
    }
  };

  const onDragOver = (event: React.DragEvent): void => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }

  const onDrop = (event: React.DragEvent): void => {
    event.preventDefault();

    if (reactFlowInstance) {
      const type: string = event.dataTransfer.getData("react-flow");
      const position: XYPosition = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });

      const newNode: Node = {
        id: nodeIdValue.current.toString(),
        type: type,
        position: position,
        data: getDefaultNodeData(type, nodeIdValue.current),
        draggable: true,
        deletable: true
      };
      nodeIdValue.current += 1;

      setNodes((nodes: Node[]) => nodes.concat(newNode));
    }
  }

  const handleOpen = (): void => {
    setOpen(true);
  }

  const handleClose = (): void => {
    setOpen(false);
  }

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      saveReactFlowJsonObject();
      const file: File = event.target.files[0];
      const flow: string | null = localStorage.getItem("opencv-workflow");
      if (file.type.includes("tif")) {
        processImage(file, flow).then((data) => {
          const url: string = URL.createObjectURL(data);
          const link: HTMLAnchorElement = document.createElement('a');
          link.href = url;
          link.download = 'output.tif';
          link.click();
          URL.revokeObjectURL(url);
        }).catch(() => {
          window.alert("An error occurred while processing the image");
        });
        return;
      }

      setImage(URL.createObjectURL(file));
      processImage(file, flow).then((data: Blob) => {
        setProcessedImage(URL.createObjectURL(data));
        handleOpen();
      }).catch(() => {
        window.alert("An error occurred while processing the image");
      });
    }
  }

  const processImage = async (imageData: File, flow: string | null): Promise<Blob> => {
    if (flow === null)
      throw new Error("Flow is null");

    try {
      const formData: FormData = new FormData();
      formData.append('image', imageData);
      formData.append('workflow', flow);
      const response: Response = await fetch('/image/process', {
        method: 'POST',
        body: formData
      });
      return await response.blob();
    }
    catch (error) {
      console.error(error);
      throw error;
    }
  }

  return (
    <React.Fragment>
      <Box sx={{ height: '95vh', width: '100vw', border: '1px solid black', borderRadius: 2 }}>
        <ReactFlow nodes={nodes} edges={edges} nodeTypes={NODE_TYPES} onNodesChange={onNodesChange} onEdgesChange={onEdgesChange} onConnect={onConnect} onInit={onInit} onDragOver={onDragOver} onDrop={onDrop}>
          <Controls />
          <Background variant={BackgroundVariant.Lines} gap={10} />
        </ReactFlow>
        <Panel position="bottom-center" style={{ height: '5vh', width: '10vw', background: 'white', borderRadius: 2, border: "1px solid #ccc", padding: '0.5rem', bottom: '1.5rem' }}>
          <Button sx={{ width: '3vw', marginRight: '0.4rem' }} variant="contained" onClick={save}>
            <SaveIcon />
          </Button>
          <Button component="label" sx={{ width: '3vw' }} variant="contained">
            <input type="file" accept="image/*" onChange={uploadImage} hidden />
            <PlayCircleIcon />
          </Button>
        </Panel>
      </Box>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <Box>
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src={image} />}
            itemTwo={<ReactCompareSliderImage src={processedImage} />}
          />
        </Box>
        <Fab color="secondary" sx={{ position: 'fixed', top: '1rem', right: '1rem' }} onClick={handleClose}>
          <CloseIcon />
        </Fab>
      </Dialog>
    </React.Fragment>
  );
};

export default Editor;