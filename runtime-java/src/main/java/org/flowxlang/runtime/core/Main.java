package org.flowxlang.runtime.core;

import org.flowxlang.runtime.function.custom.CFNode;
import org.flowxlang.runtime.function.custom.CustomFunction;
import org.flowxlang.runtime.function.custom.IOIndex;
import org.flowxlang.runtime.type.*;
import org.flowxlang.runtime.type.column.Column;

import java.util.AbstractMap;
import java.util.Map;

public class Main {
    public static void main(String[] args){
        FunDefs.getInstance().regist("Main", new CustomFunction(
                Map.ofEntries(
                        new AbstractMap.SimpleEntry<>(0, 0),
                        new AbstractMap.SimpleEntry<>(1, -1)
                ),
                Map.ofEntries(
                        new AbstractMap.SimpleEntry<>(2, new CFNode(new IOIndex[] {
                                new IOIndex(0, 0),
                        }, "IntToString")),
                        new AbstractMap.SimpleEntry<>(3, new CFNode(new IOIndex[] {
                                new IOIndex(2, 0),
                                new IOIndex(1, 0)
                        }, "ConcatString"))
                ),
                Map.ofEntries(
                        new AbstractMap.SimpleEntry<>(0, new IOIndex(3, 0))
                ),
                new Type[] {
                        new StringType("!")
                }
        ));

        Column<StringType>[] output = FunDefs.getInstance().find("Main").calc(new Column[] {
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
                System.out.printf("%s\n", output[i].getValue(j).getValue());
            }
            System.out.println();
        }
    }
}