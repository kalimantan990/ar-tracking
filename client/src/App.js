import React, { useRef, useEffect } from 'react';
import './App.css';
import Scene from './Scene';

function App() {
  const videoRef = useRef(null);

  useEffect(() => {
    async function getCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
      }
    }
    getCamera();
  }, []);

  return (
    <div className="App">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover', zIndex: -1 }}
      />
      <Scene />
    </div>
  );
}

export default App;
