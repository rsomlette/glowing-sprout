import React, { FC } from "react";
import styled from "styled-components";
import { Moon, Sun, LogOut } from "react-feather";
import { Box } from ".";

const HeaderWrapper = styled.header`
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  font-weight: 300;
  font-size: 20px;
  background-color: ${({ theme }) => theme.colors.secondary};
  height: 60px;
  padding: 0 16px;

  a {
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    &:hover {
      color: ${({ theme }) => theme.colors.textHover};
    }
  }
  border: 1px solid ${({ theme }) => theme.colors.border};
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  outline: 0;

  color: ${({ theme }) => theme.colors.text};
`;

const Title = styled.h3`
  font-family: "Pacifico";
`;

interface iHeader {
  theme: string;
  toggleTheme: () => void;
  onLogout: () => void;
}

const Header: FC<iHeader> = ({ theme, toggleTheme, onLogout }) => (
  <HeaderWrapper>
    <Title>Yummit</Title>
    <Box ml="auto">
      <Button onClick={toggleTheme}>
        {theme === "light" ? <Moon /> : <Sun />}
      </Button>
      <Button onClick={onLogout}>
        <LogOut />
      </Button>
    </Box>
  </HeaderWrapper>
);

export default Header;
