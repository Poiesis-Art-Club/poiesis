import { useEffect, useRef } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement, options: {
        sitekey: string;
        callback: (token: string) => void;
        "expired-callback": () => void;
        "error-callback": () => void;
        theme: "auto";
      }) => string;
      remove: (widgetId: string) => void;
    };
  }
}

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

export function TurnstileCaptcha({ sitekey, onToken }: { sitekey: string; onToken: (token: string) => void }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sitekey || !container.current) return;
    let widgetId: string | undefined;
    let cancelled = false;
    const renderWidget = () => {
      if (cancelled || !container.current || !window.turnstile) return;
      widgetId = window.turnstile.render(container.current, {
        sitekey,
        theme: "auto",
        callback: onToken,
        "expired-callback": () => onToken(""),
        "error-callback": () => onToken(""),
      });
    };

    if (window.turnstile) renderWidget();
    else {
      let script = document.querySelector<HTMLScriptElement>(`script[src^="${SCRIPT_URL}"]`);
      if (!script) {
        script = document.createElement("script");
        script.src = SCRIPT_URL;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      script.addEventListener("load", renderWidget);
      return () => {
        cancelled = true;
        script?.removeEventListener("load", renderWidget);
        if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
      };
    }

    return () => {
      cancelled = true;
      if (widgetId && window.turnstile) window.turnstile.remove(widgetId);
    };
  }, [sitekey, onToken]);

  if (!sitekey) return null;
  return <div className="member-captcha" ref={container} aria-label="Security check" />;
}
