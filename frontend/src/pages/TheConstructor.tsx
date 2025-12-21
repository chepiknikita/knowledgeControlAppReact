import React from "react";
import PageWrapper from "../components/wrappers/PageWrapper";
import TaskConstructor from "../features/task/TaskConstructor";

export default function Constructor() {
  return (
    <PageWrapper>
      <TaskConstructor loading={false} />
    </PageWrapper>
  );
}
