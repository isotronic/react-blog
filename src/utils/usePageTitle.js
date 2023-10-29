import { useRef, useEffect } from "react";

function usePageTitle(title, prevailOnUnmount = false) {
  const defaultTitle = useRef(document.title);
  const titleSuffix = "React Blog";

  useEffect(() => {
    document.title = `${title} | ${titleSuffix}`;
  }, [title]);

  useEffect(() => () => {
    if (!prevailOnUnmount) {
      document.title = defaultTitle.current;
    }
  });
}

export default usePageTitle;
