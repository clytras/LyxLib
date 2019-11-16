const _globalEventsPropertyName = '__lytraxCustomDefinedEvents';
const _idGen = () => (new Date).getTime().toString(36);

function _getGlobalEvents() {
  if(typeof(window) !== 'undefined') {
    if(!(_globalEventsPropertyName in window)) {
      window[_globalEventsPropertyName] = {};
    }
    return window[_globalEventsPropertyName];
  } else if(typeof(global) !== 'undefined') {
    if(!(_globalEventsPropertyName in global)) {
      global[_globalEventsPropertyName] = {};
    }
    return global[_globalEventsPropertyName];
  }
}

function register(name, callback, data, once = false) {
  const events = _getGlobalEvents();
  const eventId = _idGen();

  if(!(name in events)) {
    events[name] = {};
  }

  const event = {
    cb: callback
  }

  if(callback) {
    if(typeof(data) !== 'undefined') {
      callback(data);
    } else if(once) {
      event.once = true;
    }
  }

  events[name][eventId] = event;

  return () => {
    if(eventId in events[name]) {
      delete events[name][eventId];
    }
  }
}

function emit(name, ...params) {
  const events = _getGlobalEvents();
  if(name in events) {
    for(let eventId in events[name]) {
      const event = events[name][eventId];
      const { cb, once } = event;
      if(once) {
        delete events[name][eventId];
      }
      cb && cb(...params);
    }
  }
}

function once(name, callback) {
  return register(name, callback, undefined, true);
}

const on = register;

export {
  register,
  on,
  emit,
  once
}

export default {
  register,
  emit,
  on,
  once
}
