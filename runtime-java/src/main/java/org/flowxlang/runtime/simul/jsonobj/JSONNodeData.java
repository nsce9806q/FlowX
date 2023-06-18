package org.flowxlang.runtime.simul.jsonobj;

public class JSONNodeData {
    private String name;
    private String value;

    public JSONNodeData(String name, String value) {
        this.name = name;
        this.value = value;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }
}
