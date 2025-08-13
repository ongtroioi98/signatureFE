import React, { CSSProperties } from 'react';
import styled from 'styled-components';

interface BoxProps {
  display?: CSSProperties['display'];

  $justify?: CSSProperties['justifyContent'];
  $items?: CSSProperties['alignItems'];
  direction?: CSSProperties['flexDirection'];
  flex?: string | number;
  flexWrap?: string;
  gap?: string;

  padding?: string;
  paddingTop?: string;
  paddingBottom?: string;
  paddingLeft?: string;
  paddingRight?: string;
  paddingX?: string;
  paddingY?: string;

  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  marginX?: string;
  marginY?: string;

  height?: string;
  width?: string;

  color?: string;
  fontSize?: string;
  fontWeight?: string | number;
  bgColor?: string;
  textAlign?: string;

  borderRadius?: string;
  border?: string;
  borderWidth?: string;
  children?: React.ReactNode;

  position?: CSSProperties['position'];
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  zIndex?: number;

  cursor?: CSSProperties['cursor'];
  overflow?: CSSProperties['overflow'];
}

export const Box: React.FC<BoxProps> = styled.div(
  (props) => `
  display: ${props.display};
  padding: ${props.padding};
  padding-top: ${props.paddingTop || props.paddingY};
  padding-bottom: ${props.paddingBottom || props.paddingY};
  padding-left: ${props.paddingLeft || props.paddingX};
  padding-right: ${props.paddingRight || props.paddingX};

  margin: ${props.margin};
  margin-top: ${props.marginTop || props.marginY};
  margin-bottom: ${props.marginBottom || props.marginY};
  margin-left: ${props.marginLeft || props.marginX};
  margin-right: ${props.marginRight || props.marginX};

  justify-content: ${props.$justify};
  align-items: ${props.$items};
  flex-direction: ${props.direction};
  flex-wrap: ${props.flexWrap};
  flex: ${props.flex};
  gap: ${props.gap};

  height: ${props.height};
  width: ${props.width};
  border-radius: ${props.borderRadius};
  border: ${props.border};
  border-width: ${props.borderWidth};
  background-color: ${props.bgColor};
  color: ${props.color};
  font-size: ${props.fontSize};
  font-weight: ${props.fontWeight};
  text-align: ${props.textAlign};

  cursor: ${props.cursor};
  position: ${props.position};
  top: ${props.top};
  bottom: ${props.bottom};
  left: ${props.left};
  right: ${props.right};
  z-index: ${props.zIndex};

  overflow: ${props.overflow};
`,
);
