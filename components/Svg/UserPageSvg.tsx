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

export const EditPencilSvg = React.memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M14.44 5.78L4.198 16.02a2 2 0 0 0-.565 1.125l-.553 3.774l3.775-.553A2 2 0 0 0 7.98 19.8L18.22 9.56m-3.78-3.78l2.229-2.23a1.6 1.6 0 0 1 2.263 0l1.518 1.518a1.6 1.6 0 0 1 0 2.263l-2.23 2.23M14.44 5.78l3.78 3.78"/></svg>
  )
})

EditPencilSvg.displayName = "EditPencilSvg";

export const CancelSvg = React.memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m5 19l7-7m0 0l7-7m-7 7L5 5m7 7l7 7"/></svg>
  )
})

CancelSvg.displayName = "CancelSvg";

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

export const TwoFASvg = React.memo(() =>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="curentColor"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M19.543 4.471A6.501 6.501 0 0 0 8.618 7.255a6.52 6.52 0 0 0 .34 4.447L2.5 18.179V21.5h3.364l-.318-1.99l1.965.33l1.67-1.661l-.318-1.99l1.976.318l1.47-1.472a6.497 6.497 0 0 0 8.06-2.261a6.52 6.52 0 0 0-.838-8.338z"/><path d="M16.99 10.23a2.258 2.258 0 0 1-3.476-2.853a2.26 2.26 0 0 1 3.477-.339a2.275 2.275 0 0 1 0 3.192"/></g></svg>
    )
})

TwoFASvg.displayName = "TwoFASvg";

export const PersonalPrivacy = React.memo(() =>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="m12 3.19l7 3.11V11c0 4.52-2.98 8.69-7 9.93c-4.02-1.24-7-5.41-7-9.93V6.3l7-3.11M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5l-9-4zm-1 6h2v2h-2V7zm0 4h2v6h-2v-6z"/></svg>
    )
})

PersonalPrivacy.displayName = "PersonalPrivacy";

export const PasswordSvg = React.memo(() =>{
    return (
        <svg width="100%" height="1%00" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m16 12.75l2.598-1.5m0 1.5L16 11.25m1.299-.75v3m-11.848-.75l2.598-1.5m0 1.5l-2.598-1.5m1.299-.75v3m3.951-.75l2.598-1.5m0 1.5l-2.598-1.5M12 10.5v3M4.75 7.75A2.25 2.25 0 0 0 2.5 10v4a2.25 2.25 0 0 0 2.25 2.25h14.5A2.25 2.25 0 0 0 21.5 14v-4a2.25 2.25 0 0 0-2.25-2.25z"/></svg>
    )
})

PasswordSvg.displayName = "PasswordSvg";

export const RegenerateCode = React.memo(() => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 3a9 9 0 0 0-9 9H0l4 4l4-4H5a7 7 0 0 1 7-7a7 7 0 0 1 7 7a7 7 0 0 1-7 7c-1.5 0-2.91-.5-4.06-1.3L6.5 19.14A9.1 9.1 0 0 0 12 21a9 9 0 0 0 9-9a9 9 0 0 0-9-9m2 9a2 2 0 0 0-2-2a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2"/></svg>
  )
})

RegenerateCode.displayName = "RegenerateCode";
