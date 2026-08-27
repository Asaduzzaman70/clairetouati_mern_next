import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Alphabet_a } from "@/public/models/Alphabet_a";

export default function ThreeModelViewer() {
    return (
        <div className="w-full h-full">
            <Canvas
                className="w-full h-full"
                camera={{ position: [0, 0, 7], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={1.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1.5} />
                <Alphabet_a position={[0, -2.2, 0]} scale={7} />
                <Environment preset="forest" />
            </Canvas>
        </div>
    );
}