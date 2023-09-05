import React from "react";

export const About = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} style={{ height: '100vh', backgroundColor: 'lightgray' }}>
      <h1>About Section</h1>
    </div>
  );
});
