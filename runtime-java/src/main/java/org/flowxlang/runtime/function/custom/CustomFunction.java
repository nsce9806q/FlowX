package org.flowxlang.runtime.function.custom;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.Type;
import org.flowxlang.runtime.type.column.Column;

import java.util.*;

public class CustomFunction extends Function {
    private Map<Integer, AnnotatedFunction> nodes;
    private List<Edge> edges;

    public CustomFunction(Map<Integer, AnnotatedFunction> nodes, List<Edge> edges) {
        this.nodes = nodes;
        this.edges = edges;
    }

    public CustomFunction() {
        this.nodes = null;
        this.edges = null;
    }

    public void regist(Map<Integer, AnnotatedFunction> nodes, List<Edge> edges) {
        this.nodes = nodes;
        this.edges = edges;
    }

    @Override
    public Column[] calc(Column[] inputs) {
        return null;
    }
}
