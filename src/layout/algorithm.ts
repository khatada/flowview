import * as _ from "lodash";
import { Flow, FlowNode, FlowEdge, NodeLayoutData } from "../data";

export function calculateRank<T, S>(flow: Flow<T, S>) : NodeLayoutData<number> {
    const results: NodeLayoutData<number> = Object.create(null);
    const visited: { [id: string]: boolean } = Object.create(null);
    const untraced: string[] = [];

    const nodeIds = Object.keys(flow.nodes);
    nodeIds.forEach(id => results[id] = 0);

    function dfs(id): number {
        if (visited[id]) {
            return results[id];
        } else {
            visited[id] = true;

            const edges = inEdges(flow.edges, id);
            if (edges.length > 0) {
                const prevNodeRanks = edges.map(edge => {
                    const node = flow.nodes[edge.start];
                    return dfs(edge.start) + node.col;
                });
                const rank = _.max(prevNodeRanks);
                results[id] = rank;
                return rank;
            } else {
                untraced.push(id);
                return 0;
            }
        }
    }

    nodeIds.forEach(dfs);

    untraced.forEach(id => {
        const edges = outEdges(flow.edges, id);
        if(edges.length) {
            const node = flow.nodes[id];
            const nextNodeRanks = edges.map(edge => {
                return results[edge.end];
            });
            const rank = _.min(nextNodeRanks);
            results[id] = rank - node.col;
        }
    });

    return results;
}

export function inEdges<S>(edges: FlowEdge<S>[], id: string): FlowEdge<S>[] {
    return edges.filter(edge => edge.end === id);
}

export function outEdges<S>(edges: FlowEdge<S>[], id: string): FlowEdge<S>[] {
    return edges.filter(edge => edge.start === id);
}