import { BrowserRouter, Route, Routes, Navigate } from "react-router";
import { PageComponent } from "./pages/page-components";
import LayoutMain from "./pages/layout-main";

import { PrivateRoute } from "./routes/private-route";
import { Login } from "./pages/login-page";
import { Register } from "./pages/register-page";
import TasksList from "./core-components/tasks-list";
import { Toaster } from "sonner";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<LayoutMain />}>
          <Route
            path="/tasks"
            element={
              <PrivateRoute>
                <TasksList />
              </PrivateRoute>
            }
          />

          <Route
            path="/components"
            element={
              <PrivateRoute>
                <PageComponent />
              </PrivateRoute>
            }
          />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
