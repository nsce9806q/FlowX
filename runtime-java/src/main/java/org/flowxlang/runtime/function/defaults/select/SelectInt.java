package org.flowxlang.runtime.function.defaults.select;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.column.Column;

public class SelectInt extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<IntType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            BoolType s = ((Column<BoolType>[])inputs)[0].getValue(i);
            IntType a = ((Column<IntType>[])inputs)[1].getValue(i);
            IntType b = ((Column<IntType>[])inputs)[2].getValue(i);
            out.setValue(i, new IntType(s.getValue() ? a.getValue() : b.getValue()));
        }

        return new Column[] {
            out
        };
    }
}