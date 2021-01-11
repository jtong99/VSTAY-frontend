const truncate = (txt, length) => {
  if (!txt) {
    return null;
  }
  return txt.length > length ? `${txt.substr(0, length - 1)}...` : txt;
};

module.exports = { truncate };
