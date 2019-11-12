import XRegExp from 'xregexp';

const chars = {
  en: ['A', 'a', 'B', 'b', 'C', 'c', 'D', 'd', 'E', 'e', 'F', 'f', 'G', 'g', 'H', 'h', 'I', 'i', 'J', 'j', 'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o', 'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't', 'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z'],
  el: ['Α', 'Ά', 'α', 'ά', 'Β', 'β', 'Γ', 'γ', 'Δ', 'δ', 'Ε', 'Έ', 'ε', 'έ', 'Ζ', 'ζ', 'Η', 'Ή', 'η', 'ή', 'Θ', 'θ', 'Ι', 'Ί', 'Ϊ', 'ι', 'ί', 'ϊ', 'ΐ', 'Κ', 'κ', 'Λ', 'λ', 'Μ', 'μ', 'Ν', 'ν', 'Ξ', 'ξ', 'Ο', 'Ό', 'ο', 'ό', 'Π', 'π', 'Ρ', 'ρ', 'Σ', 'σ', 'Τ', 'τ', 'Υ', 'Ύ', 'Ϋ', 'υ', 'ύ', 'ϋ', 'ΰ', 'Φ', 'φ', 'Χ', 'χ', 'Ψ', 'ψ', 'Ώ', 'Ω', 'ω', 'ώ'],
  fixEnEl: {
    'A': 'Α', 'B': 'Β', 'E': 'Ε', 'F': 'Φ', 'G': 'Γ', 'H': 'Η', 'I': 'Ι', 'K': 'Κ', 'L': 'Λ', 'M': 'Μ', 'N': 'Ν', 'O': 'Ο', 'P': 'Ρ', 'T': 'Τ', 'X': 'Χ', 'Y': 'Υ', 'Z': 'Ζ',
    'a': 'α', 'b': 'β', 'd': 'δ', 'e': 'ε', 'f': 'φ', 'g': 'γ', 'h': 'η', 'i': 'ι', 'k': 'κ', 'l': 'λ', 'm': 'μ', 'n': 'ν', 'o': 'ο', 's': 'σ', 't': 'τ', 'u': 'υ', 'x': 'χ', 'y': 'υ', 'z': 'ζ'
  }
}

export const untone = text => {
  Object.entries({
    'Ά':'Α', 'Έ':'Ε', 'Ή':'Η', 'Ί':'Ι', 'Ό':'Ο', 'Ύ':'Υ', 'Ώ':'Ω', 'ά':'α', 'έ':'ε', 'ή':'η', 'ί':'ι', 'ό':'ο', 'ύ':'υ', 'ώ':'ω'
  }).forEach(entry => {
    text = text.replace(new RegExp(entry[0], 'g'), entry[1]);
  });
  return text;
}

export const fullUntone = text => {
  Object.entries({
    'Ά':'Α', 'Έ':'Ε', 'Ή':'Η', 'Ί':'Ι', 'Ϊ':'Ι', 'Ό':'Ο', 'Ύ':'Υ', 'Ϋ':'Υ', 'Ώ':'Ω', 'ά':'α', 'έ':'ε', 'ή':'η', 'ί':'ι', 'ΐ':'ι', 'ϊ':'ι', 'ό':'ο', 'ύ':'υ', 'ϋ':'υ', 'ΰ':'υ', 'ώ':'ω'
  }).forEach((entry) => {
    text = text.replace(new RegExp(entry[0], 'g'), entry[1]);
  });
  return text;
}

export const normalizeGreek = text => text.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
export const removeAccent = (text, overrides = {}) => {
  const chars = {
    'ου': 'ou', 'ού': 'ou', 'αυ': 'av', 'άυ': 'av', 'ευ': 'ef', 'έυ': 'ef',  
    'ΟΥ': 'OU', 'ΟΎ': 'OU', 'ΑΥ': 'AV', 'ΆΥ': 'AV', 'ΕΥ': 'EF', 'ΈΥ': 'EF',
    'Ου': 'Ou', 'Ού': 'Ou', 'Αυ': 'Av', 'Άυ': 'Av', 'Ευ': 'Ef', 'Έυ': 'Ef',
    'Α': 'A', 'Ά': 'A', 'Β': 'B', 'Γ': 'G', 'Δ': 'D', 'Ε': 'E', 'Έ': 'E', 'Ζ': 'Z', 'Η': 'H', 'Ή': 'H', 'Θ': 'TH', 'Ι': 'I', 'Ί': 'I', 'Ϊ': 'I', 'Κ': 'K', 'Λ': 'L', 'Μ': 'M', 'Ν': 'N', 'Ξ': 'KS', 'Ο': 'O', 'Ό': 'O', 'Π': 'P', 'Ρ': 'R', 'Σ': 'S', 'Τ': 'T', 'Υ': 'Y', 'Ύ': 'Y', 'Ϋ': 'Y', 'Φ': 'F', 'Χ': 'X', 'Ψ': 'PS', 'Ω': 'W', 'Ώ': 'W', 'α': 'a', 'ά': 'a', 'β': 'b', 'γ': 'g', 'δ': 'd', 'ε': 'e', 'έ': 'e', 'ζ': 'z', 'η': 'h', 'ή': 'h', 'θ': 'th', 'ι': 'i', 'ί': 'i', 'ϊ': 'i', 'ΐ': 'i', 'κ': 'k', 'λ': 'l', 'μ': 'm', 'ν': 'n', 'ξ': 'ks', 'ο': 'o', 'ό': 'o', 'π': 'p', 'ρ': 'r', 'σ': 's', 'ς': 's', 'τ': 't', 'υ': 'y', 'ύ': 'y', 'ϋ': 'y', 'φ': 'f', 'χ': 'x', 'ψ': 'ps', 'ω': 'w', 'ώ': 'w', 'À': 'A', 'Á': 'A', 'Â': 'A', 'Ã': 'A', 'Ä': 'A', 'Å': 'A', 'Æ': 'AE', 'Ç': 'C', 'È': 'E', 'É': 'E', 'Ê': 'E', 'Ë': 'E', 'Ì': 'I', 'Í': 'I', 'Î': 'I', 'Ï': 'I', 'Ð': 'D', 'Ñ': 'N', 'Ò': 'O', 'Ó': 'O', 'Ô': 'O', 'Õ': 'O', 'Ö': 'O', 'Ø': 'O', 'Ù': 'U', 'Ú': 'U', 'Û': 'U', 'Ü': 'U', 'Ý': 'Y', 'ß': 's', 'à': 'a', 'á': 'a', 'â': 'a', 'ã': 'a', 'ä': 'a', 'å': 'a', 'æ': 'ae', 'ç': 'c', 'è': 'e', 'é': 'e', 'ê': 'e', 'ë': 'e', 'ì': 'i', 'í': 'i', 'î': 'i', 'ï': 'i', 'ñ': 'n', 'ò': 'o', 'ó': 'o', 'ô': 'o', 'õ': 'o', 'ö': 'o', 'ø': 'o', 'ù': 'u', 'ú': 'u', 'û': 'u', 'ü': 'u', 'ý': 'y', 'ÿ': 'y', 'Ā': 'A', 'ā': 'a', 'Ă': 'A', 'ă': 'a', 'Ą': 'A', 'ą': 'a', 'Ć': 'C', 'ć': 'c', 'Ĉ': 'C', 'ĉ': 'c', 'Ċ': 'C', 'ċ': 'c', 'Č': 'C', 'č': 'c', 'Ď': 'D', 'ď': 'd', 'Đ': 'D', 'đ': 'd', 'Ē': 'E', 'ē': 'e', 'Ĕ': 'E', 'ĕ': 'e', 'Ė': 'E', 'ė': 'e', 'Ę': 'E', 'ę': 'e', 'Ě': 'E', 'ě': 'e', 'Ĝ': 'G', 'ĝ': 'g', 'Ğ': 'G', 'ğ': 'g', 'Ġ': 'G', 'ġ': 'g', 'Ģ': 'G', 'ģ': 'g', 'Ĥ': 'H', 'ĥ': 'h', 'Ħ': 'H', 'ħ': 'h', 'Ĩ': 'I', 'ĩ': 'i', 'Ī': 'I', 'ī': 'i', 'Ĭ': 'I', 'ĭ': 'i', 'Į': 'I', 'į': 'i', 'İ': 'I', 'ı': 'i', 'Ĳ': 'IJ', 'ĳ': 'ij', 'Ĵ': 'J', 'ĵ': 'j', 'Ķ': 'K', 'ķ': 'k', 'Ĺ': 'L', 'ĺ': 'l', 'Ļ': 'L', 'ļ': 'l', 'Ľ': 'L', 'ľ': 'l', 'Ŀ': 'L', 'ŀ': 'l', 'Ł': 'l', 'ł': 'l', 'Ń': 'N', 'ń': 'n', 'Ņ': 'N', 'ņ': 'n', 'Ň': 'N', 'ň': 'n', 'ŉ': 'n', 'Ō': 'O', 'ō': 'o', 'Ŏ': 'O', 'ŏ': 'o', 'Ő': 'O', 'ő': 'o', 'Œ': 'OE', 'œ': 'oe', 'Ŕ': 'R', 'ŕ': 'r', 'Ŗ': 'R', 'ŗ': 'r', 'Ř': 'R', 'ř': 'r', 'Ś': 'S', 'ś': 's', 'Ŝ': 'S', 'ŝ': 's', 'Ş': 'S', 'ş': 's', 'Š': 'S', 'š': 's', 'Ţ': 'T', 'ţ': 't', 'Ť': 'T', 'ť': 't', 'Ŧ': 'T', 'ŧ': 't', 'Ũ': 'U', 'ũ': 'u', 'Ū': 'U', 'ū': 'u', 'Ŭ': 'U', 'ŭ': 'u', 'Ů': 'U', 'ů': 'u', 'Ű': 'U', 'ű': 'u', 'Ų': 'U', 'ų': 'u', 'Ŵ': 'W', 'ŵ': 'w', 'Ŷ': 'Y', 'ŷ': 'y', 'Ÿ': 'Y', 'Ź': 'Z', 'ź': 'z', 'Ż': 'Z', 'ż': 'z', 'Ž': 'Z', 'ž': 'z', 'ſ': 's', 'ƒ': 'f', 'Ơ': 'O', 'ơ': 'o', 'Ư': 'U', 'ư': 'u', 'Ǎ': 'A', 'ǎ': 'a', 'Ǐ': 'I', 'ǐ': 'i', 'Ǒ': 'O', 'ǒ': 'o', 'Ǔ': 'U', 'ǔ': 'u', 'Ǖ': 'U', 'ǖ': 'u', 'Ǘ': 'U', 'ǘ': 'u', 'Ǚ': 'U', 'ǚ': 'u', 'Ǜ': 'U', 'ǜ': 'u', 'Ǻ': 'A', 'ǻ': 'a', 'Ǽ': 'AE', 'ǽ': 'ae', 'Ǿ': 'O', 'ǿ': 'o',
    ...overrides
  };

  const xreReplace = [];
  for(let search in chars) {
    xreReplace.push([search, chars[search], 'all']);
  }

  return XRegExp.replaceEach(text, xreReplace);
}

export const camelize = (str, lowerFirstChar = false) => {
  return str
    .replace(/[_-]/g, ' ')
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => {
      return lowerFirstChar && index == 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export const toTitleCase = (str, splitWith = /[\s]+/, joinWith = ' ') => {
  return str.toLowerCase()
    .split(splitWith)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(joinWith);
}

export const hasLocaleChars = (text, locale) => {
  let result = false,
    textChars = text.split('');
  for(let charIndex in textChars)
    if(result = chars[locale].indexOf(textChars[charIndex]) >= 0) break;
  return result;
}

export const makeLines = ({
  lines
}, {
  glue = "\n"
} = {}) => lines.filter(l => l || l === '').join(glue);

export const removeAllWhitespaces = (text, whitespaces = /[ \t\r]+/g) => text.replace(whitespaces, '');

export const decodeHtmlCharCodes = str =>
  str.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
    String.fromCharCode(charCode));

export const toJsonIntended = (obj, spaces = 2) => JSON.stringify(obj, null, spaces);

export const format = (text, ...params) =>  {
  var formatted = text;
  
  if(params.length == 1 && typeof params[0] == 'object')
    args = params[0];
  else
    args = params;

  for(let key in args)
    formatted = formatted.replace(new RegExp('\\{' + key + '\\}', 'gi'), args[key]);

  return formatted;
}
