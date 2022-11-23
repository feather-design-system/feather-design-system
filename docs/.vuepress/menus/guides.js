export default [
  {
    name: "Guides",
    items: [{ name: "Getting Started", url: "/Guides/GettingStarted/" }].concat(
      [
        { name: "Themes", url: "/Guides/Themes/" },
        {
          name: "Typography",
          url: "/Guides/Typography/",
        },
        {
          name: "Variables",
          url: "/Guides/Variables/",
        },
        {
          name: "Spacing",
          url: "/Guides/Spacing/",
        },
        {
          name: "Form Validation",
          url: "/Guides/FormValidation/",
        },
        {
          name: "Typescript",
          url: "/Guides/Typescript/",
        },
        {
          name: "WebdriverIO",
          url: "/Guides/WDIO/",
        },
        {
          name: "App Layout",
          url: "/Guides/AppLayout/",
        },
      ].sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      })
    ),
  },
];
