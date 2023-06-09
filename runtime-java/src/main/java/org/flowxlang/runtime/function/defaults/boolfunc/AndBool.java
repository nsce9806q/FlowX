package org.flowxlang.runtime.function.defaults.boolfunc;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.column.Column;

public class AndBool extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = inputs[0].getRow();
        Column<BoolType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            BoolType a = ((Column<BoolType>[])inputs)[0].getValue(i);
            BoolType b = ((Column<BoolType>[])inputs)[1].getValue(i);
            out.setValue(i, new BoolType(a.getValue() && b.getValue()));
        }

        return new Column[] {
            out
        };
    }
}