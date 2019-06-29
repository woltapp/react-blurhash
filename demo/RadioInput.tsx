import React from 'react';
import styled from 'styled-components';

type Props = React.HTMLAttributes<HTMLLabelElement> & {
  className?: string;
  label?: React.ReactNode;
  style?: React.CSSProperties;
  input: React.InputHTMLAttributes<HTMLInputElement>;
};

const Root = styled.label`
  display: inline-flex;
  align-items: center;

  input {
    margin-right: 5px;
  }
`;

const RadioInput: React.FunctionComponent<Props> = ({ label, input, ...rest }) => (
  <Root {...rest}>
    <input type="radio" {...input} />
    {label}
  </Root>
);

export default RadioInput;
