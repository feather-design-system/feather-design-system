module.exports = [
  {
    name: "Guides",
    items: [
      { name: "Getting Started", url: "/Components/GettingStarted/" },
      { name: "Themes", url: "/Components/Themes/" },
      {
        name: "Typography",
        url: "/Components/Typography/",
      },
      {
        name: "Variables",
        url: "/Components/Variables/",
      },
      {
        name: "Spacing",
        url: "/Components/Spacing/",
      },
      {
        name: "Form Validation",
        url: "/Components/FormValidation/",
      },
      {
        name: "Typescript",
        url: "/Components/Typescript/",
      },
    ],
  },
  {
    name: "Components",
    components: true,
    items: [
      {
        name: "Overview",
        url: "/Components/",
      },
    ].concat(
      [
        {
          name: "App Layout",
          url: "/Components/AppLayout/",
          image: "/assets/components/AppLayout.png",
        },
        {
          name: "App Bar",
          url: "/Components/AppBar/",
          image: "/assets/components/AppBar.png",
        },
        {
          name: "Navigation Rail",
          url: "/Components/NavigationRail/",
          image: "/assets/components/NavigationRail.png",
        },
        {
          name: "Footer",
          url: "/Components/Footer/",
          image: "/assets/components/Footer.png",
        },

        {
          name: "Button",
          url: "/Components/Button/",
          image: "/assets/components/Button.png",
        },
        {
          name: "Back Button",
          url: "/Components/BackButton/",
          image: "/assets/components/BackButton.png",
        },
        {
          name: "Input",
          url: "/Components/Input/",
          image: "/assets/components/Input.png",
        },
        {
          name: "Textarea",
          url: "/Components/Textarea/",
          image: "/assets/components/Textarea.png",
        },
        {
          name: "Checkbox",
          url: "/Components/Checkbox/",
          image: "/assets/components/Checkbox.png",
        },
        {
          name: "Radio",
          url: "/Components/Radio/",
          image: "/assets/components/RadioButtons.png",
        },
        {
          name: "Autocomplete",
          url: "/Components/Autocomplete/",
          image: "/assets/components/Autocomplete.png",
        },
        {
          name: "Date Input",
          url: "/Components/DateInput/",
          image: "/assets/components/DateInput.png",
        },
        {
          name: "Protected Input",
          url: "/Components/ProtectedInput/",
          image: "/assets/components/ProtectedInput.png",
        },
        {
          name: "Select",
          url: "/Components/Select/",
          image: "/assets/components/Select.png",
        },
        {
          name: "Snackbar",
          url: "/Components/Snackbar/",
          image: "/assets/components/Snackbar.png",
        },
        {
          name: "Drawer",
          url: "/Components/Drawer/",
          image: "/assets/components/Drawer.png",
        },
        {
          name: "Dialog",
          url: "/Components/Dialog/",
          image: "/assets/components/Dialog.png",
        },
        {
          name: "Dropdown",
          url: "/Components/Dropdown/",
          image: "/assets/components/Dropdown.png",
        },
        {
          name: "Mega Menu",
          url: "/Components/Megamenu/",
          image: "/assets/components/MegaMenu.png",
        },
        {
          name: "Table",
          url: "/Components/Table/",
          image: "/assets/components/Table.png",
        },
        {
          name: "Pagination",
          url: "/Components/Pagination/",
          image: "/assets/components/Pagination.png",
        },
        {
          name: "PDF Viewer",
          url: "/Components/PdfViewer/",
          image: "/assets/components/PdfViewer.png",
        },
        {
          name: "Chips",
          url: "/Components/Chips/",
          image: "/assets/components/Chips.png",
        },
        {
          name: "Tabs",
          url: "/Components/Tabs/",
          image: "/assets/components/Tabs.png",
        },
        {
          name: "List",
          url: "/Components/List/",
          image: "/assets/components/List.png",
        },
        {
          name: "Expansion",
          url: "/Components/Expansion/",
          image: "/assets/components/ExpansionPanel.png",
        },

        {
          name: "Progress",
          url: "/Components/Progress/",
          image: "/assets/components/Progress.png",
        },
        {
          name: "Icon",
          url: "/Components/Icon/",
          image: "/assets/components/Icon.png",
        },
        {
          name: "Badge",
          url: "/Components/Badge/",
          image: "/assets/components/Badges.png",
        },

        {
          name: "Tooltip",
          url: "/Components/Tooltip/",
          image: "/assets/components/Tooltip.png",
        },
        {
          name: "Card",
          url: "/Components/Card/",
          image: "/assets/components/Card.png",
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
