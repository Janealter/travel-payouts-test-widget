const getPickMeUpRuLocale = async () => {
  const locale = await import('./ru_pickmeup.json');
  return locale.default;
};

export { getPickMeUpRuLocale };
