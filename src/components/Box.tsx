import styled from "styled-components";
import {
  color,
  ColorProps,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  typography,
  TypographyProps,
  flexbox,
  FlexboxProps,
  background,
  BackgroundProps,
  border,
  BorderProps,
  position,
  PositionProps,
  shadow,
  ShadowProps,
} from "styled-system";

export type MultiStyledSystemType = ColorProps &
  SpaceProps &
  LayoutProps &
  TypographyProps &
  FlexboxProps &
  BackgroundProps &
  BorderProps &
  PositionProps &
  ShadowProps;

export default styled.div<MultiStyledSystemType>`
  transition: 200ms linear all;

  ${color}
  ${space}
  ${layout}
  ${typography}
  ${flexbox}
  ${background}
  ${border}
  ${position}
  ${shadow}
`;
