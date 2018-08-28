

export interface Flow<T, S> {
    nodes: {[id: string]: FlowNode<T>};
    edges: FlowEdge<S>[];
}

export interface FlowNode<T> {
    id: string;
    col: number;
    data: T;
}

export interface FlowEdge<S> {
    id: string;
    start: string;
    end: string;
    data: S;
}

export type NodeLayoutData<T> = {[id: string]: T};