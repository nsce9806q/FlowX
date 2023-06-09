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
        Map<String, RuntimeNode> runtimeNodes = new HashMap<>();
        Stack<RuntimeNode> stack = new Stack<>();
        int outputCnt = 0;

        // append nodes
        for (Map.Entry<Integer, AnnotatedFunction> entry : nodes.entrySet()) {
            runtimeNodes.put("v" + entry.getKey(), new RuntimeNode(entry.getValue(), "v" + entry.getKey()));
        }

        // append inputs
        for (int i = 0; i < inputs.length; i++) {
            runtimeNodes.put("i" + i, new RuntimeNode(inputs[i], "i" + i));
        }

        // calc inDegree of nodes, outputCnt
        for (Edge edge : edges) {
            if (edge.getOutNode().charAt(0) == 'v') {
                RuntimeNode rnode = runtimeNodes.get(edge.getOutNode());
                rnode.setInputCnt(rnode.getInputCnt() + 1);
                if (edge.getInNode().charAt(0) == 'v') {
                    rnode.setInDegree(rnode.getInDegree() + 1);
                }
            }
            if (edge.getOutNode().charAt(0) == 'o') {
                outputCnt++;
            }
        }

        // init stack
        for (Map.Entry<Integer, AnnotatedFunction> entry : nodes.entrySet()) {
            RuntimeNode rnode = runtimeNodes.get("v" + entry.getKey());
            if (rnode.getInDegree() == 0) {
                stack.push(rnode);
            }
        }

        // topological sort
        while (!stack.empty()) {
            RuntimeNode rnode = stack.pop();
            Column[] rnodeInput = new Column[rnode.getInputCnt()];
            for (Edge edge : edges) {
                if (edge.getOutNode().compareTo(rnode.getKey()) == 0) {
                    rnodeInput[edge.getOutIdx()] = runtimeNodes.get(edge.getInNode()).getValue()[edge.getInIdx()];
                }
            }
            rnode.calc(rnodeInput);
        }

        // return result
        Column[] result = new Column[outputCnt];
        for (Edge edge : edges) {
            if (edge.getOutNode().charAt(0) == 'o') {
                result[edge.getOutIdx()] = runtimeNodes.get(edge.getInNode()).getValue()[edge.getInIdx()];
            }
        }

        return result;
    }
}
