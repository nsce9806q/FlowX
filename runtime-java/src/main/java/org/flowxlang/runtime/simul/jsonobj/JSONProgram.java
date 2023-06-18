package org.flowxlang.runtime.simul.jsonobj;

public class JSONProgram {
    private JSONFunction[] functions;

    public JSONProgram(JSONFunction[] functions) {
        this.functions = functions;
    }

    public JSONFunction[] getFunctions() {
        return functions;
    }
}