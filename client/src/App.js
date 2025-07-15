import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import Scene from './Scene';
import KalmanFilter from './kalman';

function App() {
  const videoRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });

  const kfRotation = {
    x: new KalmanFilter({ R: 0.01, Q: 3 }),
    y: new KalmanFilter({ R: 0.01, Q: 3 }),
    z: new KalmanFilter({ R: 0.01, Q: 3 }),
  };

  const kfPosition = {
    x: new KalmanFilter({ R: 0.01, Q: 3 }),
    y: new KalmanFilter({ R: 0.01, Q: 3 }),
    z: new KalmanFilter({ R: 0.01, Q: 3 }),
  };

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

    function handleOrientation(event) {
      const { alpha, beta, gamma } = event;
      setRotation({
        x: kfRotation.x.filter(beta || 0),
        y: kfRotation.y.filter(gamma || 0),
        z: kfRotation.z.filter(alpha || 0),
      });
    }

    function handleMotion(event) {
      const { x, y, z } = event.accelerationIncludingGravity;
      setPosition({
        x: kfPosition.x.filter(x || 0),
        y: kfPosition.y.filter(y || 0),
        z: kfPosition.z.filter(z || 0),
      });
    }

    getCamera();
    window.addEventListener('deviceorientation', handleOrientation);
    window.addEventListener('devicemotion', handleMotion);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('devicemotion', handleMotion);
    };
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
      <Scene rotation={rotation} position={position} />
    </div>
  );
}

export default App;
