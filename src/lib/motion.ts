export const copyReveal = {
  hidden: { y: -30, filter: "blur(12px)", opacity: 0 },
  visible: {
    y: 0,
    filter: "blur(0px)",
    opacity: 1,
    transition: { duration: 0.7, ease: "easeOut" as const },
  },
};

export const copyRevealStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14 } },
};
