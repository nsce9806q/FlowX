package org.flowxlang.runtime.simul;

import org.flowxlang.runtime.core.FunDefs;
import org.flowxlang.runtime.type.*;
import org.flowxlang.runtime.type.StringType;
import org.flowxlang.runtime.type.column.Column;
import org.flowxlang.runtime.type.notation.Errorable;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;

public class ProgramExecuter {
    private String[] inputType;
    private String[] outputType;
    private String inputPath;
    private String outputPath;

    public ProgramExecuter setInput(String[] inputType, String inputPath) {
        this.inputPath = inputPath;
        this.inputType = inputType;
        return this;
    }

    public ProgramExecuter setOutput(String[] outputType, String outputPath) {
        this.outputPath = outputPath;
        this.outputType = outputType;
        return this;
    }

    public ProgramExecuter execute() throws Exception {
        Column[] input = new Column[inputType.length];
        Column[] output;
        ArrayList<String> lines = new ArrayList();

        File file = new File(inputPath);
        BufferedReader inFile = new BufferedReader(new FileReader(file));
        String str;
        while( (str = inFile.readLine()) != null )
            lines.add(str);

        for (int i = 0; i < inputType.length; i++) {
            if (inputType[i].compareTo("input!") == 0) {
                input[i] = new Column<IntType>(lines.size());
            }
            else if (inputType[i].compareTo("float!") == 0) {
                input[i] = new Column<FloatType>(lines.size());
            }
            else if (inputType[i].compareTo("string!") == 0) {
                input[i] = new Column<StringType>(lines.size());
            }
            else if (inputType[i].compareTo("bool!") == 0) {
                input[i] = new Column<BoolType>(lines.size());
            }
        }

        for (int i = 0; i < lines.size(); i++) {
            String line = lines.get(i);
            String[] values = line.split(",");
            for (int v = 0; v < inputType.length; v++) {
                if (inputType[v].compareTo("input!") == 0) {
                    if (values.length <= v) {
                        input[v].setValue(i, new Errorable<IntType>());
                    }
                    else {
                        try {
                            input[v].setValue(i, new Errorable<>(new IntType(Integer.parseInt(values[v]))));
                        }
                        catch (Exception e) {
                            input[v].setValue(i, new Errorable<IntType>());
                        }
                    }
                }
                else if (inputType[v].compareTo("float!") == 0) {
                    if (values.length <= v) {
                        input[v].setValue(i, new Errorable<FloatType>());
                    }
                    else {
                        try {
                            input[v].setValue(i, new Errorable<>(new FloatType(Float.parseFloat(values[v]))));
                        }
                        catch (Exception e) {
                            input[v].setValue(i, new Errorable<IntType>());
                        }
                    }
                }
                else if (inputType[v].compareTo("string!") == 0) {
                    if (values.length <= v) {
                        input[v].setValue(i, new Errorable<StringType>());
                    }
                    else {
                        input[v].setValue(i, new Errorable<>(new StringType(values[v])));
                    }
                }
                else if (inputType[v].compareTo("bool!") == 0) {
                    if (values.length <= v) {
                        input[v].setValue(i, new Errorable<BoolType>());
                    }
                    else {
                        try {
                            input[v].setValue(i, new Errorable<>(new BoolType(Boolean.parseBoolean(values[v]))));
                        }
                        catch (Exception e) {
                            input[v].setValue(i, new Errorable<BoolType>());
                        }
                    }
                }
            }
        }

        output = FunDefs.getInstance().find("main").calc(input);

        return this;
    }
}