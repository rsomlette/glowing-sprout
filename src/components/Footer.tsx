import React from "react";
import styled from "styled-components";

const StyledFooter = styled.footer`
  margin-top: auto;
  text-align: center;
  margin-bottom: 8px;
`;

// eslint-disable-next-line import/no-anonymous-default-export
export default (props: any) => (
  <StyledFooter {...props}>
    Copyright 2020 Yummit. All rights reserved | Privacy Policy | Term of Use
  </StyledFooter>
);
