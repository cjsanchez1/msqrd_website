import NavBar from "./NavBar";
import React, { useRef } from "react";

const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} style={{ height: '100vh', backgroundColor: 'lightgray' }}>
      <h1>About Section</h1>
    </div>
  );
});

const Services = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} style={{ height: '100vh', backgroundColor: 'lightblue' }}>
      <h1>Services Section</h1>
    </div>
  );
});

const Contact = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} style={{ height: '100vh', backgroundColor: 'lightgreen' }}>
      <h1>Contact Section</h1>
    </div>
  );
});

export default function App() {
  const aboutRef    = React.useRef<HTMLDivElement>(null);
  const servicesRef = React.useRef<HTMLDivElement>(null);
  const contactRef  = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <NavBar aboutRef={aboutRef} servicesRef={servicesRef} contactRef={contactRef} />
      <About ref={aboutRef} />
      <Services ref={servicesRef} />
      <Contact ref={contactRef} />
      <div>Testv Div</div>
    </>
  )
}
