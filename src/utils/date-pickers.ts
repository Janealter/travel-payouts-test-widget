// @ts-expect-error PickMeUp doesn't have typing yet
import pickMeUp from 'pickmeup';
import 'pickmeup/css/pickmeup.css';
import '../styles/pickmeup.css';

import { getPickMeUpRuLocale } from '../i18n';

const lang = document.documentElement.lang;

const pickMeUpConf = {
  default_date: false,
  format: 'd.m.Y',
  locale: lang,
  flat: true,
  min: Date.now(),
  // Ref: https://github.com/nazar-pc/PickMeUp/blob/669c9e3204589d60b5074aff5733a3eee7ee21b1/js/pickmeup.js#L1359
  instance_template: function (options: any) {
    return '<div class="pmu-instance">' +
      '<nav>' +
      '<button class="pmu-prev pmu-button">' + options.prev + '</button>' +
      '<button class="pmu-month pmu-button"></button>' +
      '<button class="pmu-next pmu-button">' + options.next + '</button>' +
      '</nav>' +
      '</div>';
  },
  // Ref: https://github.com/nazar-pc/PickMeUp/blob/669c9e3204589d60b5074aff5733a3eee7ee21b1/js/pickmeup.js#L1380
  instance_content_template : function (elements: HTMLElement[], container_class_name: string) {
    const root_element = document.createElement('div');
    root_element.classList.add(container_class_name);
    
    const days_of_week = container_class_name === 'pmu-days' && getDaysOfWeek.bind(this)(elements.length);

    for (let i = 0; i < elements.length; ++i) {
      elements[i].classList.add('pmu-button');

      // Put day of month in separate element
      if (container_class_name === 'pmu-days') {
        const day_of_month = document.createElement('span');
        day_of_month.innerText = elements[i].innerText;
        elements[i].innerText = '';
        elements[i].appendChild(day_of_month);
      }

      if (days_of_week) elements[i].appendChild(days_of_week[i]);

      root_element.appendChild(elements[i]);
    }

    return root_element;
  },
};

function getDaysOfWeek (length: number) {
  // @ts-expect-error PickMeUp doesn't have typing yet
  const days_of_week = this.locales[this.locale].daysMin.slice();
  // If Monday is the first day of the week
  // @ts-expect-error PickMeUp doesn't have typing yet
  if (this.first_day) {
    days_of_week.push(days_of_week.shift());
  }

  const days_of_week_elements: HTMLSpanElement[] = [];
  let dayIndex = 0;
  for (let i = 0; i < length; i++) {
    const day_of_week = document.createElement('span');
    day_of_week.textContent = days_of_week[dayIndex];
    days_of_week_elements.push(day_of_week);

    dayIndex = dayIndex === 6 ? 0 : dayIndex += 1;
  }

  return days_of_week_elements;
}

const setupDatePickers = async () => {
  if (lang === 'ru') {
    pickMeUp.defaults.locales['ru'] = await getPickMeUpRuLocale();
  }

  const datePickerElement = document.querySelector('.date-picker') as HTMLDivElement | null;
  const departDateInput = document.querySelector('.input[name=depart-date]') as HTMLInputElement | null;
  const returnDateInput = document.querySelector('.input[name=return-date]') as HTMLInputElement | null;
  const departDatePickerButton = document.querySelector('.date-picker-button--depart') as HTMLButtonElement | null;
  const returnDatePickerButton = document.querySelector('.date-picker-button--return') as HTMLButtonElement | null;

  if (
    !datePickerElement ||
    !departDateInput ||
    !returnDateInput ||
    !departDatePickerButton ||
    !returnDatePickerButton
  ) {
    throw Error('Some HTML elements for date picker are missing');
  }

  const pickmeup = pickMeUp(datePickerElement, pickMeUpConf);
  
  const datePickerElements: Array<[HTMLButtonElement, HTMLInputElement]> = [
    [departDatePickerButton, departDateInput],
    [returnDatePickerButton, returnDateInput],
  ];

  datePickerElements.forEach(([button, input]) => {
    const onDateChange = (e: any) => {
      input.value = e.detail.formatted_date;
      datePickerElement.style.display = 'none';
      datePickerElement.removeEventListener('pickmeup-change', onDateChange);
    };

    button.addEventListener('click', (e) => {
      e.stopPropagation();

      datePickerElement.addEventListener('pickmeup-change', onDateChange);

      datePickerElement.style.display = 'block';
      pickmeup.set_date(input.value);
    });
  });
};

export { setupDatePickers };
