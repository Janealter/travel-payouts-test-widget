import { getUrlParam } from './url-params';

const backgroundColor = getUrlParam('bg-color') || '#4A90E2';
const fontColor = getUrlParam('font-color') || '#FFFFFF';
const buttonColor = getUrlParam('button-color') || '#F5A623';

document.body.style.backgroundColor = backgroundColor;
document.body.style.color = fontColor;
document.querySelectorAll('button').forEach(btn => {
  btn.style.color = fontColor;
  btn.style.backgroundColor = buttonColor;
});
