import React, { useState, useMemo } from 'react';
import { hot } from 'react-hot-loader/root';
import styled from 'styled-components';
import { isBlurhashValid } from 'blurhash';

import { Blurhash, BlurhashCanvas } from '../src';
import RadioInput from './RadioInput';
import RangeInput from './RangeInput';
import Setting from './Setting';
import BlurhashImageEncoder from './BlurhashImageEncoder';

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

const BlurhashContainer = styled.div`
  margin-top: 18px;
`;

const TextInput = styled.input.attrs({
  type: 'test',
  autoComplete: 'off',
  autoCapitalize: 'off',
  autoCorrect: 'off',
  spellCheck: false,
})`
  white-space: pre;
  font-size: 1em;
  font-family: monospace;
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #d8d8d8;
  width: 100%;
  box-sizing: border-box;

  outline: none;

  &:focus {
    border-color: #8ab7ea;
  }
`;

const ModeSelect = styled.div`
  margin: 15px 0;
`;

const StyledRadioInput = styled(RadioInput)`
  & + & {
    margin-left: 14px;
  }
`;

const Hint = styled.div`
  font-size: 0.8em;
  color: #999;
  margin: 8px 0;
`;

const Footer = styled.footer`
  border-top: 1px solid #f2f2f2;
  margin-top: 40px;
  padding: 15px 10px;
  text-align: center;
  font-size: 0.9em;

  ul {
    list-style: none;
    white-space: nowrap;
  }

  li {
    position: relative;
    display: inline;
  }

  li + li {
    margin-left: 24px;
  }

  li + li:after {
    position: absolute;
    top: 0px;
    left: -15px;
    content: '·';
    color: #c8c8c8;
  }

  a {
    color: #c8c8c8;
    text-decoration: none;

    &:hover {
      color: #3d50ff;
    }

    &:active {
      color: #041ae5;
    }
  }
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
  const [mode, setMode] = useState<'hash' | 'image'>('hash');
  const [hashInput, setHashInput] = useState('LEHV6nWB2yk8pyo0adR*.7kCMdnj');
  const [encodedHash, setEncodedHash] = useState('');
  const hash = mode === 'hash' ? hashInput : encodedHash;
  const blurhashValid = useMemo(() => isBlurhashValid(hash), [hash]);

  return (
    <Root>
      <Heading1>react-blurhash demo</Heading1>
      <Separator />

      <ModeSelect>
        <StyledRadioInput
          label="Blurhash string"
          input={{
            onChange: e => setMode(e.target.value as 'hash'),
            value: 'hash',
            checked: mode === 'hash',
          }}
        />
        <StyledRadioInput
          label="Encode image"
          input={{
            onChange: e => setMode(e.target.value as 'image'),
            value: 'image',
            checked: mode === 'image',
          }}
        />
      </ModeSelect>

      {mode === 'hash' && (
        <TextInput value={hashInput} onChange={e => setHashInput(e.target.value.trim())} />
      )}

      {mode === 'image' && (
        <>
          <Hint>Note: encoding is done in the browser only (no server involved)!</Hint>
          <BlurhashImageEncoder onChange={hash => setEncodedHash(hash)} value={encodedHash} />
        </>
      )}

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
        </>
      )}

      <Footer>
        <ul>
          <li>
            <a href="https://github.com/woltapp/react-blurhash" target="_blank">
              react-blurhash
            </a>
          </li>
          <li>
            <a href="https://github.com/woltapp/blurhash/tree/master/TypeScript" target="_blank">
              Blurhash TypeScript
            </a>
          </li>
          <li>
            <a href="https://blurha.sh" target="_blank">
              Blurhash website
            </a>
          </li>
        </ul>
      </Footer>
    </Root>
  );
};

export default hot(Demo);
