
function _select(check, cases) {
  if (!check || !cases) {
    throw new Error('select: No valid input params');
  }

  let selected;

  if (check in cases) {
    selected = cases[check];
  } else if('default' in cases) {
    selected = cases['default'];
  }

  return selected;
}

export default function(check, cases) {
  const selected = _select(check, cases);

  if (typeof(selected) === 'function') {
    return selected();
  }

  return selected;
}

export async function select(check, cases) {
  const selected = _select(check, cases);

  if (typeof(selected) === 'function') {
    return await selected();
  }

  return selected;
}

// Uses arrays to evaluate expressions and return n+1 for truthy values
// ex.:
// > switchOf([1 > 0.1, 'one', 2 > 22, 'two'], 'default')
// < "one"
export function switchOf(flagCases, defaultValue) {
  for (let i = 0; i < flagCases.length; i += 2) {
    const flag = flagCases[i];
    if (flag) {
      const useCase = flagCases[i + 1];
      if (typeof(useCase) === 'function') {
        return useCase();
      }
      return useCase;
    }
  }
  return defaultValue;
}
