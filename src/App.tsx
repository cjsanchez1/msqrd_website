import { About } from "./About";
import NavBar from "./NavBar";
import React, { useRef } from "react";
import { Services } from "./Services";
import { Contact } from "./Contact";

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
