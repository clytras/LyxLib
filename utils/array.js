export const arraySort = (arr, prop, asc) => {
  return arr.sort((a, b) => {
    if(asc) {
      return a.localeCompare(b, ['en', 'el'], {sensitivity: 'base'});
      //return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
    } else {
      //return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
      return b.localeCompare(a, ['en', 'el'], {sensitivity: 'base'});
    }
  });
}

export const arraySortForLocale = (arr, prop, locale, asc, untone = false) => {
  var that = this;
  return arr.sort((a, b) => {
    av = untone ? that.untone(a[prop][locale]) : a[prop][locale];
    bv = untone ? that.untone(b[prop][locale]) : b[prop][locale];

    if(asc)
      //return av > bv ? 1 : (av < bv ? -1 : 0);
      return av.localeCompare(bv, ['en', 'el'], {sensitivity: 'base'});
    else
      //return bv > av ? 1 : (bv < av ? -1 : 0);
      return bv.localeCompare(av, ['en', 'el'], {sensitivity: 'base'});
  });
}

export const arrayEquals = (left, right) => {
  let arr1 = left.sort(), arr2 = right.sort();
  return arr1.length === arr2.length && arr1.every((v, i) => v === arr2[i])
}
