import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as MSqrdColors from './MSqrdColors';
import { Vector3 } from 'three';
import { OrthographicCamera, } from '@react-three/drei';
import * as OrthoCamUtils from "./OrthoCamUtils";
import { ContactQuad } from './ContactQuad';
import { Button } from '@mui/material';

const orthoCamStartPos = new Vector3(0, 10, 0)

const handleDivClick = () => {
  window.location.href = "mailto:magnitudesquared@gmail.com?subject=Greatest topic ever!";
};

export const Contact = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <>
    <div ref={ref} style={{ height: '100vh', backgroundColor: 'lightgray', padding:0, cursor:"pointer" }} onClick={handleDivClick}>
      <Canvas shadows="soft" style={ { backgroundColor:MSqrdColors.darkBlue } }> 
        <CustomOrthoCamera />
        <ContactScene />
      </Canvas>
    </div>
    </>
  );
});

function ContactScene(){
  return (
    <>
        <ContactQuad />
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