package org.flowxlang.runtime.core;

import org.flowxlang.runtime.function.custom.CFNode;
import org.flowxlang.runtime.function.custom.CustomFunction;
import org.flowxlang.runtime.function.custom.Edge;
import org.flowxlang.runtime.function.custom.IOIndex;
import org.flowxlang.runtime.type.*;
import org.flowxlang.runtime.type.column.Column;

import java.util.AbstractMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args){
        if(args.length != 3){
            System.out.println("Usage: java -jar runtime-java.jar <function> <input> <output>");
            return;
        }

        for(int i = 0; i < args.length; i++){
                System.out.println(args[i]);
        }

        FunDefs.getInstance().regist("Main", new CustomFunction(
                Map.ofEntries(
                        new AbstractMap.SimpleEntry<>(0, "AddInt"),
                        new AbstractMap.SimpleEntry<>(1, "SubInt")
                ),
                List.of(new Edge("i0", 0, "v0", 0),
                        new Edge("i1", 0, "v0", 1),
                        new Edge("i0", 0, "v1", 0),
                        new Edge("i1", 0, "v1", 1),
                        new Edge("v0", 0, "o", 0),
                        new Edge("v1", 0, "o", 1))
        ));

        Column<StringType>[] output = FunDefs.getInstance().find("Main").calc(new Column[] {
                new Column<IntType>(new IntType[] {
                        new IntType(0),
                        new IntType(1),
                        new IntType(2),
                        new IntType(3),
                        new IntType(4),
                        new IntType(5)
                }),
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