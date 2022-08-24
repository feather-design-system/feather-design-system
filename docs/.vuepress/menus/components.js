export default [
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
          image: "/assets/components/APP_LAYOUT@2x.png",
        },
        {
          name: "App Rail",
          url: "/Components/AppRail/",
          image: "/assets/components/APP_RAIL@2x.png",
        },
        {
          name: "App Bar",
          url: "/Components/AppBar/",
          image: "/assets/components/APP_BAR@2x.png",
        },
        {
          name: "Navigation Rail",
          url: "/Components/NavigationRail/",
          image: "/assets/components/NAV_RAIL@2x.png",
        },
        {
          name: "Footer",
          url: "/Components/Footer/",
          image: "/assets/components/FOOTER@2x.png",
        },

        {
          name: "Button",
          url: "/Components/Button/",
          image: "/assets/components/BUTTONS@2x.png",
        },
        {
          name: "Back Button",
          url: "/Components/BackButton/",
          image: "/assets/components/BACK_BUTTON@2x.png",
        },
        {
          name: "Input",
          url: "/Components/Input/",
          image: "/assets/components/TEXT_FIELD@2x.png",
        },
        {
          name: "Textarea",
          url: "/Components/Textarea/",
          image: "/assets/components/TEXT_FIELD_AREA@2x.png",
        },
        {
          name: "Checkbox",
          url: "/Components/Checkbox/",
          image: "/assets/components/CHECKBOXES@2x.png",
        },
        {
          name: "Radio",
          url: "/Components/Radio/",
          image: "/assets/components/RADIO_BUTTONS@2x.png",
        },
        {
          name: "Autocomplete",
          url: "/Components/Autocomplete/",
          image: "/assets/components/AUTOCOMPLETE@2x.png",
        },
        {
          name: "Date Input",
          url: "/Components/DateInput/",
          image: "/assets/components/DATE_PICKER@2x.png",
        },
        {
          name: "Protected Input",
          url: "/Components/ProtectedInput/",
          image: "/assets/components/PROTECTED_INPUT@2x.png",
        },
        {
          name: "Select",
          url: "/Components/Select/",
          image: "/assets/components/SELECT@2x.png",
        },
        {
          name: "Snackbar",
          url: "/Components/Snackbar/",
          image: "/assets/components/SNACKBAR@2x.png",
        },
        {
          name: "Drawer",
          url: "/Components/Drawer/",
          image: "/assets/components/DRAWERS@2x.png",
        },
        {
          name: "Dialog",
          url: "/Components/Dialog/",
          image: "/assets/components/DIALOGS@2x.png",
        },
        {
          name: "Dropdown",
          url: "/Components/Dropdown/",
          image: "/assets/components/MENUS@2x.png",
        },
        {
          name: "Mega Menu",
          url: "/Components/Megamenu/",
          image: "/assets/components/MEGA_MENU@2x.png",
        },
        {
          name: "Table",
          url: "/Components/Table/",
          image: "/assets/components/DATA_TABLES@2x.png",
        },
        {
          name: "Pagination",
          url: "/Components/Pagination/",
          image: "/assets/components/PAGINATION@2x.png",
        },
        {
          name: "PDF Viewer",
          url: "/Components/PdfViewer/",
          image: "/assets/components/PDF_VIEWER@2x.png",
        },
        {
          name: "Chips",
          url: "/Components/Chips/",
          image: "/assets/components/CHIPS@2x.png",
        },
        {
          name: "Tabs",
          url: "/Components/Tabs/",
          image: "/assets/components/TABS@2x.png",
        },
        {
          name: "List",
          url: "/Components/List/",
          image: "/assets/components/LISTS@2x.png",
        },
        {
          name: "Expansion",
          url: "/Components/Expansion/",
          image: "/assets/components/EXPANSION_PANELS@2x.png",
        },

        {
          name: "Progress",
          url: "/Components/Progress/",
          image: "/assets/components/PROGRESS_INDICATOR@2x.png",
        },
        {
          name: "Icon",
          url: "/Components/Icon/",
          image: "/assets/components/ICON@2x.png",
        },
        {
          name: "Badge",
          url: "/Components/Badge/",
          image: "/assets/components/BADGES@2x.png",
        },

        {
          name: "Tooltip",
          url: "/Components/Tooltip/",
          image: "/assets/components/TOOLTIP@2x.png",
        },
        {
          name: "Card",
          url: "/Components/Card/",
          image: "/assets/components/CARDS@2x.png",
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
