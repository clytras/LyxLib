import Dinero from 'dinero.js';
import mrp from '@app/mrp';

export default function(...args) {
  if('localization' in (window || global || {})) {
    return Dinero(...args).setLocale(mrp.localization.currencyLocale);
  }
  return Dinero(...args);
}
