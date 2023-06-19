package org.flowxlang.runtime.function.defaults.stringfunc;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.IntType;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;

import java.util.HashMap;

public class Label extends Function {
    @Override
    public Column[] calc(Column[] inputs) {
        int row = getRow(inputs);
        Column<IntType> out = new Column<>(row);
        HashMap<String, Integer> map = new HashMap<>();

        for (int i = 0; i < row; i++) {
            StringType a = ((Column<StringType>[])inputs)[0].getValue(i);
            if (map.containsKey(a.getValue())) {
                out.setValue(i, new IntType(map.get(a.getValue())));
            }
            else {
                int v = map.size();
                map.put(a.getValue(), v);
                out.setValue(i, new IntType(v));
            }
        }

        return new Column[] {
            out
        };
    }
}