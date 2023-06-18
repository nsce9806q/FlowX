package org.flowxlang.runtime.simul.jsonobj;

public class JSONNodeData {
    private String name;
    private String value;
    private String[] input;
    private String[] output;

    public JSONNodeData(String name, String value, String[] input, String[] output) {
        this.name = name;
        this.value = value;
        this.input = input;
        this.output = output;
    }

    public String getName() {
        return name;
    }

    public String getValue() {
        return value;
    }

    public String[] getOutput() {
        return output;
    }

    public String[] getInput() {
        return input;
    }
}
