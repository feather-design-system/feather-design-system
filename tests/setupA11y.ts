import { expect } from "vitest";
import { toHaveNoViolations } from "jest-axe";

// Register the jest-axe matcher with Vitest's expect
expect.extend({ toHaveNoViolations } as any);

// Optionally suppress axe logging in the console during tests
// (uncomment if needed)
// (globalThis as any).axe = { configure: () => {} };
