import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, Html, Stars, Clouds } from '@react-three/drei';
import * as THREE from 'three';
import './App.css'
import { div } from 'three/tsl';

function Airplane(props: { keys: { forward: any; backward: any; left: any; right: any; }; }) {
  const ref = useRef<THREE.Object3D>(null);

  const speed = 0.2;

  const geometry = new THREE.BoxGeometry(1, 0.5, 2);
  const material = new THREE.MeshStandardMaterial({ color: 'blue' });
  const mesh = new THREE.Mesh(geometry, material);

  useFrame(() => {
    if (!ref.current) return;
    if (props.keys.forward) ref.current.position.z -= speed;
    if (props.keys.backward) ref.current.position.z += speed;
    if (props.keys.left) ref.current.position.x -= speed;
    if (props.keys.right) ref.current.position.x += speed;
    ref.current.rotation.x = Math.sin(Date.now() * 0.001) * 0.05;
    ref.current.rotation.z = Math.sin(Date.now() * 0.0008) * 0.05;
  });

  return <primitive object={mesh} ref={ref} position={[0, 0, 0]} />
}

function FloatingIsland({ position, title, description }: {position: [number, number, number]; title: string; description: string; }) {
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

function DayNightCycle({ scene, setLightColor }: {scene: THREE.Scene; setLightColor: (color: THREE.Color) => void; }) {
  useEffect(() => {
    const hour = new Date().getHours();
    const isDay = hour >= 5 && hour < 19;
    scene.background = new THREE.Color(isDay ? '#87CEEB' : '#0D1B2A');
    setLightColor(isDay ? new THREE.Color('white') : new THREE.Color('#9999ff'));
  }, [scene]);

  return null;
}

function Menu({ onNavigate }: { onNavigate: (pos: [number, number, number]) => void }) {
  return (
    <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1, background: '#ffffffcc', padding: '10px', borderRadius: '8px' }}>
      <h3>Menu</h3>
      <button onClick={() => onNavigate([0, 0, -10])}>TEST</button><br />
    </div>
  )
}

function Scene() {
  const [keys, setKeys] = useState({ forward: false, backward: false, left: false, right: false });
  const [lightColor, setLightColor] = useState(new THREE.Color('white'));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (keyMap[key]) setKeys((k) => ({ ...k, [keyMap[key]]: true }));
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key;
    if (keyMap[key]) setKeys((k) => ({ ...k, [keyMap[key]]: false }));
  };

  const keyMap: Record<string, keyof typeof keys> = {
    w: 'forward',
    s: 'backward',
    a: 'left',
    d: 'right',
  };

  return (
    <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0} style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <SceneContent keys={keys} lightColor={lightColor} setLightColor={setLightColor} />
      </Canvas>
    </div>
  )
}

function SceneContent({ keys, lightColor, setLightColor }: { keys: {forward: boolean; backward: boolean; left: boolean; right: boolean}; lightColor: THREE.Color; setLightColor: (color: THREE.Color) => void; }) {
  const { scene, camera } = useThree();

  const handleNavigate = (pos: [number, number, number]) => {
    camera.position.set(pos[0], 2, pos[2] + 10);
    camera.lookAt(...pos);
  };

  return (
    <>
        <ambientLight intensity={1} color={lightColor} />
        <directionalLight position={[5, 10, 5]} color={lightColor} />
        <DayNightCycle scene={useThree((state) => state.scene)} setLightColor={setLightColor} />
        <Menu onNavigate={handleNavigate} />
        <Airplane keys={keys} />
        <FloatingIsland position={[0, -1, -10]} title="TEST" description="test teste" />
        <Stars radius={100} depth={50} count={1000} factor={4} fade />
        <Clouds material={THREE.MeshBasicMaterial} />
    </>
  )
}

function App() {
  return <Scene />
}

export default App
