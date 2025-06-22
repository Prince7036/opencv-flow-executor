from opencv_backend.model import Workflow, ProcessFlow, ProcessStep


def convert_to_ocr_flow(workflow: Workflow) -> ProcessFlow:
    nodes = {}
    for node in workflow.nodes:
        nodes[node.id] = node

    ocr_flow = ProcessFlow(steps=[])
    for edge in workflow.edges:
        target = nodes[edge.target]
        ocr_flow.steps.append(ProcessStep(step=target.type, params=target.data))

    return ocr_flow
