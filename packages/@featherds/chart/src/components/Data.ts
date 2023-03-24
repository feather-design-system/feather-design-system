export const getValue = (obj: object, path: string): string | number => {
  let newObj = JSON.parse(JSON.stringify(obj));

  path = path.replace(/\[(\w+)\]/g, "$1");
  path = path.replace(/^\./, "");

  const arr = path.split(".");

  while (arr.length) {
    const val = arr.shift();
    if (!!val && val in newObj) {
      newObj = newObj[val];
    }
  }
  return newObj;
};
