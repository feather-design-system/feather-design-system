const getSafeId = function (str) {
  str = str || "feather";
  const random = Math.floor(Math.random() * 1000000000);
  return [str.replace(/\s+/g, "-"), Date.now(), random].join("-");
};

export { getSafeId };
