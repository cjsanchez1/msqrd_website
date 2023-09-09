import NavBar from "./NavBar";
import React from "react";
import * as MSqrdColors from "./MSqrdColors"
import { About } from "./About";
import { Services } from "./Services";
import { Contact } from "./Contact";

export default function App() {
  const aboutRef    = React.useRef<HTMLDivElement>(null);
  const servicesRef = React.useRef<HTMLDivElement>(null);
  const contactRef  = React.useRef<HTMLDivElement>(null);
  
  document.body.style.backgroundColor = MSqrdColors.darkBlue;

  return (
    <>
      <NavBar aboutRef={aboutRef} servicesRef={servicesRef} contactRef={contactRef} />
      <About ref={aboutRef} />
      <Services ref={servicesRef} />
      <Contact ref={contactRef} />
    </>
  )
}
