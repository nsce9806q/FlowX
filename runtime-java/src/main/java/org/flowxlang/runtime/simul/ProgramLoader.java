package org.flowxlang.runtime.simul;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import org.flowxlang.runtime.simul.jsonobj.JSONProgram;

import java.io.BufferedReader;
import java.io.FileReader;

public class ProgramLoader {
    private String jsonText = "";

    public void load(String path) {
        try {
            BufferedReader reader = new BufferedReader(
                    new FileReader(path)
            );
            String str;
            while ((str = reader.readLine()) != null) {
                jsonText += str;
            }
            reader.close();
        }
        catch (Exception e) {
            System.err.printf("program json file exception : %s\n", e.getMessage());
        }
    }

    public JSONProgram parse() {
        if (jsonText.compareTo("") != 0) {
            Gson gson = new GsonBuilder().create();
            return gson.fromJson(jsonText, JSONProgram.class);
        }
        return null;
    }
}
