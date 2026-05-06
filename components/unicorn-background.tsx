"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    UnicornStudio: { isInitialized: boolean; init: () => void };
  }
}

export function UnicornBackground({ projectId }: { projectId: string }) {
  useEffect(() => {
    const init = () => window.UnicornStudio?.init?.();

    if (window.UnicornStudio?.init) {
      init();
    } else {
      window.UnicornStudio = { isInitialized: false, init: () => {} };
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.11/dist/unicornStudio.umd.js";
      script.onload = init;
      (document.head || document.body).appendChild(script);
    }
  }, []);

  return (
    <div
      data-us-project={projectId}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
