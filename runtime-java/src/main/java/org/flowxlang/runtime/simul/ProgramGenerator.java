package org.flowxlang.runtime.simul;

import org.flowxlang.runtime.core.FunDefs;
import org.flowxlang.runtime.function.custom.AnnotatedFunction;
import org.flowxlang.runtime.function.custom.Edge;
import org.flowxlang.runtime.simul.jsonobj.*;

import java.util.ArrayList;
import java.util.HashMap;

public class ProgramGenerator {
    private JSONProgram jsonProgram;

    public ProgramGenerator(JSONProgram jsonProgram) {
        this.jsonProgram = jsonProgram;
    }

    public boolean generate() {
        try {
            JSONFunction[] functions = jsonProgram.getFunctions();

            // regist functions
            for (JSONFunction function : functions) {
                FunDefs.getInstance().regist(function.getName());
            }

            // generate functions
            for (JSONFunction function : functions) {
                generateFunction((function));
            }
        }
        catch (Exception e) {
            return false;
        }
        return true;
    }

    private void generateFunction(JSONFunction function) throws Exception {
        HashMap<String, String> nodeIDMap = new HashMap<>();
        HashMap<Integer, AnnotatedFunction> nodes = new HashMap<>();
        ArrayList<Edge> edges = new ArrayList<>();

        // node
        for (JSONNode node : function.getNodes()) {
            if (node.getId().compareTo("input") == 0 || node.getId().compareTo("output") == 0) {
                continue;
            }

            int id = nodeIDMap.size();
            JSONNodeData nodeData = node.getData();
            nodeIDMap.put(node.getId(), "v" + id);

            if (node.getType().compareTo("constant") == 0) {
                if (nodeData.getName().compareTo("int") == 0) {
                    nodes.put(id, new AnnotatedFunction("ConstInt", Integer.parseInt(nodeData.getValue())));
                }
                else if (nodeData.getName().compareTo("float") == 0) {
                    nodes.put(id, new AnnotatedFunction("ConstFloat", Float.parseFloat(nodeData.getValue())));
                }
                else if (nodeData.getName().compareTo("string") == 0) {
                    nodes.put(id, new AnnotatedFunction("ConstString", nodeData.getValue()));
                }
                else if (nodeData.getName().compareTo("bool") == 0) {
                    nodes.put(id, new AnnotatedFunction("ConstBool", Boolean.getBoolean(nodeData.getValue())));
                }
            }
            else {
                String fname = FunNameConverter.convertName(nodeData.getName(), nodeData.getInput());
                nodes.put(id, new AnnotatedFunction(fname));
            }
        }
        nodeIDMap.put("input", "i");
        nodeIDMap.put("output", "o");

        // edge
        for (JSONEdge edge : function.getEdges()) {
            int inIndex = 0;
            int outIndex = 0;
            String inNode = nodeIDMap.get(edge.getSource());
            String outNode = nodeIDMap.get(edge.getTarget());

            if (edge.getSourceHandle() != null) {
                inIndex = Integer.parseInt(edge.getSourceHandle().substring(1));
            }
            if (edge.getTargetHandle() != null) {
                outIndex = Integer.parseInt(edge.getTargetHandle().substring(1));
            }

            edges.add(new Edge(inNode, inIndex, outNode, outIndex));
        }

        // regist
        FunDefs.getInstance().registCustom(function.getName(), nodes, edges);
    }
}