import { configureAxe } from "jest-axe";
import { AxeResults, Result } from "axe-core";
import chalk from "chalk";
import { printReceived, matcherHint } from "jest-matcher-utils";

const toHaveNoViolations = {
  toHaveNoViolations(results: AxeResults) {
    if (typeof results.violations === "undefined") {
      throw new Error("No violations found in aXe results object");
    }

    const violations = results.violations.concat(
      results.incomplete.filter((x) => x.impact === "critical")
    );

    const reporter = (violations: Result[]) => {
      if (violations.length === 0) {
        return [];
      }

      const lineBreak = "\n\n";
      const horizontalLine = "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500";

      return violations
        .map((violation: Result) => {
          const errorBody = violation.nodes
            .map((node) => {
              const selector = node.target.join(", ");
              const expectedText =
                `Expected the HTML found at $('${selector}') to have no violations:` +
                lineBreak;
              return (
                expectedText +
                chalk.grey(node.html) +
                lineBreak +
                `Received:` +
                lineBreak +
                printReceived(`${violation.help} (${violation.id})`) +
                lineBreak +
                chalk.yellow(node.failureSummary || "") +
                lineBreak +
                (violation.helpUrl
                  ? `You can find more information on this issue here: \n${chalk.blue(
                      violation.helpUrl
                    )}`
                  : "")
              );
            })
            .join(lineBreak);

          return errorBody;
        })
        .join(lineBreak + horizontalLine + lineBreak);
    };

    const formatedViolations = reporter(violations);
    const pass = formatedViolations.length === 0;

    const message = () => {
      if (pass) {
        return;
      }
      return (
        matcherHint(".toHaveNoViolations") + "\n\n" + `${formatedViolations}`
      );
    };

    return { actual: violations, message, pass };
  },
} as jest.ExpectExtendMap;

expect.extend(toHaveNoViolations);

export default configureAxe({
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"],
  },
  reporter: "v2",
});
