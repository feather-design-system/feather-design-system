// Augment Vitest expect with jest-axe matcher typings
import "vitest";

declare module "vitest" {
  // extend the types for expect assertions
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Assertion<T = any> {
      toHaveNoViolations(): any;
    }
  }
}
