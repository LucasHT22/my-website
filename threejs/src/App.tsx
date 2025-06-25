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

      const roll = keys.left ? 0.3 : keys.right ? -0.3 : 0;
      mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, roll, 0.1);
      
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

const Platform = React.forwardRef<THREE.Mesh, { position: [number, number, number]; title: string; description: string; imageUrl?: string; }> (
  ({ position, title, description, imageUrl }, ref) => {
    return (
    <group position={position}>
      <mesh ref={ref}>
        <boxGeometry args={[5, 0.3, 5]} />
        <meshStandardMaterial color="green" />
      </mesh>
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
    </group>
  );
});

function SceneContent({ keys, lightColor, setLightColor, planePosition, setPlanePosition, airplaneRef }: { keys: {forward: boolean; backward: boolean; left: boolean; right: boolean; up: boolean; down: boolean }; lightColor: THREE.Color; setLightColor: (color: THREE.Color) => void; planePosition: THREE.Vector3; setPlanePosition: React.Dispatch<React.SetStateAction<THREE.Vector3>>; airplaneRef: React.RefObject<THREE.Mesh | null>; }) {
  const { scene, camera } = useThree();

  const platformRefs = [
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
    useRef<THREE.Mesh>(null),
  ]

  useFrame(() => {
    const airplane = airplaneRef.current;
    if (!airplane) return;

    const pos = airplane.position.clone();
    const cameraOffset = new THREE.Vector3(0, 2, 10).applyQuaternion(airplane.quaternion);
    camera.position.lerp(pos.clone().add(cameraOffset), 0.1);
    camera.lookAt(pos);
    const airplaneBox = new THREE.Box3().setFromObject(airplane);

    platformRefs.forEach((ref) => {
      const platform = ref.current;
      if (!platform) return;
      const platformBox = new THREE.Box3().setFromObject(platform);

      if (airplaneBox.intersectsBox(platformBox)) {
        if (platform.material instanceof THREE.MeshStandardMaterial) {
          platform.material.color.set('red');
        }
      } else {
        if (platform.material instanceof THREE.MeshStandardMaterial) {
          platform.material.color.set('green');
        }
      }
    })
    
    setPlanePosition(airplane.position.clone());
  });

  return (
    <>
        <ambientLight intensity={1} color={lightColor} />
        <directionalLight position={[5, 10, 5]} color={lightColor} />
        <DayNightCycle scene={scene} setLightColor={setLightColor} />
        <Platform ref={platformRefs[0]} position={[0, -1, -10]} title="Welcome!" description="Hello! I'm Lucas" />
        <Platform ref={platformRefs[1]} position={[10, -1, -10]} title="Island2!" description="WAIT" />
        <Platform ref={platformRefs[2]} position={[-10, -1, -10]} title="Island3!" description="WAIT" />
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
  const [planePosition, setPlanePosition] = useState(new THREE.Vector3());

  const airplaneRef = useRef<THREE.Mesh>(null);

  const platformPositions = [
    new THREE.Vector3(0, -1, -10),
    new THREE.Vector3(10, -1, -10),
    new THREE.Vector3(-10, -1, -10),
  ];

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
    <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} tabIndex={0} style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 2, 10], fov: 60 }}>
        <SceneContent keys={keys} lightColor={lightColor} setLightColor={setLightColor} planePosition={planePosition} setPlanePosition={setPlanePosition} airplaneRef={airplaneRef} />
      </Canvas>
      <Radar planePosition={planePosition} platforms={platformPositions} airplaneRef={airplaneRef} />
    </div>
  )
}

function Radar({ planePosition, platforms, airplaneRef }: { planePosition: THREE.Vector3; platforms: THREE.Vector3[]; airplaneRef: React.RefObject<THREE.Mesh | null>; }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const size = 130;
    const center = size / 2;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(center, center, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = 'green';
    platforms.forEach((pos) => {
      const dx = (pos.x - planePosition.x) * 3;
      const dz = (pos.z - planePosition.z) * 3;
      const px = center + dx;
      const pz = center + dz;
      ctx.beginPath();
      ctx.arc(px, pz, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, [planePosition, platforms]);

  const resetPosition = () => {
    if (airplaneRef.current) {
      airplaneRef.current.position.set(0, 0, 0);
    }
  }

  return (
    <>
    <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }} >
      <canvas ref={canvasRef} width={130} height={130} style={{ position: 'absolute', top: 20, right: 20, border: '2px solid white', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.3', zIndex: 10, }} />
      <button onClick={resetPosition} style={{ position: 'absolute', top: 20, right: 20, background: '#333', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '10px', zIndex: 11 }}>Reset</button>
    </div>
    </>
  );
}

function App() {
  return <Scene />
}

export default App
