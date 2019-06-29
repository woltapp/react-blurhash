import styled from 'styled-components';

const Button = styled.button`
  background: none;
  outline: none;

  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  background-color: #0019ff;
  color: white;
  border: none;
  padding: 8px 24px;
  min-height: 42px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: #3d50ff;
  }

  &:active {
    background-color: #041ae5;
  }
`;

export default Button;
