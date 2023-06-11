import { Route, RouteProps, Routes } from "react-router";
import React from "react";
import PrivateRoute from "./PrivateRoute";
import LoginPage from "../pages/auth/Login";
import DashboardPage from "../pages/Dashboard";
import KnowledgePage from "../pages/Knowledge";
import CropPage from "../pages/Crop";
import CropDiseasePage from "../pages/CropDisease";
import ModelPage from "../pages/Model";
interface RouteInterface {
  title: string;
  path: string;
  guard: boolean;
  component: React.ComponentType<RouteProps>;
}

//list of routes, note that title can be overridden using global state or  <LinkButton routeName="Custom Title">
export const routes: RouteInterface[] = [
  { title: "Login", guard: false, path: "/login", component: LoginPage },
  { title: "Dashboard", guard: true, path: "/", component: DashboardPage },
  {
    title: "Knowledge Data",
    guard: true,
    path: "/knowledge",
    component: KnowledgePage,
  },
  {
    title: "Crop Data",
    guard: true,
    path: "/crop",
    component: CropPage,
  },
  {
    title: "Crop Disease",
    guard: true,
    path: "/crop/:id/disease",
    component: CropDiseasePage,
  },
  {
    title: "Machine Learning Model",
    guard: true,
    path: "/model",
    component: ModelPage,
  },
  {
    title: "Not Found",
    guard: false,
    path: "*",
    component: () => (
      <div>
        <h1>404 Not Found</h1>
      </div>
    ),
  },
];

export function getRouteByPath(path: string): RouteInterface | undefined {
  return routes.find((route) => route.path === path);
}

export default function RouteMenu() {
  return (
    <Routes>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              route.guard ? (
                <PrivateRoute title={route.title}>
                  <route.component />
                </PrivateRoute>
              ) : (
                <route.component />
              )
            }
          />
        );
      })}
    </Routes>
  );
}
