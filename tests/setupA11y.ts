import { expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";

// Register the jest-axe matcher with Vitest's expect
expect.extend({ toHaveNoViolations } as any);

// Silence frequently-occurring, non-actionable warnings in tests so output stays readable.
// We filter Vue runtime warnings about event handler prop types and FakeTimers messages.
const _origWarn = console.warn.bind(console);
const _origError = console.error.bind(console);

function isNoiseMessage(msg: any) {
  if (typeof msg !== "string") return false;
  // Vue runtime warning about wrong type passed as event handler
  if (msg.includes("Wrong type passed as event handler to")) return true;
  // FakeTimers cleanup warnings
  if (msg.startsWith("FakeTimers:")) return true;
  return false;
}

console.warn = (...args: any[]) => {
  try {
    if (args.length && isNoiseMessage(args[0])) return;
  } catch (e) {
    // fall through to original
  }
  _origWarn(...args);
};

console.error = (...args: any[]) => {
  try {
    if (args.length && isNoiseMessage(args[0])) return;
  } catch (e) {
    // fall through to original
  }
  _origError(...args);
};

// Optionally suppress axe logging in the console during tests
// (uncomment if needed)
// (globalThis as any).axe = { configure: () => {} };
