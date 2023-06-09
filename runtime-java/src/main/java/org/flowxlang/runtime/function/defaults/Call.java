package org.flowxlang.runtime.function.defaults;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.FuncType;
import org.flowxlang.runtime.type.column.Column;

public class Call extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        Function func = ((FuncType)inputs[0].getValue(0)).getValue();

        Column[] inputs2 = new Column[inputs.length - 1];
        for (int i = 0; i < inputs2.length; i++)
            inputs2[i] = inputs[i + 1];

        return func.calc(inputs2);
    }
}
