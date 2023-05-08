function LeftPanel({ file, selected, setSelected }) {
    return (
        <div>
            <h2>functions</h2>
            <ul>
                {Object.keys(file.functions).map(
                    (item, index) => (
                        <li
                            key={index}
                            onClick={(e) => {
                                setSelected({
                                    item: file.functions[item],
                                });
                            }}
                        >
                            {item}
                        </li>
                    )
                )}
            </ul>
            <h2>types</h2>
            <ul>
                {Object.keys(file.types).map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default LeftPanel;
