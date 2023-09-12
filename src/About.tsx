import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { LogoAnim } from './LogoAnim';
import { OrthographicCamera, Environment, OrbitControls, useHelper } from '@react-three/drei';
import Loader from './Loader';
import * as MSqrdColors from "./MSqrdColors"
import * as THREE from "three"
import { DirectionalLight, Vector3, DirectionalLightHelper, CameraHelper } from 'three';
import * as OrthoCamUtils from './OrthoCamUtils';

const orthoCamStartPos = new Vector3(0, 10, 0)

export const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <>
      <div ref={ref} style={{ height: '70vh', backgroundColor: 'lightgray', padding:0 }}>
        <Canvas shadows="soft" style={ { backgroundColor:MSqrdColors.darkBlue } }> 
            {/* <OrbitControls /> */}
            <CustomOrthoCamera />
            <Suspense fallback={<Loader />}>
              <LogoScene />
            </Suspense>
        </Canvas>
      </div>
      <div style={ { display:"flex", flexDirection:"column", height:'30vh', width:'80vw', justifyContent:"center", alignItems:"center", margin:'auto' } }>
        <div style={ { fontSize:"1.8rem", textAlign:"center", color:MSqrdColors.lightBlue, fontFamily:"vera_it", } }>
          Where education meets innovation.
        </div>
        <div style={ { height:"1vh" } }/>
        <div style={ { fontSize:"0.9rem", textAlign:"center", color:MSqrdColors.yellow, } }>
        We are pioneers in leveraging high-performance code and groundbreaking 3D visualizations to create immersive, interactive educational environments. 
        We believe in a world where learning is a vibrant, intuitive, and dynamic. Join us as we redefine the boundaries of education, offering unparalleled learning experiences crafted for the next generation of thinkers, creators, and leaders. Embark on a journey of discovery with Magnitude Squared where every lesson is a new dimension.
        </div>
      </div>
    </>
  );
});

function calcOrthoCamZoom() : number {
  return OrthoCamUtils.calcOrthoCamZoom(OrthoCamUtils.calcOrthoCamZoomDefaultSettings);
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
            <meshStandardMaterial 
              color={MSqrdColors.yellow} 
              metalness={0} 
              roughness={1}
              envMapIntensity={1}
            />
        </mesh>
    </>
  )
}

function LogoScene(){
  return (
    <>
        <LogoAnim />
        <Floor />
        <LogoSceneLights />
    </>
  );
}

function LogoSceneLights(){
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
        <Environment background={false} files={"./imgs/blue_photo_studio_1k.hdr"} />
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