import React from "react";

export const ChevronLeft = React.memo(() => {
  return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
  )
});

ChevronLeft.displayName = "ChevronLeft"

export const ChevronRight = React.memo(() => {
  return (
   <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
  );
})

ChevronRight.displayName = "ChevronRight"

// Image Converter

export const ImageConverterTool = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M4.75 3h14.5c.966 0 1.75.784 1.75 1.75v14.5A1.75 1.75 0 0 1 19.25 21H4.75A1.75 1.75 0 0 1 3 19.25V4.75C3 3.784 3.784 3 4.75 3Zm14.5 1.5H4.75a.25.25 0 0 0-.25.25v14.5c0 .138.112.25.25.25h.19l9.823-9.823a1.75 1.75 0 0 1 2.475 0l2.262 2.262V4.75a.25.25 0 0 0-.25-.25Zm.25 9.56l-3.323-3.323a.25.25 0 0 0-.354 0L7.061 19.5H19.25a.25.25 0 0 0 .25-.25ZM8.5 11a2.5 2.5 0 1 1 0-5a2.5 2.5 0 0 1 0 5Zm0-1.5a1 1 0 1 0 0-2a1 1 0 0 0 0 2Z"/></svg>
    )
})

ImageConverterTool.displayName = "ImageConverterTool"

// Image Resizer

export const ImageResizerTool = React.memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16"><path fill="currentColor" d="M4.5 3A1.5 1.5 0 0 0 3 4.5v1a.5.5 0 0 1-1 0v-1A2.5 2.5 0 0 1 4.5 2h1a.5.5 0 0 1 0 1h-1ZM13 4.5A1.5 1.5 0 0 0 11.5 3h-1a.5.5 0 0 1 0-1h1A2.5 2.5 0 0 1 14 4.5v1a.5.5 0 0 1-1 0v-1Zm0 7a1.5 1.5 0 0 1-1.5 1.5h-1a.5.5 0 0 0 0 1h1a2.5 2.5 0 0 0 2.5-2.5v-1a.5.5 0 0 0-1 0v1Zm-10 0A1.5 1.5 0 0 0 4.5 13h1.25a.5.5 0 0 1 0 1H4.5A2.5 2.5 0 0 1 2 11.5v-1.25a.5.5 0 0 1 1 0v1.25ZM5.5 4A1.5 1.5 0 0 0 4 5.5v5A1.5 1.5 0 0 0 5.5 12h5a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 10.5 4h-5ZM5 5.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1-.5-.5v-5Z"/></svg>
  )
})

ImageResizerTool.displayName = "ImageResizerTool"

// Image Compressor

export const ImageCompressorTool = React.memo(() => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M10.38 13.08A1 1 0 0 0 10 13H6a1 1 0 0 0 0 2h1.59l-5.3 5.29a1 1 0 0 0 0 1.42a1 1 0 0 0 1.42 0L9 16.41V18a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38a1 1 0 0 0-.54-.54ZM10 5a1 1 0 0 0-1 1v1.59l-5.29-5.3a1 1 0 0 0-1.42 1.42L7.59 9H6a1 1 0 0 0 0 2h4a1 1 0 0 0 .38-.08a1 1 0 0 0 .54-.54A1 1 0 0 0 11 10V6a1 1 0 0 0-1-1Zm3.62 5.92A1 1 0 0 0 14 11h4a1 1 0 0 0 0-2h-1.59l5.3-5.29a1 1 0 1 0-1.42-1.42L15 7.59V6a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38a1 1 0 0 0 .54.54ZM16.41 15H18a1 1 0 0 0 0-2h-4a1 1 0 0 0-.38.08a1 1 0 0 0-.54.54A1 1 0 0 0 13 14v4a1 1 0 0 0 2 0v-1.59l5.29 5.3a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42Z"/></svg>
  )
})

ImageCompressorTool.displayName = "ImageCompressorTool"