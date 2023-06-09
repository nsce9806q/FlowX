const DropDownFileComponent = ({ setFile }) => {
    return (
        <div className="flex w-full flex-col justify-center">
            <div className="flex w-full items-center justify-center px-4">
                <label
                    htmlFor="dropzone-file"
                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 "
                >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                        <svg
                            aria-hidden="true"
                            className="mb-3 h-10 w-10 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                            ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                                Click to load
                            </span>{" "}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                            json file / (FlowX Model)
                        </p>
                    </div>
                    <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        onChange={async (e) => {
                            const file = e.target.files[0];
                            console.log(file);
                            const reader = new FileReader();
                            if (file.type === "application/json") {
                                reader.readAsText(file);
                                reader.onload = () => {
                                    setFile({
                                        ...JSON.parse(
                                            reader.result
                                        ),
                                        fileName: file.name,
                                        path: file.path,
                                    });
                                };
                            } else {
                                alert(
                                    "json 파일을 선택해주세요."
                                );
                            }
                        }}
                    />
                </label>
            </div>
        </div>
    );
};

export { DropDownFileComponent as DroDownComp };
