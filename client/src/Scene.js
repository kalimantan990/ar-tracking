import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

function CameraController({ rotation, position }) {
  const { camera } = useThree();

  useFrame(() => {
    // Rotation
    camera.rotation.set(
      THREE.MathUtils.degToRad(rotation.x),
      THREE.MathUtils.degToRad(rotation.y),
      THREE.MathUtils.degToRad(rotation.z)
    );

    // Position
    camera.position.lerp(new THREE.Vector3(position.x, position.y, camera.position.z), 0.1);
  });

  return null;
}

function Cube() {
  const meshRef = useRef();

  return (
    <Box ref={meshRef} args={[1, 1, 1]} position={[0, 0, -2]}>
      <meshStandardMaterial color="orange" />
    </Box>
  );
}

function SceneContent({ rotation, position }) {
  const { gl, scene } = useThree();
  gl.setClearColor(0x000000, 0);

  return (
    <>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <CameraController rotation={rotation} position={position} />
      <Cube />
    </>
  );
}

export default function Scene({ rotation, position }) {
  return (
    <Canvas gl={{ alpha: true }}>
      <SceneContent rotation={rotation} position={position} />
    </Canvas>
  );
}
