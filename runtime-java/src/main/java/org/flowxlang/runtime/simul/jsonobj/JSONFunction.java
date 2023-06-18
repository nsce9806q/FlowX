package org.flowxlang.runtime.simul.jsonobj;

public class JSONFunction {
    private String name;
    private JSONNode[] nodes;
    private JSONEdge[] edges;

    public JSONFunction(String name, JSONNode[] nodes, JSONEdge[] edges) {
        this.name = name;
        this.nodes= nodes;
        this.edges = edges;
    }

    public String getName() {
        return name;
    }

    public JSONNode[] getNodes() {
        return nodes;
    }

    public JSONEdge[] getEdges() {
        return edges;
    }
}