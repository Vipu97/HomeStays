import React from "react";
import { SpinnerCircular } from "spinners-react";

const Spinner = () => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
      <SpinnerCircular size={120} color={"#F5385D"} speed={90} secondaryColor="lightgray" />
    </div>
  );
};

export default Spinner;
