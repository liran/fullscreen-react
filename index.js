import React, { useEffect, useCallback, useState } from "react";
import screenfull from "screenfull";

export default function FullScreen({ isEnter, onChange = (e) => e, children }) {
  const [domNode, setDomNode] = useState(null);

  useEffect(() => {
    if (domNode && screenfull.isEnabled) {
      if (isEnter) {
        screenfull.request(domNode);
      } else {
        screenfull.exit();
      }
    }
  }, [isEnter, domNode]);

  useEffect(() => {
    if (screenfull.isEnabled) {
      const cb = () => {
        onChange(screenfull.isFullscreen);
      };

      screenfull.on("change", cb);
      return () => {
        screenfull.off("change", cb);
      };
    }
  }, [onChange]);

  const refFunc = useCallback(
    (dom) => {
      setDomNode(dom);

      // The ref of the child element
      if (children) {
        if (children.ref instanceof Function) {
          children.ref(dom);
        } else if (children.ref) {
          children.ref.current = dom;
        }
      }
    },
    [children]
  );

  if (!children) return null;

  return React.cloneElement(children, { ref: refFunc });
}
