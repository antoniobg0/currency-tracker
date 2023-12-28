const formatter = (currency: "USD", locale: "en-US" = 'en-US') =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  });

export default formatter;
