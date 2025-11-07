import React from "react";

export const ImageConverterTool = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M4.75 3h14.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0 1 19.25 21H4.75A1.75 1.75 0 0 1 3 19.25V4.75C3 3.784 3.784 3 4.75 3Zm14.5 1.5H4.75a.25.25 0 0 0-.25.25v14.5c0 .138.112.25.25.25h.19l9.823-9.823a1.75 1.75 0 0 1 2.475 0l2.262 2.262V4.75a.25.25 0 0 0-.25-.25Zm.25 9.56l-3.323-3.323a.25.25 0 0 0-.354 0L7.061 19.5H19.25a.25.25 0 0 0 .25-.25ZM8.5 11a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5Zm0-1.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"/></svg>
    )
})

ImageConverterTool.displayName = "ImageConverterTool"

export const ConvertLogoSvg = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M19 20.5q-.898 0-1.587-.563q-.688-.562-.853-1.437H11q-1.458 0-2.479-1.021T7.5 15q0-1.458 1.021-2.479T11 11.5h2q1.031 0 1.766-.735t.734-1.769q0-1.033-.734-1.764Q14.03 6.5 13 6.5H7.44q-.17.875-.856 1.438T5 8.5q-1.042 0-1.77-.729q-.73-.728-.73-1.769q0-1.04.73-1.771Q3.957 3.5 5 3.5q.898 0 1.584.563q.685.562.856 1.437H13q1.458 0 2.479 1.021T16.5 9q0 1.458-1.021 2.479T13 12.5h-2q-1.031 0-1.766.735T8.5 15.004q0 1.033.734 1.764q.735.732 1.766.732h5.56q.17-.875.856-1.438T19 15.5q1.042 0 1.77.729q.73.728.73 1.769q0 1.04-.73 1.771q-.728.731-1.77.731ZM5 7.5q.617 0 1.059-.441Q6.5 6.617 6.5 6t-.441-1.059Q5.617 4.5 5 4.5t-1.059.441Q3.5 5.383 3.5 6t.441 1.059Q4.383 7.5 5 7.5Z"/></svg>
    )
})

ConvertLogoSvg.displayName = "ConvertLogoSvg"

export const TrendingSvg = React.memo(() => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </svg>
));

TrendingSvg.displayName = "TrendingSvg"