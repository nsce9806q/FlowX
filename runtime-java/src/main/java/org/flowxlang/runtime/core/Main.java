package org.flowxlang.runtime.core;

import org.flowxlang.runtime.function.Function;
import org.flowxlang.runtime.function.custom.AnnotatedFunction;
import org.flowxlang.runtime.function.custom.CustomFunction;
import org.flowxlang.runtime.function.custom.Edge;
import org.flowxlang.runtime.simul.ProgramExecuter;
import org.flowxlang.runtime.simul.ProgramGenerator;
import org.flowxlang.runtime.simul.ProgramLoader;
import org.flowxlang.runtime.simul.jsonobj.JSONProgram;
import org.flowxlang.runtime.type.*;
import org.flowxlang.runtime.type.column.Column;

import java.util.AbstractMap;
import java.util.List;
import java.util.Map;

public class Main {
    public static void main(String[] args){
        try {
            if (args.length != 3) {
                System.out.println("args.length isn't 3");
                return;
            }

            // load
            ProgramLoader loader = new ProgramLoader();
            loader.load(args[0]);
            JSONProgram jsonProgram = loader.parse();

            // generate
            ProgramGenerator programGenerator = new ProgramGenerator(jsonProgram);
            String[][] ioType = programGenerator.generate();

            // execute
            ProgramExecuter executer = new ProgramExecuter()
                    .setInput(ioType[0], args[1])
                    .setOutput(ioType[1], args[2])
                    .execute();
        }
        catch (Exception e) {
            e.printStackTrace();
            System.err.println(e.getMessage());
        }
    }
}