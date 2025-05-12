"use client";

import { useEffect, useRef } from "react";
declare global {
  interface Window {
    FB: any;
  }
}

const FacebookPagePlugin = () => {
  const isSDKLoaded = useRef(false);

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse();
      isSDKLoaded.current = true;
    } else {
      const script = document.createElement("script");
      script.src = "https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v22.0";
      script.async = true;
      script.defer = true;
      script.crossOrigin = "anonymous";

      script.onload = () => {
        isSDKLoaded.current = true;
        if (window.FB) window.FB.XFBML.parse();
      };

      // Chỉ append nếu chưa có
      if (!document.getElementById("facebook-jssdk")) {
        script.id = "facebook-jssdk";
        document.body.appendChild(script);
      }
    }
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/htx.lamsfarm"
        data-tabs=""
        data-width=""
        data-height=""
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      ></div>
    </>
  );
};

export default FacebookPagePlugin;
