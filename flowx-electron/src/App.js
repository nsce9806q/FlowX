import { useEffect,useState } from 'react';
import GetFileButton from './components/GetFileButton';
import NewFileButton from './components/NewFileButton';
import Editor from './components/Editor';

function App() {
  const [file,setFile] = useState(null);

  return (
    <div className="App">
      <GetFileButton setFile={setFile}/>
      <NewFileButton setFile={setFile}/>
      {!file && <div>파일을 선택해주세요.</div>}
      {file && <Editor file={file} setFile={setFile}/>}
    </div>
  );
}

export default App;
