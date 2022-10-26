import { AxeResults, Result, default as axeCore } from "axe-core";
import chalk from "chalk";
import { expect } from "vitest";
interface CustomMatchers<R = unknown> {
  toHaveNoViolations(): R;
}

declare global {
  namespace Vi {
    interface Assertion extends CustomMatchers {}
    interface AsymmetricMatchersContaining extends CustomMatchers {}
  }
}
expect.extend({
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
                `${violation.help} (${violation.id})` +
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
        return "";
      }
      return `${formatedViolations}`;
    };

    return { message, pass };
  },
});

function configureAxe(runnerOptions = {}) {
  return function axe(html: string | Element, additionalOptions = {}) {
    const { element, restore } = mount(html);
    const options = Object.assign({}, runnerOptions, additionalOptions);

    return new Promise((resolve) => {
      axeCore.run(element, options, (err, results) => {
        restore();
        if (err) throw err;
        resolve(results);
      });
    });
  };
}

function mount(html: string | Element) {
  if (isHTMLElement(html)) {
    const el = html as Element;
    if (document.body.contains(el)) {
      return { element: html, restore: () => undefined };
    }

    html = el.outerHTML;
  }

  if (isHTMLString(html)) {
    const str = html as string;
    const originalHTML = document.body.innerHTML;
    const restore = () => {
      document.body.innerHTML = originalHTML;
    };

    document.body.innerHTML = str;
    return { element: document.body, restore };
  }

  if (typeof html === "string") {
    throw new Error(`html parameter ("${html}") has no elements`);
  }

  throw new Error(`html parameter should be an HTML string or an HTML element`);
}

function isHTMLElement(html: string | Element) {
  return !!html && typeof html === "object" && typeof html.tagName === "string";
}

function isHTMLString(html: string | Element) {
  return typeof html === "string" && /(<([^>]+)>)/i.test(html);
}

export default configureAxe({
  runOnly: {
    type: "tag",
    values: ["wcag2a", "wcag2aa"],
  },
  reporter: "v2",
});
