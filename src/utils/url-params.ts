const getUrlParam = (name: string): string | null => {
  const urlParams = new URLSearchParams(window.location.search);

  return urlParams.get(name);
};

export { getUrlParam };
