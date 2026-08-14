"use client";

import type { ClassValue } from "clsx";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { STATIC_NAV_LINKS } from "@/components/navigations/shared/links";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { DownloadIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

type WithClassName = {
  className?: ClassValue;
};

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.08 },
  },
  exit: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 as const },
  },
};

const itemVariants = {
  hidden: { x: -40, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.28, ease: "easeOut" as const },
  },
  exit: {
    x: -40,
    opacity: 0,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

type HeaderLinksProps = WithClassName & {
  mobile?: boolean;
  onNavigate?: () => void;
};

function HeaderLinks({
  className,
  mobile = false,
  onNavigate,
}: HeaderLinksProps) {
  const pathname = usePathname();

  const links = STATIC_NAV_LINKS.map((item) => {
    const isActive = pathname === item.href;

    return (
      <Link
        key={item.href}
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        onClick={onNavigate}
        className={cn(
          "transition-colors hover:text-foreground",
          mobile ? "font-heading text-2xl" : "text-sm",
          isActive ? "font-medium text-foreground font-display text-xs" : "text-muted-foreground",
        )}
      >
        {item.label}
      </Link>
    );
  });

  if (mobile) {
    return (
      <motion.nav
        aria-label="Primary"
        className={cn("flex flex-col gap-4", className)}
        variants={listVariants}
      >
        {STATIC_NAV_LINKS.map((item, index) => (
          <motion.div key={item.href} variants={itemVariants}>
            {links[index]}
          </motion.div>
        ))}
      </motion.nav>
    );
  }

  return (
    <nav
      aria-label="Primary"
      className={cn("hidden items-center gap-6 md:flex", className)}
    >
      {links}
    </nav>
  );
}

type StaticHeaderProps = WithClassName;

export function StaticHeader({ className }: StaticHeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname) {
      return;
    }
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      if (media.matches) {
        setOpen(false);
      }
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm",
        className,
      )}
    >
      <nav className="relative z-50 mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground"
          onClick={closeMenu}
        >
          <Logo />
          <span className="font-accent text-xs sm:text-sm lg:text-base tracking-wide uppercase">
            Code to Play
          </span>
        </Link>

        <HeaderLinks onNavigate={closeMenu} />

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 md:flex">
            <ThemeToggle />
            <Button
              variant="secondary"
              nativeButton={false}
              render={<Link href="/signin" />}
              onClick={closeMenu}
            >
              Sign in
            </Button>
            <Button
              variant="default"
              nativeButton={false}
              render={<Link href="/documentation?installation" />}
              onClick={closeMenu}
            >
              <DownloadIcon className="size-4" />
              Install
            </Button>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-expanded={open}
            aria-controls="static-header-mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="static-header-mobile-menu"
            id="static-header-mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed w-full z-40 bg-background"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{
              x: "-100%",
              transition: { duration: 0.28, ease: "easeIn", delay: 0.28 },
            }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            onClick={closeMenu}
          >
            <ThemeToggle className="absolute top-4 right-4" />
            <motion.div
              className="flex h-full flex-col justify-center gap-8 px-6 pt-14"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(event) => event.stopPropagation()}
            >
              <HeaderLinks mobile onNavigate={closeMenu} />
              <motion.div
                className="flex flex-col items-start gap-3"
                variants={listVariants}
              >
                <motion.div variants={itemVariants}>
                  <Button
                    variant="secondary"
                    nativeButton={false}
                    render={<Link href="/signin" />}
                    onClick={closeMenu}
                  >
                    Sign in
                  </Button>
                </motion.div>
                <motion.div variants={itemVariants}>
                  <Button
                    variant="default"
                    nativeButton={false}
                    render={<Link href="/documentation?tab=installation" />}

                    onClick={closeMenu}
                  >
                    <DownloadIcon className="size-4" />
                    Install
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
