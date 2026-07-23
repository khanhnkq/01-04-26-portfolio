/// <reference types="react/canary" />

import { ViewTransition } from "react";

const COFFEE_ROUTE_TRANSITIONS = {
  "coffee-forward": "coffee-forward",
  "coffee-back": "coffee-back",
  default: "none",
} as const;

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <ViewTransition
      enter={COFFEE_ROUTE_TRANSITIONS}
      exit={COFFEE_ROUTE_TRANSITIONS}
      default="none"
    >
      {children}
    </ViewTransition>
  );
}
