package org.flowxlang.runtime.function;

import org.flowxlang.runtime.core.FunDefs;
import org.flowxlang.runtime.type.column.Column;

public abstract class Function {
    public Column[] calc(Column[] inputs) {
        return null;
    }

    public Column[] calc(Column[] inputs, Object data) {
        return null;
    }

    protected int getRow(Column[] inputs) {
        int row = 0;
        for (Column col : inputs)
            if (row < col.getRow())
                row = col.getRow();
        return row;
    }
}