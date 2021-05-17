import { getUrlParam } from './url-params';

const setupColors = () => {
  const backgroundColor = getUrlParam('bg-color');
  const fontColor = getUrlParam('font-color');
  const buttonColor = getUrlParam('button-color');

  const root = document.documentElement;

  if (backgroundColor) root.style.setProperty('--bg-color', backgroundColor);
  if (fontColor) root.style.setProperty('--font-color', fontColor);
  if (buttonColor) root.style.setProperty('--button-color', buttonColor);
};

export { setupColors };
