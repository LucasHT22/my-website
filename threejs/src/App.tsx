import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html } from '@react-three/drei';
import * as THREE from 'three';
import './App.css'
import { div } from 'three/tsl';

function Airplane(props) {
  const ref = useRef();
  const { scene } = useGLTF('models/airplane.glb');
  const speed = 0.2;

  useFrame((state, delta) => {
    if (!ref.current) return;
    if (props.keys.forward) ref.current.position.z -= speed;
    if (props.keys.backward) ref.current.position.z += speed;
    if (props.keys.left) ref.current.position.x -= speed;
    if (props.keys.right) ref.current.position.x += speed;
  });

  return <primitive object={scene} ref={ref} position={[0, 0, 0]} scale={0.5} />
}

function FloatingIsland({ position, title, description }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[4, 0.5, 4]} />
      <meshStandardMaterial color="green" />
      <Html distanceFactor={10} position={[0, 1, 0]} >
        <div style={{ background: 'white', padding: '8px', borderRadius: '5px' }}>
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Html>
    </mesh>
  )
}

function DayNightCycle({ scene }) {
  useEffect(() => {
    const hour = new Date().getHours();
    const isDay = hour >= 5 && hour < 19;
    scene.background = new THREE.Color(isDay ? '#87CEEB' : '#0D1B2A');
  }, [scene]);

  return null;
}

function Scene() {
  const [keys, setKeys] = useState({ forward: false, backward: false, left: false, right: false });

  const handleKeyDown = (e) => {
    if (keyMap[e.key]) setKeys((k) => ({ ..k, [keyMap[e.key]]: true }));
  };

  const handleKeyUp = (e) => {
    if (keyMap[e.key]) setKeys((k) => ({ ..k, [keyMap[e.key]]: false }));
  };

  const keyMap = {
    w: 'forward',
    s: 'backward',
    a: 'left',
    d: 'right',
  };

  return (
    <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0} style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} />
        <DayNightCycle scene={useThree((state) => state.scene)} />
        <Airplane keys={keys} />
        <FloatingIsland position={[0, -1, -10]} title="TEST" description="test teste" />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

function App() {
  return <Scene />
}

export default App
