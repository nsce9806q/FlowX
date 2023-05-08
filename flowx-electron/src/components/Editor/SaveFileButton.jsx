function SaveFileButton({file}){
    return (
        <button onClick={() => {
            const a = document.createElement("a");
            const newFile = new Blob([JSON.stringify(file)],{type: "application/json"});
            a.href = URL.createObjectURL(newFile);
            a.download = "file.json";
            a.click();
        }}>Save</button>
    )
}

export default SaveFileButton;