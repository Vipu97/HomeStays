import React from 'react';
import {TailSpin} from 'react-loader-spinner'

const Spinner = ({height,width}) => {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
      <TailSpin
        height={height}
        width={width}
        color="#f5385d"
        radius="1"
        visible={true}
      />
    </div>
  );
};

export default Spinner;