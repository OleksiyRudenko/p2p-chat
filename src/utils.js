const getNavigatorLanguage = () => {
  if (navigator.languages && navigator.languages.length) {
    return navigator.languages[0];
  } else {
    return navigator.userLanguage || navigator.language || navigator.browserLanguage || 'en-US';
  }
}

export const getRelativeDate = (date) => {
  if (!(date instanceof Date) || isNaN(date))
    return '';
  let [ day, month, year, hours, minutes ] = [ date.getDate(), date.getMonth(), date.getFullYear(), date.getHours(), date.getMinutes() ];
  const today = new Date();
  const [ tday, tmonth, tyear ] = [ today.getDate(), today.getMonth(), today.getFullYear() ];
  let dmy = '';
  const locale = getNavigatorLanguage();
  const localizedDM = date.toLocaleString(locale, { month: "long", day: 'numeric',});
  if (year !== tyear) {
    dmy = `${localizedDM} ${year}, `;
  } else if (day !== tday || month !== tmonth) {
    dmy = `${localizedDM}, `;
  }
  hours = (hours + '').padStart(2,'0');
  minutes = (minutes + '').padStart(2,'0');
  return `${dmy}${hours}:${minutes}`;
}
