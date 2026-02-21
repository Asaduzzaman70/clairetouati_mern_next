import { Environment, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Alphabet_a } from "@/public/models/Alphabet_a";

export default function ThreeModelViewer() {
    return (
        <div className="h-full w-full">
            <Canvas className="h-[70vh]!">
                <ambientLight />
                <OrbitControls enableZoom={false} enablePan={false} />
                <Alphabet_a position={[0, -2.5, 0]} scale={8} />
                <Environment preset="forest" />
            </Canvas>
        </div>
    )
}