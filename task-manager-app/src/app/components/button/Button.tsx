"use client";
import React from "react";
import { useGlobalState } from "../../context/globalProvider";
import styled from "styled-components";

interface Props {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRadius?: string;
  fontWeight?: number;
  fontSize?: string;
  selector?: string;
  click?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
  border?: string;
}

export default function Button({
  icon,
  name,
  background,
  padding,
  borderRadius,
  click,
  type,
  border,
  fontSize,
  fontWeight,
}: Props) {
  const { theme } = useGlobalState();

  return (
    <ButtonStyled
      theme={theme}
      type={type}
      style={{
        background: background,
        padding: padding || "0.5rem 1rem",
        fontSize: fontSize,
        fontWeight: fontWeight,
        borderRadius: borderRadius || "0.5rem",
        border: border || "none",
      }}
      onClick={click}
    >
      {icon && icon}
      {name}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  color: ${(props) => props.theme.colorGrey2};
  z-index: 5;
  cursor: pointer;

  transition: all 0.55s ease-in-out;

  i {
    margin-right: 1rem;
    color: ${(props) => props.theme.colorGrey2};
    font-size: 1.5rem;
    transition: all 0.55s ease-in-out;
  }

  &:hover {
    color: ${(props) => props.theme.colorGrey0};
    i {
      color: ${(props) => props.theme.colorGrey0};
    }
  }
`;
