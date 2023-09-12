import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as MSqrdColors from './MSqrdColors';
import { DirectionalLight, Vector3 } from 'three';
import { Environment, OrthographicCamera, EnvironmentMap, OrbitControls } from '@react-three/drei';
import { ServicesAnim } from './ServicesAnim';
import * as OrthoCamUtils from "./OrthoCamUtils";
import Loader from './Loader';

const orthoCamStartPos = new Vector3(0, 10, 0)

export const Services = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} style={{ height: '100vh', backgroundColor: 'lightgray', padding:0 }}>
      <Canvas shadows="soft" style={ { backgroundColor:MSqrdColors.darkBlue } }> 
        <CustomOrthoCamera />
        <Suspense fallback={<Loader />}>
          <ServicesScene />
        </Suspense>
      </Canvas>
    </div>
  );
});

function ServicesScene(){
  return (
    <>
        <ServicesAnim />
        <Lighting />
    </>
  );
}

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
      />
    </>
  )
}

function Lighting(){
  const dirLightRef = useRef<DirectionalLight>(null!)
  // //useHelper(dirLightRef, DirectionalLightHelper, 1, "red")

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
        <ambientLight intensity={0.8} color={"white"} />
        <directionalLight
          intensity={10}
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