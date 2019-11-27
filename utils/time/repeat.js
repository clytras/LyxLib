
export default function repeat(callback, millis, immidiate = false) {
  if(immidiate) {
    if(callback() === false) {
      return;
    }
  }

  let running = true;
  let timer;

  function run() {
    if(running && callback() !== false) {
      timer = setTimeout(run, millis);
    }
  }

  run();

  return () => {
    running = false;
    clearTimeout(timer);
  }
}
