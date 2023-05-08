function GetFileButton({ setFile }) {
    return (
        <input
            type="file"
            onChange={async (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                if (file.type === "application/json") {
                    reader.readAsText(file);
                    reader.onload = () => {
                        setFile({
                            ...JSON.parse(reader.result),
                            file_name: file.name,
                        });
                    };
                } else {
                    alert("json 파일을 선택해주세요.");
                }
            }}
        />
    );
}

export default GetFileButton;
