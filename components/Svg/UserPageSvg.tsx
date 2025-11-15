import React from "react";

export const UserMenuSvg = React.memo(() => {
  return (
    <svg
      width="100%"
      height="100%"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3 6h14M3 12h10M3 18h14m4-10l-1.154.877C17.95 10.318 17 11.039 17 12s.949 1.682 2.846 3.124L21 16"
      />
    </svg>
  );
});

UserMenuSvg.displayName = "UserMenuSvg";

export const DasBoardSvg = React.memo(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <g fill="none" stroke="currentColor">
        <rect
          width="18.5"
          height="18.5"
          x="2.75"
          y="2.75"
          strokeWidth="1.5"
          rx="6"
        />
        <path
          strokeLinecap="round"
          strokeWidth="1.6"
          d="M7.672 16.222v-5.099m4.451 5.099V7.778m4.205 8.444V9.82"
        />
      </g>
    </svg>
  );
});

DasBoardSvg.displayName = "DasBoardSvg";

export const PaymentSvg = React.memo(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 20 20"
    >
      <path
        fill="currentColor"
        d="M13.5 13a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2ZM2 6.75A2.75 2.75 0 0 1 4.75 4h10.5A2.75 2.75 0 0 1 18 6.75v6.5A2.75 2.75 0 0 1 15.25 16H4.75A2.75 2.75 0 0 1 2 13.25v-6.5ZM4.75 5A1.75 1.75 0 0 0 3 6.75V8h14V6.75A1.75 1.75 0 0 0 15.25 5H4.75ZM17 9H3v4.25c0 .966.784 1.75 1.75 1.75h10.5A1.75 1.75 0 0 0 17 13.25V9Z"
      />
    </svg>
  );
});

PaymentSvg.displayName = "PaymentSvg";

export const UserProfileSvg = React.memo(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        color="currentColor"
      >
        <path d="M2 12c0-4.243 0-6.364 1.464-7.682C4.93 3 7.286 3 12 3s7.071 0 8.535 1.318S22 7.758 22 12s0 6.364-1.465 7.682C19.072 21 16.714 21 12 21s-7.071 0-8.536-1.318S2 16.242 2 12" />
        <path d="M8.4 8h-.8c-.754 0-1.131 0-1.366.234C6 8.47 6 8.846 6 9.6v.8c0 .754 0 1.131.234 1.366C6.47 12 6.846 12 7.6 12h.8c.754 0 1.131 0 1.366-.234C10 11.53 10 11.154 10 10.4v-.8c0-.754 0-1.131-.234-1.366C9.53 8 9.154 8 8.4 8M6 16h4m4-8h4m-4 4h4m-4 4h4" />
      </g>
    </svg>
  );
});

UserProfileSvg.displayName = "UserProfileSvg";

export const SecuritySvg = React.memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" color="currentColor"><path d="M11.998 2C8.99 2 7.04 4.019 4.734 4.755c-.938.3-1.407.449-1.597.66c-.19.21-.245.519-.356 1.135c-1.19 6.596 1.41 12.694 7.61 15.068c.665.255.998.382 1.61.382s.946-.128 1.612-.383c6.199-2.373 8.796-8.471 7.606-15.067c-.111-.616-.167-.925-.357-1.136s-.658-.36-1.596-.659C16.959 4.019 15.006 2 11.998 2"/><path d="M10.337 10.38c-1.08 0-1.62.78-1.74 1.26s-.12 2.22-.048 2.94c.24.9.84 1.272 1.428 1.392c.54.048 2.82.03 3.48.03c.96.018 1.68-.342 1.98-1.422c.06-.36.12-2.34-.03-2.94c-.318-.96-1.11-1.26-1.71-1.26zm-.087-.421c0-.06.008-.406.01-.84c0-.398-.034-.78.156-1.13c.71-1.414 2.75-1.27 3.254.17c.087.237.093.612.09.96c-.003.443.006.84.006.84"/></g></svg>
  );
});

SecuritySvg.displayName = "SecuritySvg";

export const NotificationSvg = React.memo(() => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 24 24"
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M2.53 14.394c-.213 1.353.738 2.292 1.902 2.76c4.463 1.795 10.673 1.795 15.136 0c1.164-.468 2.115-1.407 1.902-2.76c-.13-.832-.777-1.524-1.256-2.2c-.627-.897-.689-1.874-.69-2.915C19.525 5.26 16.157 2 12 2S4.475 5.26 4.475 9.28c0 1.04-.062 2.018-.69 2.914c-.478.676-1.124 1.368-1.255 2.2M9 21c.796.622 1.848 1 3 1s2.204-.378 3-1"
        color="currentColor"
      />
    </svg>
  );
});

NotificationSvg.displayName = "NotificationSvg";

export const MembershipSvg = React.memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M4 12.577v1.808q0 .23.192.423q.193.192.423.192h14.77q.23 0 .423-.192q.192-.193.192-.423v-1.808H4ZM4.615 3h14.77q.67 0 1.143.472q.472.472.472 1.143v9.77q0 .67-.472 1.143q-.472.472-1.143.472h-4.462v4.27L12 18.807l-2.923 1.461V16H4.615q-.67 0-1.143-.472Q3 15.056 3 14.385v-9.77q0-.67.472-1.143Q3.944 3 4.615 3ZM4 10.423h16V4.615q0-.23-.192-.423Q19.615 4 19.385 4H4.615q-.23 0-.423.192Q4 4.385 4 4.615v5.808Zm0 3.962V4h.615q-.23 0-.423.192Q4 4.385 4 4.615v9.77q0 .23.192.423q.193.192.423.192H4v-.615Z"/></svg>
  );
});

MembershipSvg.displayName = "MembershipSvg";
