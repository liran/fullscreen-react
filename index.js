import React, { useRef, useEffect } from "react";

function requestFullscreen(element) {
  if (!element) {
    element = document.body;
  }
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullScreen) {
    element.webkitRequestFullScreen();
  }
}

function exitFullscreen() {
  if (document.cancelFullScreen) {
    document.cancelFullScreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitCancelFullScreen) {
    document.webkitCancelFullScreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

function isFullscreen() {
  return !!(
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement
  );
}

export default function FullScreen({ isEnter, onChange = (e) => e, children }) {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      if (isEnter) {
        requestFullscreen(ref.current);
      } else {
        exitFullscreen();
      }
    }
  }, [isEnter, ref]);

  useEffect(() => {
    const cb = () => {
      onChange(isFullscreen());
    };

    document.addEventListener('fullscreenchange', cb);
    return () => {
      document.removeEventListener('fullscreenchange', cb);
    };
  }, [onChange]);

  const childrenWithProps = React.Children.map(children, (child) =>
    React.cloneElement(child, { ref })
  );
  return childrenWithProps;
}
