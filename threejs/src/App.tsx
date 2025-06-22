import { useState, useRef } from 'react';
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

function FloatingIsland() {
  return (
    <mesh position={[0, -1, -10]}>
      <boxGeometry args={[4, 0.5, 4]} />
      <meshStandardMaterial color="green" />
      <Html distanceFactor={10} position={[0, 1, 0]} >
        <div style={{ background: 'white', padding: '8px', borderRadius: '5px' }}>
          <h3>TEST</h3>
          <p>test teste test</p>
        </div>
      </Html>
    </mesh>
  )
}

function Scene() {
  const [keys, setKeys] = useState({ forward: false, backward: false, left: false, right: false });

  const handleKeyDown = (e) => {
    setKeys((k) => ({ ..k, [keyMap[e.key]]: true }));
  };

  const handleKeyUp = (e) => {
    setKeys((k) => ({ ..k, [keyMap[e.key]]: false }));
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
        <Airplane keys={keys} />
        <FloatingIsland />
        <OrbitControls />
      </Canvas>
    </div>
  )
}

function App() {
  return <Scene />
}

export default App
