import { Stage, Layer, Group, Rect, Text, Circle, Line } from 'react-konva';
import { useRef, useState, useEffect } from 'react';

function Editor({ selected, setSelected }) {
    const divRef = useRef(null);
    const [dimensions, setDimensions] = useState({
        width: 0,
        height: 0
    });
    
    useEffect(() => {
        setDimensions({
            width: divRef.current.offsetWidth,
            height: divRef.current.offsetHeight
        });
    }, [selected]);
    
    
    if(!selected) return (<div style={{flexGrow:1}} ref={divRef}>왼쪽에서 편집할 함수나 타입을 선택해주세요</div>);
    const { type, funcName, nodes } = selected;

    return (
        <div style={{flexGrow:1}} ref={divRef}>
            <Stage width={dimensions.width} height={dimensions.height}>
                <Layer>
                    <Text
                            x={0}
                            y={0}
                            text={funcName}
                            fontSize={30}
                            fill="black"
                            align="center"
                    />
                </Layer>
            </Stage>
        </div>
    );
}

export default Editor;
