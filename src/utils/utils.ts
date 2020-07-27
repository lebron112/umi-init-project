export const getBlen = (str: string, needLength: number, usePoint?: boolean): { str: string, overSize: boolean } => {
  let blen = 0;
  for (let i = 0; i < str.length; i++) {
    if ((str.charCodeAt(i) & 0xff00) !== 0) blen++;
    blen++;
    if (blen >= needLength) {
      return {
        str: str.slice(0, i + 1) + (usePoint ? '...' : ''),
        overSize: true,
      };
    }
  }
  return { str, overSize: false };
};

export const IsFullScreen = () => {
  // @ts-ignore
  return document.isFullScreen || document.mozIsFullScreen || document.webkitIsFullScreen;
};

export const FullScreen = (isOpen: boolean, target?: HTMLElement) => {
  const elem = target || document.body;
  // W3C Chrome等 FireFox IE11
  // @ts-ignore
  const { requestFullScreen, webkitRequestFullScreen, mozRequestFullScreen, msRequestFullScreen, exitFullscreen,
    // @ts-ignore
    cancelFullScreen, mozCancelFullScreen, webkitCancelFullScreen, msExitFullscreen } = elem;
  const requestMethod = requestFullScreen || webkitRequestFullScreen || mozRequestFullScreen || msRequestFullScreen;
  const exitMethod = exitFullscreen || mozCancelFullScreen || webkitCancelFullScreen || msExitFullscreen || cancelFullScreen;
  // @ts-ignore
  const documentExitMethod = document.cancelFullScreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.exitFullScreen;
  if (isOpen) {
    if (requestMethod) requestMethod.call(elem);
  } else if (exitMethod) {
    exitMethod.call(elem);
  } else if (documentExitMethod) {
    documentExitMethod.call(document);
  }
};