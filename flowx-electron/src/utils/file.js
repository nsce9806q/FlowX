export const setSelectedFunction = (setFile, selectedFunctionName, fn) => {
    setFile((prevFile) => ({
        ...prevFile,
        functions: prevFile.functions.map((func) => {
            if (func.name === selectedFunctionName) {
                func = fn(func);
            }
            return func;
        })
    }));
}

export const newFile = () => ({
    functions: [
        newFunction("main",true)
    ]
});

export const newFunction = (name,isMain) => ({
    name,
    nodes: [
        {
            "id": "input",
            "type": "split",
            "position": {
                "x": 150,
                "y": 80
            },
            "data": {
                "name": isMain?"split_csv":"input",
                "output": []
            },
            "width": 231,
            "height": 58,
            "selected": false,
            "dragging": false
        },
        {
            "id": "output",
            "type": "assemble",
            "position": {
                "x": 150,
                "y": 200
            },
            "data": {
                "name": isMain?"assemble_csv":"output",
                "input": []
            },
            "width": 124,
            "height": 34,
            "selected": false,
            "positionAbsolute": {
                "x": 280,
                "y": 689
            },
            "dragging": false
        }
    ],
    edges: []
});