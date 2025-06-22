import type {Edge, Node, NodeTypes} from "@xyflow/react";
import ImageNode from "../nodes/ImageNode";
import GrayScaleNode from "../nodes/GrayScaleNode";
import InvertNode from "../nodes/InvertNode.tsx";
import ThresholdNode from "../nodes/ThresholdNode.tsx";
import RotateNode from "../nodes/RotateNode.tsx";
import ErodeNode from "../nodes/ErodeNode.tsx";
import DilateNode from "../nodes/DilateNode.tsx";
import ResizeNode from "../nodes/ResizeNode.tsx";
import BlurNode from "../nodes/BlurNode.tsx";
import FilterNode from "../nodes/FilterNode.tsx";
import DeNoiseNode from "../nodes/DeNoiseNode.tsx";
import SharpenNode from "../nodes/SharpenNode.tsx";

export const NODE_TYPES: NodeTypes = {
    IMAGE: ImageNode,
    GRAYSCALE: GrayScaleNode,
    INVERT: InvertNode,
    THRESHOLD: ThresholdNode,
    ROTATE: RotateNode,
    RESIZE: ResizeNode,
    DILATE: DilateNode,
    ERODE: ErodeNode,
    BLUR: BlurNode,
    FILTER: FilterNode,
    DENOISE: DeNoiseNode,
    SHARPEN: SharpenNode
};

export const INITIAL_NODES: Node[] = [
    {
        id: '1',
        type: 'IMAGE',
        position: { x: 50, y: 50 },
        data: { label: 'Input Img', input: true },
        draggable: true,
        deletable: false
    },
    {
        id: '2',
        type: 'GRAYSCALE',
        position: { x: 200, y: 50 },
        data: { label: 'GrayScale' },
        draggable: true,
        deletable: false
    },
    {
        id: '3',
        type: 'IMAGE',
        position: { x: 350, y: 50 },
        data: { label: 'Output Img', output: true },
        draggable: true,
        deletable: false
    }
];

export const INITIAL_EDGES: Edge[] = [
    {
        id: '1-2',
        source: '1',
        target: '2',
        deletable: false
    },
    {
        id: '2-3',
        source: '2',
        target: '3',
        deletable: true
    }
];