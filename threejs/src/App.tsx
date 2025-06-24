import { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Stars, Clouds } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';

const Airplane = React.forwardRef<THREE.Mesh, { keys: KeysType }>(( { keys }, ref ) => {
    const speed = 0.2;

    useFrame(() => {
      const mesh = (ref as React.RefObject<THREE.Mesh>)?.current;
      if (!mesh) return;
      if (keys.forward) mesh.translateZ(-speed);
      if (keys.backward) mesh.translateZ(speed);
      if (keys.left) mesh.translateX(-speed);
      if (keys.right) mesh.translateX(speed);
      if (keys.up) mesh.translateY(speed);
      if (keys.down) mesh.translateY(-speed);
      const tilt = keys.left ? 0.3 : keys.right ? -0.3 : 0;
      mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, tilt, 0.1);
      const pitch = keys.forward ? 0.1 : keys.backward ? -0.1 : 0;
      mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, pitch, 0.1);
      if (keys.left) mesh.rotation.y += 0.02;
      if (keys.right) mesh.rotation.y -= 0.02;
    });

    return (
      <mesh ref={ref} position={[0, 0, 0]}>
        <boxGeometry args={[1, 0.5, 2]} />
        <meshStandardMaterial color="blue" />
      </mesh>
    );
});

type KeysType = { forward: boolean, backward: boolean; left: boolean; right: boolean; up: boolean; down: boolean };

function DayNightCycle({ scene, setLightColor }: {scene: THREE.Scene; setLightColor: (color: THREE.Color) => void; }) {
  useEffect(() => {
    const hour = new Date().getHours();
    const isDay = hour >= 5 && hour < 19;
    scene.background = new THREE.Color(isDay ? '#87CEEB' : '#0D1B2A');
    setLightColor(isDay ? new THREE.Color('white') : new THREE.Color('#9999ff'));
  }, [scene, setLightColor]);

  return null;
}

function PLatform({ position, title, description, imageUrl }: { position: [number, number, number]; title: string; description: string; imageUrl?: string; }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[5, 0.3, 5]} />
      <meshStandardMaterial color="green" />
      <Html distanceFactor={5} position={[0, 1.5, 0]} transform occlude>
        <div style={{
          background: 'white',
          padding: '10px',
          borderRadius: '8px',
          width: '200px',
          textAlign: 'center',
          boxShadow: '0 0 10px rgba(0,0,0,0.3)',
        }}>
          <h3>{title}</h3>
          <p>{description}</p>
          {imageUrl && <img src={imageUrl} style={{ width: '100%', borderRadius: '5px' }} />}
        </div>
      </Html>
    </mesh>
  )
}

function SceneContent({ keys, lightColor, setLightColor }: { keys: {forward: boolean; backward: boolean; left: boolean; right: boolean; up: boolean; down: boolean }; lightColor: THREE.Color; setLightColor: (color: THREE.Color) => void; }) {
  const { scene, camera } = useThree();
  const airplaneRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const airplane = airplaneRef.current;
    if (airplane) {
      const pos = airplane.position.clone();
      const cameraOffset = new THREE.Vector3(0, 2, 10).applyQuaternion(airplane.quaternion);
      camera.position.lerp(pos.clone().add(cameraOffset), 0.1);
      camera.lookAt(pos);
    }
  });

  return (
    <>
        <ambientLight intensity={1} color={lightColor} />
        <directionalLight position={[5, 10, 5]} color={lightColor} />
        <DayNightCycle scene={scene} setLightColor={setLightColor} />
        <PLatform position={[0, -1, -10]} title="Welcome!" description="Hello! I'm Lucas" />
        <PLatform position={[10, -1, -10]} title="Island2!" description="WAIT" />
        <PLatform position={[-10, -1, -10]} title="Island3!" description="WAIT" />
        <Airplane keys={keys} ref={airplaneRef} />
        <Stars radius={100} depth={50} count={1000} factor={4} fade />
        <Clouds material={THREE.MeshBasicMaterial} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  )
}

function Scene() {
  const [keys, setKeys] = useState({ forward: false, backward: false, left: false, right: false, up: false, down: false });
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
    ArrowUp: 'up',
    ArrowDown: 'down',
  };

  return (
    <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0} style={{ width: '100vw', height: '100vh' }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <SceneContent keys={keys} lightColor={lightColor} setLightColor={setLightColor} />
      </Canvas>
    </div>
  )
}

function App() {
  return <Scene />
}

export default App
