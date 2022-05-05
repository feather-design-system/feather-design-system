const { createWriteStream } = require("fs");
const { SitemapStream } = require("sitemap");
const sitemapPlugin = (options) => ({
  name: "vuepress-plugin-sitemap",
  onGenerated(app) {
    console.log("Generating sitemap");
    const sitemap = new SitemapStream({ hostname: options.hostname });
    const writeStream = createWriteStream(app.dir.dest("sitemap.xml"));

    sitemap.pipe(writeStream);

    app.pages.forEach((p) => sitemap.write(p.path));
    sitemap.end();
    console.log("Generated sitemap");
  },
});
module.exports = { sitemapPlugin };
