import { useState, useRef, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Html, Stars } from '@react-three/drei';
import * as THREE from 'three';
import React from 'react';

const Airplane = React.forwardRef<THREE.Mesh, { keys: KeysType; onTrailEmit?: (pos: THREE.Vector3) => void }>(({ keys, onTrailEmit }, ref) => {
  const speed = 0.2;
  const velocity = useRef(new THREE.Vector3());

  useFrame(() => {
    const mesh = (ref as React.RefObject<THREE.Mesh>)?.current;
    if (!mesh) return;
    if (onTrailEmit) onTrailEmit(mesh.position.clone());
    const direction = new THREE.Vector3(
      (keys.right ? 1 : 0) - (keys.left ? 1 : 0),
      (keys.up ? 1 : 0) - (keys.down ? 1 : 0),
      (keys.backward ? 1 : 0) - (keys.forward ? 1 : 0)
    ).normalize();
    velocity.current.add(direction.multiplyScalar(0.01));
    velocity.current.multiplyScalar(0.9);
    mesh.position.add(velocity.current);
    mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, keys.left ? 0.3 : keys.right ? -0.3 : 0, 0.1);
    mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, keys.forward ? 0.1 : keys.backward ? -0.1 : 0, 0.1);
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

function DayNightCycle({ scene, setLightColor }: { scene: THREE.Scene; setLightColor: (color: THREE.Color) => void; }) {
  useEffect(() => {
    const hour = new Date().getHours();
    const isDay = hour >= 5 && hour < 19;
    scene.background = new THREE.Color(isDay ? '#87CEEB' : '#0D1B2A');
    setLightColor(isDay ? new THREE.Color('white') : new THREE.Color('#9999ff'));
  }, [scene, setLightColor]);
  return null;
}

const Platform = React.forwardRef<THREE.Mesh, {
  position: [number, number, number];
  shape?: 'box' | 'cylinder' | 'cone' | 'sphere';
  color?: string;
  children?: React.ReactNode;
}>(({ position, shape = 'box', color = 'green', children }, ref) => {
  let geometry;
  switch (shape) {
    case 'cylinder':
      geometry = <cylinderGeometry args={[2.5, 2.5, 0.3, 32]} />;
      break;
    case 'cone':
      geometry = <coneGeometry args={[2.5, 0.3, 32]} />;
      break;
    case 'sphere':
      geometry = <sphereGeometry args={[2.5, 32, 32]} />;
      break;
    case 'box':
    default:
      geometry = <boxGeometry args={[5, 0.3, 5]} />;
      break;
  }

  return (
    <group position={position}>
      <mesh ref={ref}>
        {geometry}
        <meshStandardMaterial color={color} />
      </mesh>
      {children}
    </group>
  );
});

type Island = {
  title: string;
  content: string;
  position: THREE.Vector3;
  shape: string;
  color: string;
  ref: React.RefObject<THREE.Mesh | null>;
};

function SceneContent({ keys, lightColor, setLightColor, planePosition, setPlanePosition, airplaneRef, setShowWelcome, showWelcome, activePopUp, setActivePopUp, islandData }: { keys: KeysType; lightColor: THREE.Color; setLightColor: (color: THREE.Color) => void; planePosition: THREE.Vector3; setPlanePosition: React.Dispatch<React.SetStateAction<THREE.Vector3>>; airplaneRef: React.RefObject<THREE.Mesh | null>; setShowWelcome: React.Dispatch<React.SetStateAction<boolean>>; showWelcome: boolean; activePopUp: number | null; setActivePopUp: React.Dispatch<React.SetStateAction<number | null>>; islandData: Island[]; }) {
  const { scene, camera } = useThree();
  const trail = useRef<THREE.Vector3[]>([]);
  const trailCount = 100;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const trailRef = useRef<THREE.InstancedMesh>(null);
  const trailGeometry = useMemo(() => new THREE.SphereGeometry(0.1, 8, 8), []);
  const trailMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 'white',
    transparent: true,
    vertexColors: true
  }), []);

  useEffect(() => {
    if (!trailRef.current) return;
    const colors = new Float32Array(trailCount * 3);
    for (let i = 0; i < trailCount; i++) {
      colors.set([1, 1, 1], i * 3);
    }
    trailRef.current.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
  }, []);

  useFrame(() => {
    const airplane = airplaneRef.current;
    if (!airplane) return;
    if (trailRef.current && airplane) {
      trail.current.unshift(airplane.position.clone());
      if (trail.current.length > trailCount) trail.current.pop();
      trail.current.forEach((pos, i) => {
        dummy.position.copy(pos);
        const t = 1 - i / trailCount;
        dummy.scale.setScalar(t * 0.2);
        dummy.updateMatrix();
        trailRef.current!.setMatrixAt(i, dummy.matrix);
        const fadedColor = new THREE.Color(1, 1, 1);
        trailRef.current!.setColorAt(i, fadedColor.multiplyScalar(t));
      });
      trailRef.current.instanceMatrix.needsUpdate = true;
      trailRef.current.instanceColor!.needsUpdate = true;
    }
    
    const pos = airplane.position.clone();
    const cameraOffset = new THREE.Vector3(0, 2, 10).applyQuaternion(airplane.quaternion);
    camera.position.lerp(pos.clone().add(cameraOffset), 0.1);
    camera.lookAt(pos);
    const airplaneBox = new THREE.Box3().setFromObject(airplane);

    islandData.forEach((island, index) => {
      const platform = island.ref.current;
      if (!platform) return;
      const platformBox = new THREE.Box3().setFromObject(platform);
      const material = platform.material as THREE.MeshStandardMaterial;

      if (airplaneBox.intersectsBox(platformBox)) {
        material.color.set('red');
        setActivePopUp(index);
      } else {
        material.color.set(island.color);
      }
    });

    if (airplane.position.z < -2 && showWelcome) {
      setShowWelcome(false);
    }

    setPlanePosition(airplane.position.clone());
  });

  return (
    <>
      <ambientLight intensity={1} color={lightColor} />
      <directionalLight position={[5, 10, 5]} color={lightColor} />
      <DayNightCycle scene={scene} setLightColor={setLightColor} />
      {islandData.map((island, index) => (
        <Platform key={index} ref={island.ref} position={island.position.toArray() as [number, number, number]} shape={island.shape as any} color={island.color} />
      ))}
      {activePopUp !== null && (
        <Html position={islandData[activePopUp].position.toArray() as [number, number, number]} distanceFactor={5} zIndexRange={[100, 0]}>
          <div style={{ background: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.3)' }}>
            <h1>{islandData[activePopUp].title}</h1>
            <p>{islandData[activePopUp].content}</p>
            <button onClick={() => setActivePopUp(null)}>Close</button>
          </div>
        </Html>
      )}
      {showWelcome && (
        <Html position={[0, 2, -5]} center distanceFactor={5} zIndexRange={[100, 0]}>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'white', background: 'rgba(0, 0, 0, 0.5)', padding: '8px 16px', borderRadius: '8px' }}>
            Welcome! I'm Lucas
          </div>
        </Html>
      )}
      <Airplane keys={keys} ref={airplaneRef} onTrailEmit={(pos) => {}} />
      <instancedMesh ref={trailRef} args={[trailGeometry, trailMaterial, trailCount]} />
      <Stars radius={100} depth={50} count={1000} factor={4} fade />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  );
}

function Scene() {
  const [keys, setKeys] = useState({ forward: false, backward: false, left: false, right: false, up: false, down: false });
  const [lightColor, setLightColor] = useState(new THREE.Color('white'));
  const [planePosition, setPlanePosition] = useState(new THREE.Vector3());
  const [showWelcome, setShowWelcome] = useState(true);
  const [activePopUp, setActivePopUp] = useState<number | null>(null);
  const airplaneRef = useRef<THREE.Mesh>(null);

  const islandData = useMemo(() => ([
    {
      title: 'Airport',
      content: 'Tutorial: Learn to fly with WASD and arrow keys!',
      position: new THREE.Vector3(0, -1, -10),
      shape: 'box',
      color: '#7f8c8d',
      ref: React.createRef<THREE.Mesh>()
    },
    {
      title: 'Aviation',
      content: 'Studying for a private pilot license!',
      position: new THREE.Vector3(15, -1, -25),
      shape: 'box',
      color: '#2980b9',
      ref: React.createRef<THREE.Mesh>()
    },
    {
      title: '3D Printing',
      content: 'Ender 3 Pro & Bambu Lab A1 mini owner -  maintenance & support!',
      position: new THREE.Vector3(-20, -1, -40),
      shape: 'box',
      color: '#e74c3c',
      ref: React.createRef<THREE.Mesh>()
    },
    {
      title: 'Machine Learning',
      content: 'AI/ML experiments with real-world impact.',
      position: new THREE.Vector3(25, -1, -60),
      shape: 'box',
      color: '#9b59b6',
      ref: React.createRef<THREE.Mesh>()
    },
    {
      title: 'CAD',
      content: 'Parametric design with Fusion, Onshape and SolidWorks.',
      position: new THREE.Vector3(-30, -1, -70),
      shape: 'box',
      color: '#f1c40f',
      ref: React.createRef<THREE.Mesh>()
    },
    {
      title: 'Translations',
      content: 'PT-BR Translator for many open source projects, like  HackClub, Homebrew, SemVer...',
      position: new THREE.Vector3(10, -1, -90),
      shape: 'box',
      color: '#1abc9c',
      ref: React.createRef<THREE.Mesh>()
    },
    {
      title: 'Contact',
      content: 'lucas [at] devlucas [dot] page',
      position: new THREE.Vector3(-5, -1, -110),
      shape: 'box',
      color: '#f39c12',
      ref: React.createRef<THREE.Mesh>()
    }
  ]), []);

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
        <SceneContent keys={keys} lightColor={lightColor} setLightColor={setLightColor} planePosition={planePosition} setPlanePosition={setPlanePosition} airplaneRef={airplaneRef} setShowWelcome={setShowWelcome} showWelcome={showWelcome} activePopUp={activePopUp} setActivePopUp={setActivePopUp} islandData={islandData} />
      </Canvas>
      <Radar planePosition={planePosition} airplaneRef={airplaneRef} islands={islandData} />
    </div>
  );
}

function Radar({ planePosition, airplaneRef, islands }: { planePosition: THREE.Vector3; airplaneRef: React.RefObject<THREE.Mesh | null>; islands: Island[]; }) {
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
    islands.forEach(({ position }) => {
      const dx = (position.x - planePosition.x) * 3;
      const dz = (position.z - planePosition.z) * 3;
      const px = center + dx;
      const pz = center + dz;
      ctx.beginPath();
      ctx.arc(px, pz, 4, 0, 2 * Math.PI);
      ctx.fill();
    });
  }, [planePosition, islands]);

  const resetPosition = () => {
    if (airplaneRef.current) {
      airplaneRef.current.position.set(0, 0, 0);
      airplaneRef.current.rotation.set(0, 0, 0);
    }
  };

  return (
    <div style={{ position: 'absolute', top: 20, right: 20, zIndex: 10 }}>
      <canvas ref={canvasRef} width={130} height={130} style={{ border: '2px solid white', borderRadius: '8px', background: 'rgba(0, 0, 0, 0.3)' }} />
      <button onClick={resetPosition} style={{ position: 'absolute', top: 0, right: 0, background: '#333', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer', fontSize: '10px' }}>Reset</button>
    </div>
  );
}

function App() {
  return <Scene />;
}

export default App;
