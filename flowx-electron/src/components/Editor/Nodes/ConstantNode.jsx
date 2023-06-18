import { Position } from 'reactflow';
import { NodeWrapper, IOWrapper, IOHandle } from './FunctionNode';
import { setSelectedFunction } from '../../../utils/file';
import styled from 'styled-components';

const InputBox = styled.input`
    min-width: 50px;
    border: 1px solid #888;
    outline: none;
    background-color: transparent;
    text-align: center;
    font-size: 1rem;
    color: #888;
    font-weight: bold;
    margin: auto;
`

const isVaildValue = (type, value) => {
  switch (type) {
    case "int":
      return Number.isInteger(Number(value));
    case "float":
      return !Number.isNaN(Number(value));
    default:
      return true;
  }
}

function ConstantNode({ id, data }) {
    return (
        <NodeWrapper id={id} selectedFunction={data.selectedFunction} file={data.file} setFile={data.setFile} pa>
            <div>
                {data.name}
            </div>
            <InputBox type="text" value={data.value} size={(data.value+"").length+1} onChange={(e) => {
              e.target.size = e.target.value.length + 1;
              setSelectedFunction(
                data.setFile,
                data.selectedFunction,
                func => {
                  const newSelected = {...func};
                  newSelected.nodes.find((item) => item.id === id).data.value = e.target.value;
                  return newSelected;
                }
              )
            }}
              onBlur={(e) => {
                setSelectedFunction(
                  data.setFile,
                  data.selectedFunction,
                  func => {
                    const newSelected = {...func};
                    newSelected.nodes.find((item) => item.id === id).data.value = "";
                    if(isVaildValue(data.name, e.target.value))
                      newSelected.nodes.find((item) => item.id === id).data.value = data.name === "int" || data.name === "float" ? Number(e.target.value) : e.target.value;
                    e.target.size = (newSelected.nodes.find((item) => item.id === id).data.value+"").length + 1;
                    return newSelected;
                  }
                )
              }}
            />
            <IOWrapper>
                <IOHandle type="source" position={Position.Bottom} isConnectable={true} text={data.output[0]}/>
            </IOWrapper>
        </NodeWrapper>
    );
}

export default ConstantNode;