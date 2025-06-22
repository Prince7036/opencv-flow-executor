import { type JSX } from 'react';
import { ReactFlowProvider } from "@xyflow/react";
import Editor from "./Editor";
import SidePanel from "./SidePanel";

const WorkflowEditor = (): JSX.Element => {
  return (
    <ReactFlowProvider>
      <Editor />
      <SidePanel />
    </ReactFlowProvider>
  );
};

export default WorkflowEditor;