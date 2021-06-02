import { formatDistance } from "date-fns";
import { formatDate } from "../utils/formatDate";
import ruLang from 'date-fns/locale/ru'


test('check formatting of the date', () => {
  var today = new Date()
    expect(formatDate(today)).toBe(formatDistance(today, new Date(), {locale: ruLang}));
  });