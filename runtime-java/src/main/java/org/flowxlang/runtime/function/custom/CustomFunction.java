package org.flowxlang.runtime.function.custom;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.type.Type;
import org.flowxlang.runtime.type.column.Column;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class CustomFunction extends Function {
    private Map<Integer, Integer> ins;
    private Map<Integer, IOIndex> outs;
    private Map<Integer, CFNode> nodes;
    private Type[] constants;

    public CustomFunction(Map<Integer, Integer> ins, Map<Integer, CFNode> nodes, Map<Integer, IOIndex> outs) {
        this.ins = ins;
        this.outs = outs;
        this.nodes = nodes;
        constants = null;
    }

    public CustomFunction(Map<Integer, Integer> ins, Map<Integer, CFNode> nodes, Map<Integer, IOIndex> outs, Type[] constants) {
        this.ins = ins;
        this.outs = outs;
        this.nodes = nodes;
        this.constants = constants;
    }

    private class Node {
        private int id;
        private int inDegree = 0;
        private Column[] values;
        private CFNode cfNode;
        private ArrayList<Node> outs = new ArrayList<>();
    }

    @Override
    public Column[] calc(Column[] inputs) {
        HashMap<Integer, Node> compute = new HashMap<>();
        Stack<Integer> stack = new Stack<>();

        int maxLen = 1;
        for (Column input : inputs) {
            if (maxLen < input.getRow())
                maxLen = input.getRow();
        }

        for (Map.Entry<Integer, CFNode> entry : nodes.entrySet()) {
            int nodeId = entry.getKey();
            CFNode node = entry.getValue();
            Node nodeObj = new Node();
            nodeObj.cfNode = node;
            nodeObj.id = nodeId;

            for (IOIndex ii : node.getInputs()) {
                if (nodes.containsKey(ii.getId()))
                    nodeObj.inDegree++;

            }
            compute.put(nodeId, nodeObj);

            if (nodeObj.inDegree == 0)
                stack.push(nodeId);
        }

        for (Map.Entry<Integer, CFNode> entry : nodes.entrySet()) {
            int nodeId = entry.getKey();
            CFNode node = entry.getValue();

            for (IOIndex ii : node.getInputs()) {
                if (nodes.containsKey(ii.getId()))
                    compute.get(ii.getId()).outs.add(compute.get(nodeId));
            }
        }

        for (Map.Entry<Integer, Integer> entry : ins.entrySet()) {
            int nodeId = entry.getKey();
            int index = entry.getValue();
            Node nodeObj = new Node();

            if (index >= 0) {
                nodeObj.values = new Column[] {
                        new Column(maxLen)
                };
                for (int i = 0; i < maxLen; i++)
                    nodeObj.values[0].setValue(i, inputs[index].getValue(i));
            }
            else {
                index = -index - 1;
                nodeObj.values = new Column[] {
                        new Column(maxLen)
                };
                for (int i = 0; i < maxLen; i++)
                    nodeObj.values[0].setValue(i, constants[index]);
            }

            compute.put(nodeId, nodeObj);
        }

        while (!stack.empty()) {
            int top = stack.pop();
            Node node = compute.get(top);
            Column[] input = new Column[node.cfNode.getInputs().length];

            int i = 0;
            for (IOIndex ii : node.cfNode.getInputs()) {
                Column col = compute.get(ii.getId()).values[ii.getIndex()];
                input[i] = new Column(maxLen);
                for (int j = 0; j < maxLen; j++)
                    input[i].setValue(j, col.getValue(j));
                i++;

            }

            Column[] out = call(node.cfNode.getName(), input);
            node.values = out;

            for (Node node0 : node.outs) {
                if (node0.inDegree == 1) {
                    stack.push(node0.id);
                }
                node0.inDegree--;
            }
        }

        Column[] result = new Column[outs.size()];
        for (Map.Entry<Integer, IOIndex> entry : outs.entrySet()) {
            int i = entry.getKey();
            IOIndex index = entry.getValue();
            Node node = compute.get(index.getId());
            result[i] = new Column(maxLen);
            for (int j = 0; j < maxLen; j++)
                result[i].setValue(j, node.values[index.getIndex()].getValue(j));
        }

        return result;
    }
}
