import React from "react";
import { Outlet } from "react-router-dom";
import PageWrapper from "../components/wrappers/PageWrapper";

export default function TheTask() {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
}
