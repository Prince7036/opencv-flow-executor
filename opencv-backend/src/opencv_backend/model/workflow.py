from pydantic import BaseModel


class Node(BaseModel):
    id: str
    type: str
    data: dict

class Edge(BaseModel):
    id: str
    source: str
    target: str

class Workflow(BaseModel):
    nodes: list[Node]
    edges: list[Edge]
