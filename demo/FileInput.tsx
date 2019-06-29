import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

type Props = {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  onChange: (file: File) => void;
  showText: boolean;
};

const Text = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #777;
`;

const Root = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover ${Text}, &:focus ${Text} {
    color: #3d50ff;
  }

  &:active ${Text} {
    color: #041ae5;
  }
`;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const FileInput: React.FunctionComponent<Props> = ({
  children,
  className,
  onChange,
  id = 'file-input',
  showText,
}) => {
  const [file, setFile] = useState<File | undefined>(undefined);

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { files } = event.currentTarget;
      const newFile = files[0];

      if (newFile !== file) {
        setFile(newFile);
        onChange(newFile);
      }
    },
    [onChange],
  );

  return (
    <Root className={className} htmlFor={id}>
      <Input id={id} onChange={handleChange} type="file" multiple={false} accept="image/*" />
      {showText && <Text>Choose image</Text>}
      {children}
    </Root>
  );
};

export default FileInput;
