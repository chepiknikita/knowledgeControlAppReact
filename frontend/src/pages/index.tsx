import React from "react";
import { Route, Routes } from "react-router-dom";
import TheHome from "./TheHome";
import TheConstructor from "./TheConstructor";
import PageNotFound from "./PageNotFound";
import ThePersonalProfile from "./ThePersonalProfile";
import TheLogin from "./TheLogin";
import TheSignUp from "./TheSignUp";
import TheTaskDescription from "./TheTaskDescription";
import TheTaskQuestions from "./TheTaskQuestions";
import TheTaskEnd from "./TheTaskEnd";
import TheTask from "./TheTask";
import TheTaskEdit from "./TheTaskEdit";
import { ProtectedRoute } from "../components/ProtectedRoute";

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<TheHome />} />
      <Route path="/login" element={<TheLogin />} />
      <Route path="/sign-up" element={<TheSignUp />} />
      <Route
        path="/constructor"
        element={
          <ProtectedRoute>
            <TheConstructor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/personal-profile"
        element={
          <ProtectedRoute>
            <ThePersonalProfile />
          </ProtectedRoute>
        }
      />
      <Route path="/task" element={<TheTask />}>
        <Route
          path="edit/:id"
          element={
            <ProtectedRoute>
              <TheTaskEdit />
            </ProtectedRoute>
          }
        />
        <Route path="description/:id" element={<TheTaskDescription />} />
        <Route path="questions/:id" element={<TheTaskQuestions />} />
        <Route path="end/:id" element={<TheTaskEnd />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}
