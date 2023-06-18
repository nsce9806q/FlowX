package org.flowxlang.runtime.simul.jsonobj;

public class JSONNode {
    private String id;
    private String type;
    private JSONNodeData data;

    public JSONNode(String id, String type, JSONNodeData data) {
        this.id = id;
        this.type = type;
        this.data = data;
    }

    public String getId() {
        return id;
    }

    public String getType() {
        return type;
    }

    public JSONNodeData getData() {
        return data;
    }
}