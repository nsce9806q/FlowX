function NewFileButton({setFile}) {
    const newFile = () => {
        setFile({
            "functions": {
                "main":["test"]
            },
            "types": {
            }
        })
    }
    return (
        <button onClick={newFile}>New File</button>
    )
}

export default NewFileButton;