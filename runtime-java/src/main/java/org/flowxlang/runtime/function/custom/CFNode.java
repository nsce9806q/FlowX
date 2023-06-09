package org.flowxlang.runtime.function.custom;

public class CFNode {
    private IOIndex[] inputs;
    private String name;

    public IOIndex[] getInputs() {
        return inputs;
    }

    public String getName() {
        return name;
    }

    public CFNode(IOIndex[] inputs, String name) {
        this.inputs = inputs;
        this.name = name;
    }
}
