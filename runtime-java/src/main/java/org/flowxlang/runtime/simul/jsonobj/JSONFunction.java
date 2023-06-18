package org.flowxlang.runtime.simul.jsonobj;

public class JSONFunction {
    private String name;
    private JSONNode[] nodes;

    public JSONFunction(String name, JSONNode[] nodes) {
        this.name = name;
        this.nodes= nodes;
    }

    public String getName() {
        return name;
    }

    public JSONNode[] getNodes() {
        return nodes;
    }
}