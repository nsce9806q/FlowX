const ClearButton = ({ setFile, setSelected }) => {
    const resetFile = () => {
        setFile(null);
        setSelected(null);
    };
    return (
        <div
            id="bottom-banner"
            tabIndex="-1"
            className="sticky bottom-0 left-0 z-50 flex w-full justify-between border-t border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700"
        >
            <div className="mx-auto flex items-center">
                <p className="flex items-center text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span className="mr-3 inline-flex rounded-full bg-gray-200 p-1 dark:bg-gray-600">
                        <svg
                            className="h-4 w-4 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                            />
                        </svg>
                        <span className="sr-only">
                            Discount coupon
                        </span>
                    </span>
                    <span>
                        To reset file{" "}
                        <span onClick={() => resetFile()}>
                            <span className="ml-0 flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 md:ml-1 md:inline-flex">
                                Click here{" "}
                                <svg
                                    aria-hidden="true"
                                    className="ml-1 h-4 w-4 text-blue-600 dark:text-blue-500"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                </svg>
                            </span>
                        </span>
                    </span>
                </p>
            </div>
        </div>
    );
};

export { ClearButton as ClearComp };
