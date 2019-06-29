import React, { useState } from 'react';
import { hot } from 'react-hot-loader/root';

import { Blurhash, BlurhashCanvas } from '../src';

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

const BlurhashDemo = () => {
  const [size, setSize] = useState(256);
  const [resolution, setResolution] = useState(0.25);
  const [punch, setPunch] = useState(1);

  return (
    <div>
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

      <Setting label="resolution" value={resolution}>
        <input
          type="range"
          min="0.05"
          max="1.00"
          step="0.05"
          value={resolution}
          onChange={e => setResolution(Number(e.target.value))}
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

      <Blurhash
        hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        height={size}
        width={size}
        punch={punch}
        resolution={resolution}
      />
    </div>
  );
};

const BlurhashCanvasDemo = () => {
  const [size, setSize] = useState(256);
  const [punch, setPunch] = useState(1);

  return (
    <div>
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

      <BlurhashCanvas
        hash="LEHV6nWB2yk8pyo0adR*.7kCMdnj"
        height={size}
        width={size}
        punch={punch}
      />
    </div>
  );
};

const Demo = () => (
  <div>
    <h1>react-blurhash demo</h1>

    <h2>{'<Blurhash />'}</h2>
    <BlurhashDemo />

    <h2>{'<BlurhashCanvas />'}</h2>
    <BlurhashCanvasDemo />
  </div>
);

export default hot(Demo);
