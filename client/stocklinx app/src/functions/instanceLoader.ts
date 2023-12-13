import { useEffect, useRef } from "react";

export const useInstanceLoader = (siteKey: string) => {
  const helperInstance = useRef(null);

  useEffect(() => {
    if (!window.grecaptcha) {
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => {
        helperInstance.current = window.grecaptcha;
      };
      document.body.appendChild(script);
    } else {
      helperInstance.current = window.grecaptcha;
    }

    return () => {
      if (helperInstance.current) {
        helperInstance.current.reset();
      }
    };
  }, []);

  return helperInstance.current;
};
