const path = require("path");
const fs = require("fs-extra");
module.exports = function demo(md) {
  md.block.ruler.before(
    "table",
    "demo",
    function (state, startLine, endLine, silent) {
      let pos = state.bMarks[startLine] + state.tShift[startLine];
      let max = state.eMarks[startLine];
      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) {
        return false;
      }

      const ch = state.src.charCodeAt(pos);
      if (ch !== 0x40 /*@ */) {
        return false;
      }

      // scan marker length
      const mem = pos;
      pos = state.skipChars(pos, ch);

      let len = pos - mem;

      if (len < 3) {
        return false;
      }

      if (silent) {
        return true;
      }

      //get to the end of the string
      max = state.skipSpacesBack(max, pos);

      const componentName = state.src.slice(pos, max).trim();

      const fileName = componentName.replace("-", "/"); //Button-ExampleButtonIcon
      const file = path.join(
        process.cwd(),
        `/docs/.vuepress/components/${fileName}.vue`
      );

      state.line = startLine + 1;

      let token = state.push("demo_open", "FeatherDemo", 1);
      token.attrs = [["component", componentName]];
      token.markup = String.fromCharCode(ch);
      token.map = [startLine, startLine + 2];

      token = state.push("fence", "code", 0);
      token.info = "vue";
      token.content = fs.readFileSync(path.resolve(file), "utf8");
      token.markup = "```";
      token.map = [startLine, startLine + 1];

      token = state.push("demo_close", "FeatherDemo", -1);
      token.markup = String.fromCharCode(ch);

      // token         = state.push('demo', 'FeatherDemo', 0);
      // token.attrs  = [ [ 'component', componentName ] ];
      // token.content = [`<<< @/docs/.vuepress/components/${fileName}.vue`]
      // token.map     = [ startLine, state.line ];
      // token.markup="@";

      return true;
    }
  );
};
