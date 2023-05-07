import { useEffect } from 'react';

function App() {

  useEffect(() => {
  const canvas = document.getElementById('canvas');
  canvas.requestPointerLock();
  canvas.addEventListener('click', (e) => {
    canvas.requestPointerLock();
  });
  },[]);

  return (
    <div className="App">
      test
      <canvas id="canvas" width="500" height="500" style={{border:"solid 1px black"}}></canvas>
    </div>
  );
}

export default App;
