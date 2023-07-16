import { Box, OrbitControls} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, quat } from "@react-three/rapier";
import { useRef,useState } from "react";

import * as THREE from "three";


export const Experience = () => {

  const [hover, setHover] = useState(false);
  const cube = useRef();
  const [start,setStart] = useState(false);
  const kicker = useRef();
  const jump = () => {
    cube.current.applyImpulse({x: 0, y: 5, z: 0})
  };

  useFrame((_state, delta) => {
    const curRotation = quat(kicker.current.rotation());
    const incrementRotation = new THREE.Quanternion().setFormAxisAngle(
      new THREE.Vector3(0, 1, 0),
      delta * 2,
    );
    curRotation.multiply(incrementRotation);
    kicker.current.setNextKinematicRotation(curRotation);
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[-10, 10, 0]} intensity={0.4} />
      <OrbitControls />

      <RigidBody position={[-2.5,1,0]} ref={cube}>
        <Box 
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onClick={() => setStart(true)}
        >
          <meshStandardMaterial color={hover ? "hotpink" : "royalblue"} />
        </Box>
      </RigidBody>

      <RigidBody type="kinematicPosition" position={[0, 0.75, 0]} ref={kicker}>
        <group position={[2.5, 0, 0]}>
          <Box args={[5, 0.5, 0.5]}>
            <meshStandardMaterial color="peachpuff" />
          </Box>
        </group>
      </RigidBody>

    
      <RigidBody type="fixed">
        <Box position={[0,0,0]} args={[10,1,10]}>
            <meshStandardMaterial color="springgreen" />
        </Box>
      </RigidBody>
    </>
  );
};
