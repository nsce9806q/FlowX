function RightPanel({selected}) {
    if(!selected) return (<div>왼쪽에서 편집할 함수나 타입을 선택해주세요</div>);
    const name = Object.keys(selected)[0];
    const value = selected[name];
    return (
        <div>
            {selected && <h1>{name}</h1>}
            {selected && <span>{JSON.stringify(value)}</span>}
        </div>
    )
};

export default RightPanel;