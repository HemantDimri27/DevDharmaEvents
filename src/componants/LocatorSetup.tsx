"use client";

import { useEffect } from "react";

/**
 * LocatorSetup
 * Initializes the LocatorJS runtime UI overlay in development mode only.
 * Hold Alt (Option on Mac) and click any element to jump to its source in your IDE.
 *
 * This component renders nothing in production builds.
 */
export default function LocatorSetup() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      import("@locator/runtime").then(({ default: setupLocatorUI }) => {
        setupLocatorUI();
      });
    }
  }, []);

  return null;
}
