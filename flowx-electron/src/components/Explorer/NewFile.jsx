const NewFile = ({ setFile }) => {
    const initFile = () => {
        setFile({
                functions: [
                    {
                        name: "main",
                        nodes: [],
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