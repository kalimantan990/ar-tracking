import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

function Cube() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, -2]}>
      <meshStandardMaterial color="orange" />
    </Box>
  );
}

export default function Scene() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Cube />
    </Canvas>
  );
}
