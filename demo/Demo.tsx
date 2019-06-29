import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

import { BlurhashCanvas } from '../src';

const Setting = ({
  children,
  label,
  value,
}: {
  children: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    {label}
    {children}
    {value}
  </div>
);

const Demo = () => {
  const [size, setSize] = useState(256);
  const [punch, setPunch] = useState(1);

  return (
    <div>
      <h1>react-blurhash demo</h1>

      <Setting label="size" value={size}>
        <input
          type="range"
          min="1"
          max="512"
          step="8"
          value={size}
          onChange={e => setSize(Number(e.target.value))}
        />
      </Setting>

      <Setting label="punch" value={punch}>
        <input
          type="range"
          min="0"
          max="20"
          step="1"
          value={punch}
          onChange={e => setPunch(Number(e.target.value))}
        />
      </Setting>

      <BlurhashCanvas hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj" height={size} width={size} punch={punch} />
    </div>
  );
};

export default hot(Demo);
