package org.flowxlang.runtime.core;

import org.flowxlang.runtime.function.custom.AnnotatedFunction;
import org.flowxlang.runtime.function.custom.CustomFunction;
import org.flowxlang.runtime.function.custom.Edge;
import org.flowxlang.runtime.type.*;
import org.flowxlang.runtime.type.column.Column;

import java.util.AbstractMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args){
        FunDefs.getInstance().regist("Main");
        FunDefs.getInstance().registCustom("Main",
                Map.ofEntries(
                        new AbstractMap.SimpleEntry<>(0, new AnnotatedFunction("AddInt")),
                        new AbstractMap.SimpleEntry<>(1, new AnnotatedFunction("ConstInt", 10))
                ),
                List.of(new Edge("i0", 0, "v0", 1),
                        new Edge("v1", 0, "v0", 0),
                        new Edge("v0", 0, "o", 0))
        );

        Column<IntType>[] output = FunDefs.getInstance().find("Main").calc(new Column[] {
                new Column<IntType>(new IntType[] {
                        new IntType(0),
                        new IntType(1),
                        new IntType(2),
                        new IntType(3),
                        new IntType(4),
                        new IntType(5)
                })
        });

        for (int i = 0; i < 1; i++) {
            for (int j = 0; j < output[i].getRow(); j++) {
                System.out.printf("%d\n", output[i].getValue(j).getValue());
            }
            System.out.println();
        }
    }
}