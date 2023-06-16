const NewFile = ({ setFile }) => {
    const initFile = () => {
        setFile({
                functions: [
                    {
                        name: "main",
                        nodes: [
                            {
                                "id": "input",
                                "type": "split",
                                "position": {
                                    "x": 150,
                                    "y": 80
                                },
                                "data": {
                                    "name": "split_csv",
                                    "input": [
                                        "csv"
                                    ],
                                    "output": [
                                    ]
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
                                    "name": "assemble_csv",
                                    "input": [
                                        "int",
                                        "float"
                                    ],
                                    "output": [
                                        "csv"
                                    ]
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
                    }
                ],
                types: []
            });
    }
    return (
        <div className="flex w-full flex-col justify-center">
            <div className="flex w-full items-center justify-center px-4">
                <button
                    className="font-semibold text-gray-500 dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                    onClick={initFile}
                >
                    New File
                </button>
            </div>
        </div>
    );
}

export { NewFile };