import React from "react";

export const Contact = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} style={{ height: '100vh', backgroundColor: 'lightgreen' }}>
      <h1>Contact Section</h1>
    </div>
  );
});
