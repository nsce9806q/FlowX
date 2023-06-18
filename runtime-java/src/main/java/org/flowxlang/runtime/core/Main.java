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
            // load
            ProgramLoader loader = new ProgramLoader();
            loader.load("./testfile/program.json");
            JSONProgram jsonProgram = loader.parse();

            // generate
            ProgramGenerator programGenerator = new ProgramGenerator(jsonProgram);
            String[][] ioType = programGenerator.generate();

            for (String a : ioType[1])
                System.out.println(a);

            // execute
            ProgramExecuter executer = new ProgramExecuter();
            executer.execute();
        }
        catch (Exception e) {
            System.err.println(e.getMessage());
        }
    }
}