package org.flowxlang.runtime.simul.jsonobj;

public class JSONEdge {
    private String source;
    private String sourceHandle;
    private String target;
    private String targetHandle;

    public JSONEdge(String source, String sourceHandle, String target, String targetHandle) {
        this.source = source;
        this.sourceHandle = sourceHandle;
        this.target = target;
        this.targetHandle = targetHandle;
    }

    public String getSource() {
        return source;
    }

    public String getSourceHandle() {
        return sourceHandle;
    }

    public String getTarget() {
        return target;
    }

    public String getTargetHandle() {
        return targetHandle;
    }
}