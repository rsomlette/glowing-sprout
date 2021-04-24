import React from "react";
import styled from "styled-components";
import { Link } from "../../components";

const Title = styled.h1`
  display: inline-block;
  margin: 0;
  margin-right: 20px;
  padding: 10px 23px 10px 0;
  font-size: 24px;
  font-weight: 500;
  vertical-align: top;
`;

const Subtitle = styled.h2`
  font-size: 14px;
  font-weight: normal;
  line-height: inherit;
  margin: 0;
  padding: 0;
`;

const Content = styled.div`
  display: inline-block;
  text-align: left;
  line-height: 49px;
  vertical-align: middle;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 35vh 0;
`;

export const Four0Four = () => (
  <Wrapper>
    <Title>404</Title>
    <Content>
      <Subtitle>This page could not be found.</Subtitle>
      <div>
        <Link to="/login">Back home</Link>
      </div>
    </Content>
  </Wrapper>
);
