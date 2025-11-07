import React from "react";

// Image Converter

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

// Image Resizer

export const ImageResizerTool = React.memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 3A1.5 1.5 0 0 0 3 4.5v1a.5.5 0 0 1-1 0v-1A2.5 2.5 0 0 1 4.5 2h1a.5.5 0 0 1 0 1h-1ZM13 4.5A1.5 1.5 0 0 0 11.5 3h-1a.5.5 0 0 1 0-1h1A2.5 2.5 0 0 1 14 4.5v1a.5.5 0 0 1-1 0v-1Zm0 7a1.5 1.5 0 0 1-1.5 1.5h-1a.5.5 0 0 0 0 1h1a2.5 2.5 0 0 0 2.5-2.5v-1a.5.5 0 0 0-1 0v1Zm-10 0A1.5 1.5 0 0 0 4.5 13h1.25a.5.5 0 0 1 0 1H4.5A2.5 2.5 0 0 1 2 11.5v-1.25a.5.5 0 0 1 1 0v1.25ZM5.5 4A1.5 1.5 0 0 0 4 5.5v5A1.5 1.5 0 0 0 5.5 12h5a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 10.5 4h-5ZM5 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5Z"/></svg>
  )
})

ImageResizerTool.displayName = "ImageResizerTool"

export const ResizerLogoSvg = React.memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 32 32"><path fill="currentColor" d="M13 3H7.5A4.5 4.5 0 0 0 3 7.5V9a1 1 0 0 0 2 0V7.5A2.5 2.5 0 0 1 7.5 5H13a1 1 0 1 0 0-2M5 24.5v-8A2.5 2.5 0 0 1 7.5 14h8a2.5 2.5 0 0 1 2.5 2.5v8a2.5 2.5 0 0 1-2.5 2.5h-8A2.5 2.5 0 0 1 5 24.5M15.5 29a4.5 4.5 0 0 0 4.5-4.5v-8a4.5 4.5 0 0 0-4.5-4.5h-8A4.5 4.5 0 0 0 3 16.5v8A4.5 4.5 0 0 0 7.5 29zm6.5-1a1 1 0 0 1 1-1h1.5a2.5 2.5 0 0 0 2.5-2.5V19a1 1 0 1 1 2 0v5.5a4.5 4.5 0 0 1-4.5 4.5H23a1 1 0 0 1-1-1m7-15V7.5A4.5 4.5 0 0 0 24.5 3H19a1 1 0 1 0 0 2h5.5A2.5 2.5 0 0 1 27 7.5V13a1 1 0 1 0 2 0"/></svg>
  )
})

// Image Compressor

export const ImageCompressorTool = React.memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"/></svg>
  )
})

ImageCompressorTool.displayName = "ImageCompressorTool"

export const CompressLogoSvg = React.memo(() => {
  return (
  <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M4 9h16v2H4zm12-5h-3V1h-2v3H8l4 4zM8 19h3v3h2v-3h3l-4-4zm-4-7h16v2H4z"/></svg>
)})

CompressLogoSvg.displayName = "CompressLogoSvg"