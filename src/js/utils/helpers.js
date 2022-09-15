export function isTouch() {
  try {
    document.createEvent('TouchEvent');
    return true;
  } catch (e) { return false; }
}

export function isWindowSizeSmallerThen(size = 1020) {
  return document.body.offsetWidth < size;
}


export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}
