"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/assets/logo";

const SHAKE_SECONDS = 0.8;
const REST_SECONDS = 2;
const MIN_VISIBLE_MS = (SHAKE_SECONDS + REST_SECONDS) * 1000;

let hasShown = false;

export function SplashLoader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => !hasShown);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const started = performance.now();
    const minVisible = reduceMotion ? 200 : MIN_VISIBLE_MS;
    let loadDone = document.readyState === "complete";

    const tryHide = () => {
      if (loadDone && performance.now() - started >= minVisible) {
        hasShown = true;
        setVisible(false);
      }
    };

    const onLoad = () => {
      loadDone = true;
      tryHide();
    };

    if (!loadDone) {
      window.addEventListener("load", onLoad);
    }

    const timeout = window.setTimeout(tryHide, minVisible);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(timeout);
    };
  }, [visible, reduceMotion]);

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="status"
          aria-busy="true"
          aria-live="polite"
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ WebkitBackdropFilter: "blur(var(--splash-blur, 32px))" }}
          initial={{
            opacity: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(32px)",
            ["--splash-blur" as string]: "32px",
          }}
          animate={{
            opacity: 1,
            backgroundColor: "rgba(0,0,0,0)",
            backdropFilter: "blur(0px)",
            ["--splash-blur" as string]: "0px",
          }}
          exit={{
            opacity: 0,
            backgroundColor: "rgba(0,0,0,0)",
            backdropFilter: "blur(0px)",
            ["--splash-blur" as string]: "0px",
          }}
          transition={{
            duration: reduceMotion ? 0.2 : SHAKE_SECONDS + REST_SECONDS,
            ease: "linear",
            opacity: { duration: 0.35, ease: "easeOut" },
          }}
        >
          <span className="sr-only">Loading Code to Play</span>
          <motion.div
            className="origin-bottom"
            animate={
              reduceMotion
                ? undefined
                : {
                    rotate: [0, 42, -3, 36, -2, 32, 0],
                    x: [0, 8, -0.8, 7, -0.5, 6, 0],
                    y: [0, -3, 2, -2.5, 1.5, -2, 0],
                  }
            }
            transition={{
              duration: SHAKE_SECONDS,
              ease: [0.45, 0.05, 0.55, 0.95],
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: REST_SECONDS,
            }}
          >
            <Logo className="size-20" />
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
