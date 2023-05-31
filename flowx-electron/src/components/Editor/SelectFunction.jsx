import styled from 'styled-components';
import defaultFunctions from '../../spec/functions';

const SelectFunctionWrapper = styled.div`
    display: none;
    flex-direction: column;
    align-items: stretch;
    position: absolute;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);
    border-radius: 5px;
    background-color: white;
    > div {
        padding: 4px;
        cursor: pointer;
        position: relative;
        >.functionGroup{
            display: none;
            min-width: 100px;
            flex-direction: column;
            position: absolute;
            left:100%;
            top:0;
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.5);
            border-radius: 5px;
            background-color: white;
            align-items: stretch;
            > div {
                padding: 4px;
                cursor: pointer;
                &:hover {
                    background-color: #eee;
                }
                ~div {
                    border-top: 1px solid #ddd;
                }
            }
        }
        &:hover {
            background-color: #eee;
            >.functionGroup{
                display: flex;
            }
        }
        ~div {
            border-top: 1px solid #ddd;
        }
        >div:not(.functionGroup)::after {
            content: "▶";
            float: right;
            margin-left: 30px;
            font-size: 0.8rem;
            margin-top: 2px;
            color: #888;
        }
    }
`;
//changes[0].position = {x:Math.round(x/50)*50,y:Math.round(y/20)*20};

const SelectFunction = ({ setSelected, contextMenuRef }) => {
    const onClick = (node,type)=>(e) => {
        setSelected((slt) => ({
            ...slt,
            nodes: [
                ...slt.nodes,
                {
                    id: (Number(slt.nodes[slt.nodes.length-1]?.id) + 1 || 0)+"",
                    type: type,
                    position: { x:Math.round((contextMenuRef.current.getBoundingClientRect().x-200)/50)*50, y: Math.round((contextMenuRef.current.getBoundingClientRect().y)/20)*20 },
                    data: { name: node, output: [] },
                },
            ],
        }));
        contextMenuRef.current.style.display = "none";
    }

    const functionsGroupByType = Object.keys(defaultFunctions).reduce((acc, cur) => {
        if(!acc[defaultFunctions[cur].type]) acc[defaultFunctions[cur].type] = [];
        acc[defaultFunctions[cur].type].push(cur);
        return acc;
    }, {});

    return (
        <SelectFunctionWrapper ref={contextMenuRef}>
            {Object.keys(functionsGroupByType).map((key) => (
                <div>
                    <div>{key}</div>
                    <div className="functionGroup">
                        {functionsGroupByType[key].map((node) => (
                            <div onClick={onClick(node,key)}>{node}</div>
                        ))}
                    </div>
                </div>
            ))}
        </SelectFunctionWrapper>
    );
}

export default SelectFunction;