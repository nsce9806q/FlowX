package org.flowxlang.runtime.type.column;

import org.flowxlang.runtime.type.Type;

public class Column<T extends Type> {
    private int row;
    private Object[] values;

    public Column(int row, Object[] values) {
        this.row = row;
        this.values = values;
    }

    public Column(Object[] values) {
        this.row = values.length;
        this.values = values;
    }

    public Column(int row) {

        this.row = row;
        values = new Object[row];
    }

    public int getRow() {
        return row;
    }

    public T getValue(int i) {
        return (T) values[i];
    }

    public void setValue(int i, T v) {
        values[i] = v;
    }
}