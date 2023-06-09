package org.flowxlang.runtime.function.custom;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.column.Column;

public class RuntimeNode {
    private Function function = null;
    private Object data = null;
    private Column[] value = null;
    private int inDegree = 0;
    private int inputCnt = 0;
    private String key;

    public Column[] calc(Column[] inputs) {
        return value = function.calc(inputs);
    }

    public RuntimeNode(AnnotatedFunction function, String key) {
        this.function = function.getFunction();
        this.data = function.getData();
        this.key = key;
    }

    public RuntimeNode(Column value, String key) {
        this.value = new Column[] { value };
        this.key = key;
    }

    public int getInDegree() {
        return inDegree;
    }

    public void setInDegree(int inDegree) {
        this.inDegree = inDegree;
    }

    public Column[] getValue() {
        return value;
    }

    public int getInputCnt() {
        return inputCnt;
    }

    public void setInputCnt(int inputCnt) {
        this.inputCnt = inputCnt;
    }

    public String getKey() {
        return key;
    }
}
