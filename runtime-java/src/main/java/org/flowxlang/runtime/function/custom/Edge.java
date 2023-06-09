package org.flowxlang.runtime.function.custom;

public class Edge {
    private String inNode;
    private int inIdx;
    private String outNode;
    private int outIdx;

    public Edge(String inNode, int inIdx, String outNode, int outIdx) {
        this.inNode = inNode;
        this.inIdx = inIdx;
        this.outNode = outNode;
        this.outIdx = outIdx;
    }
}
