const objectAssign = assign
const defaultLocale = RcDefaultLocale

RcPickerMixin = {
  getLocale() {
    // 统一合并为完整的 Locale
    let locale = objectAssign({}, defaultLocale, this.props.locale);
    locale.lang = objectAssign({}, defaultLocale.lang, this.props.locale.lang);
    return locale;
  },

  getFormatter() {
    const formats = this.formats = this.formats || {};
    let format = this.props.format;
    // Remove time format text when has time-picker in calendar
    if (this.props.showTime) {
      format = format.replace('HH:mm:ss', '');
    }
    if (formats[format]) {
      return formats[format];
    }
    formats[format] = new DateTimeFormat(format, this.getLocale().lang.format);
    return formats[format];
  },

  parseDateFromValue(value) {
    if (value) {
      if (typeof value === 'string') {
        return this.getFormatter().parse(value, { locale: this.getLocale() });
      } else if (value instanceof Date) {
        let date = new GregorianCalendar(this.getLocale());
        date.setTime(+value);
        return date;
      }
    }
    return value;
  },

  // remove input readonly warning
  handleInputChange() {
  },
  toggleOpen(e) {
    this.setState({
      open: e.open
    });
  },
};
