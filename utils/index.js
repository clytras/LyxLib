
export const randomColor = () => '#' + ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);

export const toFormData = (obj, form, namespace) => {
  let fd = form || new FormData();
  let formKey;

  for(let property in obj) {
    if(obj.hasOwnProperty(property)) {
      if(namespace) {
        formKey = namespace + '[' + property + ']';
      } else {
        formKey = property;
      }

      // if the property is an object, but not a File, use recursivity.
      if(obj[property] instanceof Date) {
        fd.append(formKey, obj[property].toISOString());
      }
      else if(
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File) &&
        obj[property] !== null
      ) {
        toFormData(obj[property], fd, formKey);
      } else { // if it's a string or a File object
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
}

export const fetchTimeout = (url, options, timeout = 30000) => 
  Promise.race([
    fetch(url, options),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout)
    )
  ]);

export function disableConsole(condition, functions = [
  'log', 'debug', 'error', 'warn', 'clear', 'dir', 'table', 'trace', 'time'
]) {
  if(condition) {
    for(let fn of functions) {
      if(console[fn]) {
        console[fn] = () => {}
      }
    }
  }
}
