package org.flowxlang.runtime.core;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.function.custom.AnnotatedFunction;
import org.flowxlang.runtime.function.custom.CustomFunction;
import org.flowxlang.runtime.function.custom.Edge;
import org.flowxlang.runtime.function.defaults.*;
import org.flowxlang.runtime.function.defaults.conversion.*;
import org.flowxlang.runtime.function.defaults.intfunc.*;
import org.flowxlang.runtime.function.defaults.floatfunc.*;
import org.flowxlang.runtime.function.defaults.select.*;
import org.flowxlang.runtime.function.defaults.stringfunc.*;
import org.flowxlang.runtime.function.defaults.boolfunc.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FunDefs {
    private static FunDefs instance = null;

    public static FunDefs getInstance() {
        if (instance == null)
            instance = new FunDefs();
        return instance;
    }

    private FunDefs() {
        // bool
        regist("AndBool", new AndBool());
        regist("EqualBool", new EqualBool());
        regist("NEqualBool", new NEqualBool());
        regist("NotBool", new NotBool());
        regist("OrBool", new OrBool());

        // float
        regist("AddFloat", new AddFloat());
        regist("DivFloat", new DivFloat());
        regist("EqualFloat", new EqualFloat());
        regist("GreaterEqFloat", new GreaterEqFloat());
        regist("GreaterFloat", new GreaterFloat());
        regist("LessEqFloat", new LessEqFloat());
        regist("LessFloat", new LessFloat());
        regist("MultFloat", new MultFloat());
        regist("NegateFloat", new NegateFloat());
        regist("NEqualFloat", new NEqualFloat());
        regist("SubFloat", new SubFloat());

        // int
        regist("AddInt", new AddInt());
        regist("DivInt", new DivInt());
        regist("EqualInt", new EqualInt());
        regist("GreaterEqInt", new GreaterEqInt());
        regist("GreaterInt", new GreaterInt());
        regist("LessEqInt", new LessEqInt());
        regist("LessInt", new LessInt());
        regist("ModInt", new ModInt());
        regist("MultInt", new MultInt());
        regist("NegateInt", new NegateInt());
        regist("NEqualInt", new NEqualInt());
        regist("SubInt", new SubInt());

        // string
        regist("ConcatString", new ConcatString());
        regist("EqualString", new EqualString());
        regist("NEqualString", new NEqualString());

        // select
        regist("SelectBool", new SelectBool());
        regist("SelectInt", new SelectInt());
        regist("SelectFloat", new SelectFloat());
        regist("SelectString", new SelectString());

        // conversion
        regist("FloatToInt", new FloatToInt());
        regist("FloatToString", new FloatToString());
        regist("IntToFloat", new IntToFloat());
        regist("IntToString", new IntToString());
        regist("StringToFloat", new StringToFloat());
        regist("StringToInt", new StringToInt());

        // etc
        regist("Call", new Call());
        regist("ConstInt", new ConstInt());
        regist("ConstFloat", new ConstFloat());
        regist("ConstString", new ConstString());
        regist("ConstBool", new ConstBool());
    }

    private HashMap<String, Function> functions = new HashMap<>();

    public void regist(String name, Function function) {
        functions.put(name, function);
    }

    public void registCustom(String name, Map<Integer, AnnotatedFunction> nodes, List<Edge> edges) {
        if (!functions.containsKey(name))
            functions.put(name, new CustomFunction(nodes, edges));
        else {
            if (functions.get(name) instanceof CustomFunction) {
                ((CustomFunction)functions.get(name)).regist(nodes, edges);
            }
        }
    }

    public void regist(String name) {
        if (!functions.containsKey(name))
            functions.put(name, new CustomFunction());
    }

    public Function find(String name) {
        return functions.get(name);
    }

}
