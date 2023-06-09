package org.flowxlang.runtime.function.defaults.intfunc;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.BoolType;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.column.Column;

public class NEqualInt extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<BoolType> out = new Column<>(row);

        for (int i = 0; i < row; i++) {
            IntType a = ((Column<IntType>[])inputs)[0].getValue(i);
            IntType b = ((Column<IntType>[])inputs)[1].getValue(i);
            out.setValue(i, new BoolType(a.getValue() != b.getValue()));
        }

        return new Column[] {
            out
        };
    }
}