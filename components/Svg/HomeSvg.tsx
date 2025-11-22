import React from "react";

export const FileImage = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6"/><circle cx="10" cy="13" r="2"/><path d="m20 17l-1.09-1.09a2 2 0 0 0-2.82 0L10 22"/></g></svg>
    )
})

FileImage.displayName = "FileImage";

export const Minimize2 = React.memo(() =>{
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 14h6v6m10-10h-6V4m0 6l7-7M3 21l7-7"/></svg>
    )
})

Minimize2.displayName = "Minimize2";

export const FileText = React.memo(() => {
    return (
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 16 16"><path fill="currentColor" d="M5.5 5a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1zm0 2a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1z"/><path fill="currentColor" fillRule="evenodd" d="M2 3c0-1.1.895-2 2-2h5.5c.133 0 .26.053.354.146l4 4A.5.5 0 0 1 14 5.5V13c0 1.1-.895 2-2 2H4c-1.1 0-2-.895-2-2zm2-1a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6H9.5a.5.5 0 0 1-.5-.5V2zm6 .707l2.29 2.29H10z" clipRule="evenodd"/></svg>
    )
})

FileText.displayName = "FileText";

export const Scissors = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 472"><path fill="currentColor" d="M171 344q0-11-9-38l66-41l-40-26l-54 32q-30-12-49-12q-35 0-60 25T0 344t25 60t60 25t60.5-25t25.5-60zm-128 0q0-17 12.5-30T85 301q14 0 24 7l8 6l5 11q6 9 6 19q0 17-12.5 30T85 387q-17 0-29.5-13T43 344zM480 67q-7 0-15 4l-158 96l41 26L512 88q-6-21-32-21zM269 190l-107-64q9-27 9-38v-6q-4-34-28-56.5T85 3Q50 3 25 28T0 88q0 32 21 56t52 29h12q25 0 47-15l94 58l41 26l183 119q8 4 21 4q33 0 41-21L309 216zm-145-83l-7 11l-8 4q-9 9-24 9h-4q-17-4-27.5-15.5T43 88q0-17 12.5-30T85 45t29.5 11.5T128 86v2q0 7-4 19z"/></svg>
    )
})

Scissors.displayName = "Scissors";


export const ArrowRightLeft = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path strokeDasharray="12" strokeDashoffset="12" d="M15 7H3.5M9 17H20.5"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="12;0"/></path><path strokeDasharray="8" strokeDashoffset="8" d="M3 7L7 11M3 7L7 3M21 17L17 21M21 17L17 13"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.2s" values="8;0"/></path></g></svg>
    )
})

ArrowRightLeft.displayName = "ArrowRightLeft";

export const Layers = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><g fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.5"><path d="M12.991 3.066a2 2 0 0 0-1.982 0L2.75 7.778l8.259 4.712a2 2 0 0 0 1.982 0l8.259-4.712z"/><path strokeLinecap="round" d="m2.75 12l7.268 4.147a4 4 0 0 0 3.964 0L21.25 12"/><path strokeLinecap="round" d="m2.75 16.222l7.268 4.147a4 4 0 0 0 3.964 0l7.268-4.147"/></g></svg>
    )
})

Layers.displayName = "Layers";

export const Lock = React.memo(() => {
    return (
<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M17 10.25h-.25V8a4.75 4.75 0 0 0-9.5 0v2.25H7A2.75 2.75 0 0 0 4.25 13v5A2.75 2.75 0 0 0 7 20.75h10A2.75 2.75 0 0 0 19.75 18v-5A2.75 2.75 0 0 0 17 10.25ZM8.75 8a3.25 3.25 0 0 1 6.5 0v2.25h-6.5Zm9.5 10A1.25 1.25 0 0 1 17 19.25H7A1.25 1.25 0 0 1 5.75 18v-5A1.25 1.25 0 0 1 7 11.75h10A1.25 1.25 0 0 1 18.25 13Z"/></svg>
    )
})

Lock.displayName = "Lock";

export const FileJson = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><path d="M14 2v6h6m-10 4a1 1 0 0 0-1 1v1a1 1 0 0 1-1 1a1 1 0 0 1 1 1v1a1 1 0 0 0 1 1m4 0a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1a1 1 0 0 1-1-1v-1a1 1 0 0 0-1-1"/></g></svg>
    )
})

FileJson.displayName = "FileJson";

export const Zap = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="m13.058 2.577l-7.941 10.74a.612.612 0 0 0-.068.597a.543.543 0 0 0 .188.235a.468.468 0 0 0 .273.084h5.986l-.907 7.023a.243.243 0 0 0 .027.135a.21.21 0 0 0 .094.09c.04.02.083.024.125.013a.2.2 0 0 0 .107-.07l7.941-10.741a.612.612 0 0 0 .068-.597a.544.544 0 0 0-.188-.234a.468.468 0 0 0-.273-.085h-5.986l.907-7.023a.243.243 0 0 0-.027-.135a.21.21 0 0 0-.094-.09a.183.183 0 0 0-.125-.013a.199.199 0 0 0-.107.07"/></svg>
    )
})

Zap.displayName = "Zap";

export const Shield = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="currentColor" d="M19.63 3.65a1 1 0 0 0-.84-.2a8 8 0 0 1-6.22-1.27a1 1 0 0 0-1.14 0a8 8 0 0 1-6.22 1.27a1 1 0 0 0-.84.2a1 1 0 0 0-.37.78v7.45a9 9 0 0 0 3.77 7.33l3.65 2.6a1 1 0 0 0 1.16 0l3.65-2.6A9 9 0 0 0 20 11.88V4.43a1 1 0 0 0-.37-.78ZM18 11.88a7 7 0 0 1-2.93 5.7L12 19.77l-3.07-2.19A7 7 0 0 1 6 11.88v-6.3a10 10 0 0 0 6-1.39a10 10 0 0 0 6 1.39Z"/></svg>
    )
})

Shield.displayName = "Shield";

export const HardDrive = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.25 13h17.5M5.45 4.11l-2.162 7.847A8 8 0 0 0 3 14.082V19a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.918a8 8 0 0 0-.288-2.125L18.55 4.11A2 2 0 0 0 16.76 3H7.24a2 2 0 0 0-1.79 1.11ZM17 17h1m-5 0h1"/></svg>
    )
})

HardDrive.displayName = "HardDrive";

export const UploadCloud = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"><path d="m16 16l-4-4l-4 4m4-4v9"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/><path d="m16 16l-4-4l-4 4"/></g></svg>
    )
})

UploadCloud.displayName = "UploadCloud";

export const Sliders = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 256 256"><path fill="currentColor" d="M64 105V40a8 8 0 0 0-16 0v65a32 32 0 0 0 0 62v49a8 8 0 0 0 16 0v-49a32 32 0 0 0 0-62Zm-8 47a16 16 0 1 1 16-16a16 16 0 0 1-16 16Zm80-95V40a8 8 0 0 0-16 0v17a32 32 0 0 0 0 62v97a8 8 0 0 0 16 0v-97a32 32 0 0 0 0-62Zm-8 47a16 16 0 1 1 16-16a16 16 0 0 1-16 16Zm104 64a32.06 32.06 0 0 0-24-31V40a8 8 0 0 0-16 0v97a32 32 0 0 0 0 62v17a8 8 0 0 0 16 0v-17a32.06 32.06 0 0 0 24-31Zm-32 16a16 16 0 1 1 16-16a16 16 0 0 1-16 16Z"/></svg>
    )
})

Sliders.displayName = "Sliders";

export const Download = React.memo(() => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5l5-5m-5-7v12"/></svg>
    )
})

Download.displayName = "Download";



