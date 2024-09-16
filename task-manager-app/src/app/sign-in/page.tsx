"use client";

import { SignIn } from "@clerk/nextjs";
import React from "react";
import styled from "styled-components";

function page() {
  return (
    <PageStyled>
      <SignIn></SignIn>
    </PageStyled>
  );
}

const PageStyled = styled.div`
  display: flex;
  justify-content: center;
`;

export default page;
