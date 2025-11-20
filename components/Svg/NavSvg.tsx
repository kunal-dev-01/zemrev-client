import React from "react";

export const SidebarSvg = React.memo(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="none"
      className="text-zinc-700 dark:text-zinc-300 w-[3.8vh] md:w-[1.5vw]"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        color="currentColor"
      >
        <path d="M22 12c0-3.75 0-5.625-.955-6.939a5 5 0 0 0-1.106-1.106C18.625 3 16.749 3 13 3h-2c-3.75 0-5.625 0-6.939.955A5 5 0 0 0 2.955 5.06C2 6.375 2 8.251 2 12s0 5.625.955 6.939a5 5 0 0 0 1.106 1.106C5.375 21 7.251 21 11 21h2c3.75 0 5.625 0 6.939-.955a5 5 0 0 0 1.106-1.106C22 17.625 22 15.749 22 12m-7.5-8.5v17M19 7h-1.5m1.5 4h-1.5" />
        <path d="m8 10l1.227 1.057c.515.445.773.667.773.943s-.258.498-.773.943L8 14" />
      </g>
    </svg>
  );
});

SidebarSvg.displayName = "SidebarSvg";

export const SidebarSvgTwo = React.memo(() => {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 14"
      className="text-zinc-700 dark:text-zinc-300 w-[3.8vh] md:w-[1.5vw]"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M7.49 1.507A19 19 0 0 0 7 1.5c-1.045 0-2.076.094-3.103.208a2.505 2.505 0 0 0-2.2 2.205C1.588 4.933 1.5 5.96 1.5 7s.088 2.067.197 3.087a2.505 2.505 0 0 0 2.2 2.205c1.027.114 2.058.208 3.103.208q.246 0 .49-.007zM7 .25c1.115 0 2.202.1 3.24.215a3.755 3.755 0 0 1 3.306 3.315c.11 1.033.204 2.113.204 3.22s-.094 2.187-.204 3.22a3.755 3.755 0 0 1-3.305 3.314c-1.039.116-2.126.216-3.241.216s-2.202-.1-3.24-.215a3.755 3.755 0 0 1-3.306-3.316C.344 9.188.25 8.108.25 7s.094-2.187.204-3.22A3.755 3.755 0 0 1 3.759.465C4.798.35 5.885.25 7 .25m2.45 3.31h1.8a.5.5 0 0 1 0 1h-1.8a.5.5 0 0 1 0-1m1.8 2.45h-1.8a.5.5 0 0 0 0 1h1.8a.5.5 0 0 0 0-1"
        clipRule="evenodd"
      />
    </svg>
  );
});

SidebarSvgTwo.displayName = "SidebarSvgTwo";

export const CreditSvg = React.memo(() => {
  return (
    <svg
      className="w-5 h-5 text-zinc-600 dark:text-zinc-400"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
        clipRule="evenodd"
      />
    </svg>
  );
});

CreditSvg.displayName = "CreditSvg";

export const ImageConvert = React.memo(() => {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
});

ImageConvert.displayName = "ImageConvert";

export const ImageOptamize = React.memo(() => {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
});

ImageOptamize.displayName = "ImageOptamize";

export const ImageResizer = React.memo(() => {
  return (
    <svg
      className="w-5 h-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
      />
    </svg>
  );
});

ImageResizer.displayName = "ImageResizer";

export const UserSvg = React.memo(() => {
  return (
    <svg
      className="text-zinc-600 dark:text-zinc-300"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fillRule="evenodd"
        d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
        clipRule="evenodd"
      />
    </svg>
  );
});

UserSvg.displayName = "UserSvg";
