import React from "react";

export const Services = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} style={{ height: '100vh', backgroundColor: 'lightblue' }}>
      <h1>Services Section</h1>
    </div>
  );
});
