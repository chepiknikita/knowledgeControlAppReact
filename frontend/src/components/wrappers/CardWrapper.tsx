import { Card } from "@mui/material";
import React from "react";
import PageWrapper from "../../../components/wrappers/PageWrapper";

interface Props {
  children: React.ReactNode;
}

export default function CardWrapper({ children }: Props) {
  return (
    <PageWrapper>
      <Card sx={{ width: 600, m: 4 }}>{children}</Card>
    </PageWrapper>
  );
}
