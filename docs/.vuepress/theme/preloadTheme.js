import { KEY } from "./global-components/themes";

export default () => {
  const theme = JSON.parse(window.localStorage.getItem(KEY));
  if(theme) document.body.classList.add(theme._text);
};
