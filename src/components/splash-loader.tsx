"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { Logo } from "@/components/assets/logo";

const SHAKE_SECONDS = 0.3;
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
          initial={{
            opacity: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
          }}
          animate={{
            opacity: 1,
            backgroundColor: "rgba(0,0,0,0)",
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
          }}
          exit={{
            opacity: 0,
            backgroundColor: "rgba(0,0,0,0)",
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
          }}
          transition={{
            backgroundColor: {
              duration: reduceMotion ? 0.2 : SHAKE_SECONDS + REST_SECONDS,
              ease: "linear",
            },
            backdropFilter: {
              duration: reduceMotion ? 0.2 : SHAKE_SECONDS + REST_SECONDS,
              ease: "linear",
            },
            WebkitBackdropFilter: {
              duration: reduceMotion ? 0.2 : SHAKE_SECONDS + REST_SECONDS,
              ease: "linear",
            },
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
                    rotate: [0, 12, -4, 11, -3, 9, 0],
                    x: [0, 3, -1, 2.5, -0.8, 2, 0],
                    y: [0, -1.5, 1, -1, 0.8, -1, 0],
                  }
            }
            transition={{
              duration: SHAKE_SECONDS,
              ease: "easeInOut",
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
