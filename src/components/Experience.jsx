import { Box, OrbitControls } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { MeshStandardMaterial } from "three";

export const Experience = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-10, 10, 0]} intensity={0.4} />
      <OrbitControls />

      <RigidBody position={[2.5,5,0]}>
        <Box>
            <meshStandardMaterial color="royalblue"/>
        </Box>
      </RigidBody>
      
      <RigidBody type="fixed">
        <Box position={[0,0,0]} args={[10,1,10]}>
            <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
    </>
  );
};