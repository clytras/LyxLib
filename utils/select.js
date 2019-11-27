
function _select(check, cases) {
  if(!check || !cases) {
    throw new Error('select: No valid input params');
  }

  let selected;

  if(check in cases) {
    selected = cases[check];
  } else if('default' in cases) {
    selected = cases['default'];
  }

  return selected;
}

export default function(check, cases) {
  const selected = _select(check, cases);

  if(typeof(selected) === 'function') {
    return selected();
  }

  return selected;
}

export async function select(check, cases) {
  const selected = _select(check, cases);

  if(typeof(selected) === 'function') {
    return await selected();
  }

  return selected;
}
