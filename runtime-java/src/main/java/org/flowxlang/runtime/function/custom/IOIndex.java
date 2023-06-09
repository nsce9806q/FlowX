package org.flowxlang.runtime.function.custom;

public class IOIndex {
    private int id;
    private int index;

    public IOIndex(int id, int index) {
        this.id = id;
        this.index = index;
    }

    public int getIndex() {
        return index;
    }

    public int getId() {
        return id;
    }
}
