// Make jest-axe's `toHaveNoViolations` available to both Vitest and Chai assertion types

import "vitest";
import "chai";

declare module "vitest" {
  namespace Vi {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Assertion<T = any> {
      toHaveNoViolations(): any;
    }
  }
}

declare global {
  namespace Chai {
    interface Assertion {
      toHaveNoViolations(): any;
    }
  }
}
