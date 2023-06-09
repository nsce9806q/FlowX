package org.flowxlang.runtime.function.defaults.select;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.column.Column;

public class SelectBool extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = inputs[0].getRow();
        Column<BoolType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            BoolType s = ((Column<BoolType>[])inputs)[0].getValue(i);
            BoolType a = ((Column<BoolType>[])inputs)[1].getValue(i);
            BoolType b = ((Column<BoolType>[])inputs)[2].getValue(i);
            out.setValue(i, new BoolType(s.getValue() ? a.getValue() : b.getValue()));
        }

        return new Column[] {
            out
        };
    }
}