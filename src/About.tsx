import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { LogoAnim } from './LogoAnim';
import { OrthographicCamera, ContactShadows, EnvironmentMap, OrbitControls, useHelper } from '@react-three/drei';
import Loader from './Loader';
import MsqrdColors from './MSqrdColors';
import { DirectionalLight, Vector3, DirectionalLightHelper, CameraHelper } from 'three';

const orthoCamStartPos = new Vector3(0, 1, 0)

export const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <>
      <div ref={ref} style={{ height: '70vh', backgroundColor: 'lightgray', padding:0 }}>
        <Canvas shadows="soft" style={ { backgroundColor:MsqrdColors.darkBlue } }> 
            <CustomOrthoCamera />
            <Suspense fallback={<Loader />}>
              <HeroScene />
            </Suspense>
        </Canvas>
      </div>
      <div style={ { display:"flex", height:'30vh', justifyContent:"center", alignItems:"center" } }>
        <h2 style={ { textAlign:"center", color:MsqrdColors.yellow, } }>Magnitude Squared was born out of a passion for high performance code.</h2>
      </div>
    </>
  );
});

const calcOrthoCamZoom = () => 
{ 
  const orthoCamInitZoom = 100
  const orthoCamGoodWidthAspect = 0.65
  const orthoCamGoodHeightAspect = 0.2

  const windowWidth  = window.innerWidth
  const windowHeight = window.innerHeight
  const widthAspect  = windowWidth / windowHeight;
  const heightAspect = windowHeight / windowWidth;
  const finalMult = widthAspect < 1.6 ? (widthAspect / orthoCamGoodWidthAspect) : (heightAspect / orthoCamGoodHeightAspect);
  return orthoCamInitZoom * finalMult;
}

function CustomOrthoCamera(){
  const camRef = useRef<THREE.OrthographicCamera>(null!)
  //useHelper(camRef, CameraHelper)

  useFrame(({ clock }) => {
    camRef.current.zoom = calcOrthoCamZoom()
    camRef.current.updateProjectionMatrix()
  })  

  return (
    <>
      <OrthographicCamera 
        ref={camRef} 
        zoom={calcOrthoCamZoom()} 
        makeDefault={true}
        position={orthoCamStartPos} 
        rotation={[-1.57,0,0]}
        near={0.01} 
        far={100} 
        // top={1}
        // bottom={1}
        // right={1}
        // left={1}
      />
    </>
  )
}

function Floor(){
  return (
    <>
        <mesh scale={100} castShadow={true} receiveShadow={true} position={[0,-0.5,0]} rotation={[-1.57,0,0]}>
            <planeGeometry />
            <meshStandardMaterial color={MsqrdColors.yellow} metalness={0} roughness={1}/>
            {/* <shadowMaterial color={MsqrdColors.pink}/> */}
        </mesh>
    </>
  )
}

function HeroScene(){
  return (
    <>
        <LogoAnim />
        <Floor />
        <HeroSceneLights />
    </>
  );
}

function HeroSceneLights(){
  const dirLightRef = useRef<DirectionalLight>(null!)
  //useHelper(dirLightRef, DirectionalLightHelper, 1, "red")

  const dirLightAnimRadius = 3.5
  let dirLightPos = new Vector3(dirLightAnimRadius, dirLightAnimRadius * 0.7, dirLightAnimRadius)
  const lightMoveSpeed = 0.5
  useFrame(( { clock } ) => {
    dirLightPos.x = Math.sin(clock.elapsedTime * lightMoveSpeed) * dirLightAnimRadius;
    dirLightPos.z = Math.cos(clock.elapsedTime * lightMoveSpeed) * dirLightAnimRadius;
    dirLightRef.current.position.x = dirLightPos.x;
    dirLightRef.current.position.z = dirLightPos.z;
  })

  return (
    <>
        <ambientLight intensity={0.8} color={"white"} />
        {/* <EnvironmentMap background={false} files={"path"} /> */}
        {/* <pointLight position={[0.4,0.5,0]} color={"white"}/> */}
        <directionalLight
          intensity={2}
          position={dirLightPos}
          castShadow={true}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={16}
          shadow-camera-left={-3}
          shadow-camera-right={3}
          shadow-camera-top={3}
          shadow-camera-bottom={-3}
          ref={dirLightRef}
        />
    </>
  );
}