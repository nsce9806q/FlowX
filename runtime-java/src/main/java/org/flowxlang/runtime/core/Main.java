package org.flowxlang.runtime.core;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.function.custom.AnnotatedFunction;
import org.flowxlang.runtime.function.custom.CustomFunction;
import org.flowxlang.runtime.function.custom.Edge;
import org.flowxlang.runtime.simul.ProgramLoader;
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
                        new AbstractMap.SimpleEntry<>(1, new AnnotatedFunction("AddInt")),
                        new AbstractMap.SimpleEntry<>(2, new AnnotatedFunction("SubInt")),
                        new AbstractMap.SimpleEntry<>(3, new AnnotatedFunction("MultInt")),
                        new AbstractMap.SimpleEntry<>(4, new AnnotatedFunction("ConstInt", 5))
                ),
                List.of(new Edge("i", 0, "v0", 0),
                        new Edge("i", 1, "v0", 1),
                        new Edge("i", 1, "v1", 0),
                        new Edge("v4", 0, "v1", 1),
                        new Edge("v4", 0, "v2", 1),
                        new Edge("v1", 0, "v2", 0),
                        new Edge("v0", 0, "v3", 0),
                        new Edge("v2", 0, "v3", 1),
                        new Edge("v3", 0, "o", 0),
                        new Edge("v2", 0, "o", 1))
        );

        ProgramLoader loader = new ProgramLoader();
        loader.load("./testfile/program.json");
        loader.parse();

//        Column<IntType>[] output = FunDefs.getInstance().find("Main").calc(new Column[] {
//                new Column<IntType>(new IntType[] {
//                        new IntType(0),
//                        new IntType(1),
//                        new IntType(2),
//                        new IntType(3),
//                        new IntType(4),
//                        new IntType(5)
//                }),
//                new Column<IntType>(new IntType[] {
//                        new IntType(5),
//                        new IntType(4),
//                        new IntType(3),
//                        new IntType(2),
//                        new IntType(1),
//                        new IntType(0)
//            })
//        });
//
//        for (int i = 0; i < 2; i++) {
//            for (int j = 0; j < output[i].getRow(); j++) {
//                System.out.printf("%d ", output[i].getValue(j).getValue());
//            }
//            System.out.println();
//        }
    }
}