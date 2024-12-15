import React, { Component } from "react";
import RefractionIndex from "../view/refraction/RefractionIndex";
import CreateRefraction from "../view/refraction/CreateRefraction";

type RouteConfig = {
  navPath: boolean;
  path: string;
  label: string;
  accessLevel: string[];
  element: React.ElementType; // Use React.ComponentType to accept any component
};

export const refactorRoutes: RouteConfig[] = [
  {
    navPath: true,
    path: "/",
    label: "refraction",
    accessLevel: ["admin", "super-admin", "user"],
    element: CreateRefraction, // Pass the component itself, not the JSX
  },
  {
    navPath: true,
    path: "/Refraction",
    label: "Refraction",
    accessLevel: ["admin", "super-admin", "user"],
    element: RefractionIndex, // Pass the component itself, not the JSX
  },
  {
    navPath: true,
    path: "/Refraction/:id",
    label: "Refraction",
    accessLevel: ["admin", "super-admin", "user"],
    element: RefractionIndex, // Pass the component itself, not the JSX
  },
];
