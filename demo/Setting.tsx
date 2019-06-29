import React from 'react';
import styled from 'styled-components';

const SettingLabel = styled.div`
  width: 120px;
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

export default Setting;
