import { Stage, Layer, Group, Rect, Text, Circle, Line } from 'react-konva';
import { useRef, useState, useEffect } from 'react';

function TextBox({ x, y, width, height, text, fontSize, onMouseEnter, onMouseLeave, onClick, onDragMove}) {
    return (
        <Group
            x={x}
            y={y}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
            onDragMove={onDragMove}
        >
            <Rect
                width={width}
                height={height}
                fill="white"
                stroke="black"
            />
            <Text
                x={0}
                y={0}
                text={text}
                fontSize={fontSize}
                width={width}
                height={height}
                fill="black"
                align="center"
                lineHeight={height/fontSize}
            />
        </Group>
    );
}

function Editor({ selected, setSelected }) {
    const divRef = useRef(null);
    const canvasRef = useRef(null);
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

    const [elementWidth, elementHeight] = [100,30];
    const [gapX, gapY] = [0,50];
    const getElementXY = ([row,cal]) => {
        return [20 + (elementWidth + gapX) * cal, 20 + (elementHeight*3 + gapY) * row];
    }

    const cursorChange = (type) => (e) => {
        canvasRef.current.container().style.cursor = type;
    }

    return (
        <div style={{flexGrow:1}} ref={divRef}>
            <Stage width={dimensions.width} height={dimensions.height} ref={canvasRef}>
                <Layer>
                    <Text
                            x={10}
                            y={10}
                            text={funcName}
                            fontSize={30}
                            fill="black"
                            align="center"
                    />
                    {
                        Object.keys(selected.nodes).map((id) => {
                            const { coordination, name, output, input } = selected.nodes[id];
                            const [x,y] = getElementXY(coordination);
                            const maxLength = Math.max(input?.length || 0, output?.length || 1);
                            const width = elementWidth * maxLength;
                            return (
                                <Group
                                    key={id}
                                    x={x}
                                    y={y}
                                    onDragEnd={(e) => {
                                        setSelected({
                                            ...selected,
                                            nodes: {
                                                ...selected.nodes,
                                                [id]: {
                                                    ...selected.nodes[id],
                                                    coordination: [
                                                        Math.round((e.target.attrs.y-20)/(elementHeight*3+gapY)),
                                                        Math.round((e.target.attrs.x-20)/(elementWidth+gapX))
                                                    ]
                                                }
                                            }
                                        });
                                        e.target.setAttrs({
                                            x: Math.round((e.target.attrs.x-20)/(elementWidth+gapX))*(elementWidth+gapX)+20,
                                            y: Math.round((e.target.attrs.y-20)/(elementHeight*3+gapY))*(elementHeight*3+gapY)+20
                                        });
                                    }}
                                >
                                    {input?.map((v,i) => 
                                        <TextBox
                                            key={i+1}
                                            x={i * width / input.length}
                                            y={0}
                                            width={width / input.length}
                                            height={elementHeight}
                                            text={Array.isArray(v)?selected.nodes[v[0]].output[v[1]]:v}
                                            fontSize={15}
                                            onMouseEnter={cursorChange('pointer')}
                                            onMouseLeave={cursorChange('default')}
                                            onClick={(e) => {
                                                console.log(e.target.parent);
                                            }}
                                        />
                                    )}
                                    <TextBox 
                                        x={0} 
                                        y={elementHeight} 
                                        width={width} 
                                        height={elementHeight} 
                                        text={name} 
                                        fontSize={20}
                                        onMouseEnter={e=>{
                                            cursorChange('move')(e);
                                            e.target.parent.parent.draggable(true);
                                        }}
                                        onMouseLeave={e=>{
                                            cursorChange('default')(e);
                                            e.target.parent.parent.draggable(false);
                                        }}
                                    />
                                    {output?.map((v,i) =>
                                        <TextBox
                                            key={i}
                                            x={i * width / output.length}
                                            y={elementHeight*2}
                                            width={width / output.length}
                                            height={elementHeight}
                                            text={v}
                                            fontSize={15}
                                        />
                                    )}
                                </Group>
                            );
                        })
                    }
                    {
                        Object.keys(selected.nodes).flatMap(
                            (nodeId,key1) =>{
                                const {input,coordination} = selected.nodes[nodeId];
                                if(!input) return null;
                                return input
                                ?.map((v,key2) => {
                                    if(!Array.isArray(v)) return null;
                                    const [id, index] = v;
                                    const [x1,y1] = getElementXY([coordination[0],coordination[1]+key2]);
                                    const [x2,y2] = getElementXY([selected.nodes[id].coordination[0],selected.nodes[id].coordination[1]+index]);
                                    return <Line
                                        key={`${key1}-${key2}`}
                                        points={[x1+elementWidth/2,y1,x2+elementWidth/2,y2+elementHeight*3]}
                                        stroke="red"
                                        strokeWidth={2}
                                    />
                                }).filter(v=>v!==null)
                            }
                        ).filter(v=>v!==null)
                    }
                </Layer>
            </Stage>
        </div>
    );
}

export default Editor;
