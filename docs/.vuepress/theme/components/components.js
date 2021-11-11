import { withBase } from "@vuepress/client";

export default [
  {
    name: "App Layout",
    url: withBase("/Components/AppLayout/"),
  },
  { name: "App Bar", url: withBase("/Components/AppBar/") },
  {
    name: "Navigation Rail",
    url: withBase("/Components/NavigationRail/"),
  },
  { name: "Grid", url: withBase("/Components/Grid/") },
  { name: "Footer", url: withBase("/Components/Footer/") },

  { name: "Button", url: withBase("/Components/Button/") },
  { name: "Back Button", url: withBase("/Components/BackButton/") },
  { name: "Input", url: withBase("/Components/Input/") },
  { name: "Textarea", url: withBase("/Components/Textarea/") },
  { name: "Checkbox", url: withBase("/Components/Checkbox/") },
  { name: "Radio Button", url: withBase("/Components/Radio/") },
  {
    name: "Autocomplete",
    url: withBase("/Components/Autocomplete/"),
  },
  {
    name: "Date Input",
    url: withBase("/Components/DateInput/"),
  },
  {
    name: "Protected Input",
    url: withBase("/Components/ProtectedInput/"),
  },
  { name: "Select", url: withBase("/Components/Select/") },

  { name: "Drawer", url: withBase("/Components/Drawer/") },
  { name: "Dialog", url: withBase("/Components/Dialog/") },
  {
    name: "Dropdown",
    url: withBase("/Components/Dropdown/"),
  },
  { name: "Mega Menu", url: withBase("/Components/Megamenu/") },

  { name: "Table", url: withBase("/Components/Table/") },
  {
    name: "Pagination",
    url: withBase("/Components/Pagination/"),
  },
  {
    name: "Pdf Viewer",
    url: withBase("/Components/PdfViewer/"),
  },
  { name: "Chips", url: withBase("/Components/Chips/") },

  { name: "Tabs", url: withBase("/Components/Tabs/") },
  {
    name: "List",
    url: withBase("/Components/List/"),
  },
  {
    name: "Expansion",
    url: withBase("/Components/Expansion/"),
  },

  { name: "Progress", url: withBase("/Components/Progress/") },
  { name: "Icon", url: withBase("/Components/Icon/") },
  {
    name: "Icon Button",
    url: withBase("/Components/IconButton/"),
  },

  { name: "Badge", url: withBase("/Components/Badge/") },
].sort((a, b) => {
  if (a.name > b.name) {
    return 1;
  }
  if (a.name < b.name) {
    return -1;
  }
  return 0;
});
