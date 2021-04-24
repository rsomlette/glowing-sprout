import styled from "styled-components";
import { space, SpaceProps } from "styled-system";

export default styled.button<SpaceProps>`
  padding: 10px 20px;
  outline: none;
  background-color: #ffcc00;
  border: none;
  border-radius: 5px;
  color: #3d3d3d;
  font-size: 16px;
  transition: background-color 200ms ease-in-out;

  &:hover,
  &:focus {
    background-color: #b88a45;
  }

  ${space}
`;
