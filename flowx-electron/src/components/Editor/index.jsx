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

    const [elementWidth, elementHeight] = [100,50];
    const getElementXY = ([x,y]) => {
        return [x*elementWidth, y*elementHeight];
    }

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
                <Layer>
                    {
                        Object.keys(selected.nodes).map((id) => {
                            const { coordination, name, output, input } = selected.nodes[id];
                            const [x,y] = getElementXY([coordination[1],coordination[0]]);
                            return (
                                <Group key={id} x={x} y={y}>
                                    <Rect
                                        width={elementWidth}
                                        height={elementHeight}
                                        fill="white"
                                        stroke="black"
                                        strokeWidth={1}
                                        shadowBlur={5}
                                        shadowOpacity={0.2}
                                        shadowOffsetX={5}
                                        shadowOffsetY={5}
                                        shadowColor="black"
                                        cornerRadius={5}
                                    />
                                    <Text
                                        x={0}
                                        y={0}
                                        text={name}
                                        fontSize={20}
                                        fill="black"
                                        align="center"
                                    />
                                    <Circle
                                        x={elementWidth/2}
                                        y={elementHeight}
                                        radius={10}
                                        fill="white"
                                        stroke="black"
                                        strokeWidth={1}
                                        shadowBlur={5}
                                        shadowOpacity={0.2}
                                        shadowOffsetX={5}
                                        shadowOffsetY={5}
                                        shadowColor="black"
                                    />
                                </Group>
                            );
                        })
                    }
                </Layer>
            </Stage>
        </div>
    );
}

export default Editor;
