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
  let domNode = null;

  useEffect(() => {
    if (domNode) {
      if (isEnter) {
        requestFullscreen(domNode);
      } else {
        exitFullscreen();
      }
    }
  }, [isEnter, domNode]);

  useEffect(() => {
    const cb = () => {
      onChange(isFullscreen());
    };

    document.addEventListener("fullscreenchange", cb);
    return () => {
      document.removeEventListener("fullscreenchange", cb);
    };
  }, [onChange]);

  if (!children) return null;

  const refFunc = (dom) => {
    domNode = dom;

    // The ref of the child element
    if (children.ref instanceof Function) {
      children.ref(dom);
    } else if (children.ref) {
      children.ref.current = dom;
    }
  };

  return React.cloneElement(children, { ref: refFunc });
}
