import { UNLOCK_LINES, UNLOCK_PLAYS } from "@/lib/extension";
import {
  FREE_GAMES,
  formatUsd,
  PLAY_SPACE_COOLDOWN_HOURS,
  PLAY_SPACE_MAX,
  PLAY_SPACE_MIN,
  PLAY_SPACE_PRICE,
  PRO_EXTRA_PLAY_SPACES,
  PRO_MONTHLY,
  PRO_MONTHLY_WAS,
  PRO_UPCOMING_GAMES,
  PRO_YEARLY,
} from "@/lib/pricing";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const HOME_FAQS: readonly FaqItem[] = [
  {
    id: "what",
    question: "What is Code to Play?",
    answer: `Code to Play is a VS Code extension that unlocks in-editor mini-games as you write real code. Meaningful lines count toward unlocks — comments, blanks, and brace-only lines do not. By default, ${UNLOCK_LINES} lines unlock ${UNLOCK_PLAYS} plays, shared across ${FREE_GAMES.join(" and ")}. High scores and stats stay on your machine.`,
  },
  {
    id: "benefits",
    question: "What are the benefits?",
    answer:
      "You earn breaks by doing the work you already came to do. The status bar shows progress toward the next plays, so you have a finish line without leaving the file. Games open in the editor, so you skip the phone spiral and keep your tabs, context, and cursor where they were.",
  },
  {
    id: "burnout",
    question: "How does it help prevent burnout?",
    answer:
      "Burnout sneaks in when every pause feels like slacking, or when a quick check on your phone turns into twenty minutes. Code to Play makes rest part of the loop: write code, unlock plays, take a short break in the editor, then return to the same file. The break is the reward for shipping lines, not a detour from them.",
  },
  {
    id: "pro",
    question: "What's included in Pro?",
    answer: `Pro includes everything in Free, plus ${PRO_EXTRA_PLAY_SPACES} extra play spaces and ${PRO_UPCOMING_GAMES}. It’s ${formatUsd(PRO_MONTHLY)}/month (${formatUsd(PRO_MONTHLY_WAS)} marked down), or 15% off billed yearly at ${formatUsd(PRO_YEARLY)}. Play spaces are a separate one-time add-on at ${formatUsd(PLAY_SPACE_PRICE)} each (${PLAY_SPACE_MIN}–${PLAY_SPACE_MAX}), with a ${PLAY_SPACE_COOLDOWN_HOURS}-hour cooldown after a purchase so focus stays on writing code. Checkout is not live yet.`,
  },
];

export const DOCS_FAQS: readonly FaqItem[] = [
  ...HOME_FAQS,
  {
    id: "unlock",
    question: "How do I unlock plays?",
    answer: `Write real code in a supported file. The status bar shows progress while you are locked (for example, 450/${UNLOCK_LINES} lines). When you hit ${UNLOCK_LINES} meaningful lines, you get ${UNLOCK_PLAYS} plays, shared across every game. Open the Code to Play view in the Activity Bar, pick a game, and spend a play.`,
  },
  {
    id: "counted",
    question: "What counts as a meaningful line?",
    answer:
      "Function and class declarations, assignments, control flow, method calls, and import or export statements. Comments, JSDoc, blank lines, and lines that are only braces are skipped.",
  },
  {
    id: "languages",
    question: "Which languages are tracked?",
    answer:
      "JavaScript, TypeScript, Python, Java, C, C++, C#, Go, Rust, PHP, Ruby, Swift, Kotlin, and more. If a file type is not tracked, the status bar will not move for that file.",
  },
  {
    id: "offline",
    question: "Does it work offline?",
    answer:
      "Yes. Games, scoring, and unlocks all run locally in the editor. You do not need an account or a network connection to play. Sign in from the activity bar is optional and is how you will link Pro later.",
  },
  {
    id: "play-spaces",
    question: "What are play spaces?",
    answer: `Play spaces are extra room to take a break when you have already used your earned plays. Pro adds ${PRO_EXTRA_PLAY_SPACES} spaces. You can also buy ${PLAY_SPACE_MIN}–${PLAY_SPACE_MAX} spaces as a one-time add-on. After a purchase, the next buy is locked for ${PLAY_SPACE_COOLDOWN_HOURS} hours so the loop stays write code → play → write more.`,
  },
  {
    id: "privacy",
    question: "Where do high scores and stats live?",
    answer:
      "Locally in the editor by default. Signing in does not upload plays or scores. If you opt in on the dashboard, the signed-in extension can share a snapshot (lines, plays, high scores) so you can see a breakdown on the web. Turn it off to stop uploads and delete that snapshot.",
  },
  {
    id: "account",
    question: "Do I need an account?",
    answer:
      "No. Free games, unlocks, and high scores work locally with no account. Sign in from the Code to Play activity bar when you want to link GitHub — that is how Pro will attach later. Signing in does not upload plays or scores unless you opt in on the Analytics page.",
  },
  {
    id: "editors",
    question: "Which editors are supported?",
    answer:
      "VS Code from the Marketplace, and VS Code forks such as Cursor from Open VSX. If the editor can install VS Code extensions, Code to Play can run there.",
  },
];
