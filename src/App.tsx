import { About } from "./About";
import NavBar from "./NavBar";
import React, { useRef } from "react";
import { Services } from "./Services";
import { Contact } from "./Contact";
import MsqrdColors from "./MSqrdColors";

export default function App() {
  const aboutRef    = React.useRef<HTMLDivElement>(null);
  const servicesRef = React.useRef<HTMLDivElement>(null);
  const contactRef  = React.useRef<HTMLDivElement>(null);
  
  document.body.style.backgroundColor = MsqrdColors.darkBlue;

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
