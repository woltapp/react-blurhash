import React, { useState, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';
import { isBlurhashValid } from 'blurhash';

import { Blurhash, BlurhashCanvas } from '../src';

const Root = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  font-family: sans-serif;
`;

const BlurhashError = styled.div`
  margin-top: 10px;
  color: #cc4260;
  font-weight: 500;
  font-size: 0.9em;
`;

const Heading1 = styled.h1`
  margin: 24px 0;
`;

const Heading2 = styled.h2`
  font-size: 1.4em;
`;

const Code = styled.pre`
  margin: 0;
  padding: 0;
  display: inline-block;
  font-family: monospace, monospace;
`;

const Separator = styled.hr`
  height: 1px;
  background-color: #e0e0e0;
  border: none;
  margin: 24px 0;
`;

const SettingsContainer = styled.div`
  padding: 15px;
  display: inline-block;
  background-color: #f5f5f5;
  border: 1px solid #e4e4e4;
  border-radius: 4px;
`;

const SettingLabel = styled.div`
  width: 100px;
  white-space: pre;
  font-size: 0.9em;
  font-family: monospace, monospace;
`;

const SettingValue = styled.div`
  margin-left: 8px;
  white-space: pre;
  font-size: 0.9em;
  font-family: monospace, monospace;
`;

const SettingRoot = styled.div`
  display: flex;

  & + & {
    margin-top: 10px;
  }
`;

const BlurhashContainer = styled.div`
  margin-top: 18px;
`;

const Setting = ({
  children,
  label,
  value,
}: {
  children: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) => (
  <SettingRoot>
    <SettingLabel>{label}</SettingLabel>
    {children}
    <SettingValue>{value}</SettingValue>
  </SettingRoot>
);

const RangeInput = styled.input.attrs({ type: 'range' })`
  width: 300px;
`;

const TextInput = styled.input.attrs({ type: 'test' })`
  white-space: pre;
  font-size: 1em;
  font-family: monospace, monospace;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #8ab7ea;
  width: 100%;
  box-sizing: border-box;
`;

const BlurhashDemo = ({ hash }: { hash: string }) => {
  const [size, setSize] = useState(256);
  const [resolution, setResolution] = useState(32);
  const [punch, setPunch] = useState(1);

  return (
    <div>
      <SettingsContainer>
        <Setting label="size" value={`${size} (px)`}>
          <RangeInput
            min="1"
            max="1024"
            step="8"
            value={size}
            onChange={e => setSize(Number(e.target.value))}
          />
        </Setting>

        <Setting label="resolution" value={`${resolution} (px)`}>
          <RangeInput
            min="4"
            max="128"
            step="1"
            value={resolution}
            onChange={e => setResolution(Number(e.target.value))}
          />
        </Setting>

        <Setting label="punch" value={punch}>
          <RangeInput
            min="0"
            max="20"
            step="1"
            value={punch}
            onChange={e => setPunch(Number(e.target.value))}
          />
        </Setting>
      </SettingsContainer>

      <BlurhashContainer>
        <Blurhash
          hash={hash}
          height={size}
          width={size}
          punch={punch}
          resolutionX={resolution}
          resolutionY={resolution}
        />
      </BlurhashContainer>
    </div>
  );
};

const BlurhashCanvasDemo = ({ hash }: { hash: string }) => {
  const [size, setSize] = useState(256);
  const [punch, setPunch] = useState(1);

  return (
    <div>
      <SettingsContainer>
        <Setting label="size" value={`${size} (px)`}>
          <RangeInput
            min="1"
            max="1024"
            step="8"
            value={size}
            onChange={e => setSize(Number(e.target.value))}
          />
        </Setting>

        <Setting label="punch" value={punch}>
          <RangeInput
            min="0"
            max="20"
            step="1"
            value={punch}
            onChange={e => setPunch(Number(e.target.value))}
          />
        </Setting>
      </SettingsContainer>

      <BlurhashContainer>
        <BlurhashCanvas hash={hash} height={size} width={size} punch={punch} />
      </BlurhashContainer>
    </div>
  );
};

const Demo = () => {
  const [hash, setHash] = useState('LEHV6nWB2yk8pyo0adR*.7kCMdnj');

  const blurhashValid = useMemo(() => isBlurhashValid(hash), [hash]);

  return (
    <Root>
      <Heading1>react-blurhash demo</Heading1>
      <Separator />
      Blurhash <TextInput value={hash} onChange={e => setHash(e.target.value.trim())} />
      {hash && !blurhashValid.result && (
        <BlurhashError>
          <strong>Invalid blurhash</strong> - {blurhashValid.errorReason}
        </BlurhashError>
      )}
      {blurhashValid.result && (
        <>
          <Separator />
          <Heading2>
            <Code>{'<Blurhash />'}</Code>
          </Heading2>
          <BlurhashDemo hash={hash} />
          <Separator />
          <Heading2>
            <Code>{'<BlurhashCanvas />'}</Code>
          </Heading2>
          <BlurhashCanvasDemo hash={hash} />
          <Separator />
        </>
      )}
    </Root>
  );
};

export default hot(Demo);
