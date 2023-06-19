package org.flowxlang.runtime.simul;

import java.util.AbstractMap;
import java.util.Map;

public class FunNameConverter {
    private final static Map<String, String> nameConverter = Map.ofEntries(
            new AbstractMap.SimpleEntry<>("add", "Add"),
            new AbstractMap.SimpleEntry<>("sub", "Sub"),
            new AbstractMap.SimpleEntry<>("mult", "Mult"),
            new AbstractMap.SimpleEntry<>("div", "Div"),
            new AbstractMap.SimpleEntry<>("max", "Max"),
            new AbstractMap.SimpleEntry<>("min", "Min"),
            new AbstractMap.SimpleEntry<>("equal", "Equal"),
            new AbstractMap.SimpleEntry<>("notEqual", "NEqual"),
            new AbstractMap.SimpleEntry<>("greaterThan", "Greater"),
            new AbstractMap.SimpleEntry<>("greaterThanOrEqual", "GreaterEq"),
            new AbstractMap.SimpleEntry<>("lessThan", "Less"),
            new AbstractMap.SimpleEntry<>("lessThanOrEqual", "LessEq"),
            new AbstractMap.SimpleEntry<>("and", "And"),
            new AbstractMap.SimpleEntry<>("or", "Or"),
            new AbstractMap.SimpleEntry<>("xor", "Xor"),
            new AbstractMap.SimpleEntry<>("not", "Not"),
            new AbstractMap.SimpleEntry<>("toInt", "ToInt"),
            new AbstractMap.SimpleEntry<>("toString", "ToString"),
            new AbstractMap.SimpleEntry<>("toFloat", "ToFloat"),
            new AbstractMap.SimpleEntry<>("errorToValue", "ErrorTo"),
            new AbstractMap.SimpleEntry<>("errorToNull", "ErrorToNull"),
            new AbstractMap.SimpleEntry<>("nullToValue", "NullTo"),
            new AbstractMap.SimpleEntry<>("panic", "Panic"),
            new AbstractMap.SimpleEntry<>("negate", "Negate"),
            new AbstractMap.SimpleEntry<>("select", "Select"),
            new AbstractMap.SimpleEntry<>("falseToNull", "Null"),
            new AbstractMap.SimpleEntry<>("falseToError", "Error"),
            new AbstractMap.SimpleEntry<>("mod", "ModInt"),
            new AbstractMap.SimpleEntry<>("concat", "ConcatString"),
            new AbstractMap.SimpleEntry<>("length", "LengthString"),
            new AbstractMap.SimpleEntry<>("includes", "IncludesString"),
            new AbstractMap.SimpleEntry<>("regexTest", "RegexTest"),
            new AbstractMap.SimpleEntry<>("pow", "Pow"),
            new AbstractMap.SimpleEntry<>("avg", "Avg"),
            new AbstractMap.SimpleEntry<>("avgNull", "AvgNull"),
            new AbstractMap.SimpleEntry<>("label", "Label")
    );

    private final static Map<String, String> typeConverter = Map.ofEntries(
            new AbstractMap.SimpleEntry<>("int", "Int"),
            new AbstractMap.SimpleEntry<>("float", "Float"),
            new AbstractMap.SimpleEntry<>("string", "String"),
            new AbstractMap.SimpleEntry<>("bool", "Bool"),
            new AbstractMap.SimpleEntry<>("int?", "Int"),
            new AbstractMap.SimpleEntry<>("float?", "Float"),
            new AbstractMap.SimpleEntry<>("string?", "String"),
            new AbstractMap.SimpleEntry<>("bool?", "Bool"),
            new AbstractMap.SimpleEntry<>("int!", "Int"),
            new AbstractMap.SimpleEntry<>("float!", "Float"),
            new AbstractMap.SimpleEntry<>("string!", "String"),
            new AbstractMap.SimpleEntry<>("bool!", "Bool")
    );

    private final static String[] typeA = new String[] {
            "add", "sub", "mult", "div", "max", "min",
            "equal", "notEqual",
            "greaterThan", "greaterThanOrEqual", "lessThan", "lessThanOrEqual",
            "and", "or", "xor", "not",
            "errorToValue", "errorToNull", "nullToValue", "panic", "negate", "pow",
            "avg", "avgNull"
    };

    private final static String[] typeB = new String[] {
            "toInt", "toFloat", "toString"
    };

    private final static String[] typeC = new String[] {
            "select", "falseToNull", "falseToError"
    };

    private final static String[] typeD = new String[] {
            "mod", "concat", "length", "includes", "regexTest", "label"
    };

    public static String convertName(String name, String[] input) throws Exception {
        // typeA : <name><type> with input[0]
        for (String f : typeA) {
            if (name.compareTo(f) == 0) {
                return nameConverter.get(name) + typeConverter.get(input[0]);
            }
        }

        // typeB : <type><name> with input[0]
        for (String f : typeB) {
            if (name.compareTo(f) == 0) {
                return typeConverter.get(input[0]) + nameConverter.get(name);
            }
        }

        // typeC : <name><type> with input[1]
        for (String f : typeC) {
            if (name.compareTo(f) == 0) {
                return nameConverter.get(name) + typeConverter.get(input[1]);
            }
        }

        // typeD : <type>
        for (String f : typeD) {
            if (name.compareTo(f) == 0) {
                return nameConverter.get(name);
            }
        }

        return name;
    }
}