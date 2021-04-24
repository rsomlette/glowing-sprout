import { Link as ReactLink } from "react-router-dom";
import styled from "styled-components";
import { color, ColorProps, space, SpaceProps } from "styled-system";

export default styled(ReactLink)<ColorProps & SpaceProps>`
  text-decoration: none;
  color: ${({ theme }) => theme.colors.link};
  ${space};
  ${color};
`;
