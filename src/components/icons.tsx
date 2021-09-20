import React from "react"

export const Aircraft = ({h,w,color, style ={}}: {h:number, w:number, color: string, style?: React.CSSProperties}) => {
  return <svg style={style} xmlns="http://www.w3.org/2000/svg"  height={`${h}px`} viewBox="0 0 24 24" width={`${w}px`} fill={color}><g><path d="M22,16v-2l-8.5-5V3.5C13.5,2.67,12.83,2,12,2s-1.5,0.67-1.5,1.5V9L2,14v2l8.5-2.5V19L8,20.5L8,22l4-1l4,1l0-1.5L13.5,19 v-5.5L22,16z"/><path d="M0,0h24v24H0V0z" fill="none"/></g></svg>
}

export const CloudUp = ({h,w,color, style ={}}: {h:number, w:number, color: string, style?: React.CSSProperties}) => {
  return <svg style={style} xmlns="http://www.w3.org/2000/svg"  height={`${h}px`} viewBox="0 0 24 24" width={`${w}px`} fill={color}><g><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zM8 13h2.55v3h2.9v-3H16l-4-4z"/></g></svg>
}

export const CloudDown = ({h,w,color, style ={}}: {h:number, w:number, color: string, style?: React.CSSProperties}) => {
  return <svg style={style} xmlns="http://www.w3.org/2000/svg"  height={`${h}px`} viewBox="0 0 24 24" width={`${w}px`} fill={color}><g><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zm-5.55-8h-2.9v3H8l4 4 4-4h-2.55z"/></g></svg>
}

export const CloudDone = ({h,w,color, style ={}}: {h:number, w:number, color: string, style?: React.CSSProperties}) => {
  return <svg style={style} xmlns="http://www.w3.org/2000/svg"  height={`${h}px`} viewBox="0 0 24 24" width={`${w}px`} fill={color}><g><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM19 18H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3zm-9-3.82l-2.09-2.09L6.5 13.5 10 17l6.01-6.01-1.41-1.41z"/></g></svg>
}

export const CloudOff = ({h,w,color, style ={}}: {h:number, w:number, color: string, style?: React.CSSProperties}) => {
  return <svg style={style} xmlns="http://www.w3.org/2000/svg"  height={`${h}px`} viewBox="0 0 24 24" width={`${w}px`} fill={color}><g><path d="M0 0h24v24H0V0z" fill="none"/><path d="M24 15c0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4c-1.33 0-2.57.36-3.65.97l1.49 1.49C10.51 6.17 11.23 6 12 6c3.04 0 5.5 2.46 5.5 5.5v.5H19c1.66 0 3 1.34 3 3 0 .99-.48 1.85-1.21 2.4l1.41 1.41c1.09-.92 1.8-2.27 1.8-3.81zM4.41 3.86L3 5.27l2.77 2.77h-.42C2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h11.73l2 2 1.41-1.41L4.41 3.86zM6 18c-2.21 0-4-1.79-4-4s1.79-4 4-4h1.73l8 8H6z"/></g></svg>
}

export const Sync = ({h,w,color, style ={}}: {h:number, w:number, color: string, style?: React.CSSProperties}) => {
  return <svg style={style} xmlns="http://www.w3.org/2000/svg"  height={`${h}px`} viewBox="0 0 24 24" width={`${w}px`} fill={color}><g><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></g></svg>
}

export const Cloud = ({h,w,color, style ={}}: {h:number, w:number, color: string, style?: React.CSSProperties}) => {
  return <svg style={style} xmlns="http://www.w3.org/2000/svg"  height={`${h}px`} viewBox="0 0 24 24" width={`${w}px`} fill={color}><g><path d="M12 6c2.62 0 4.88 1.86 5.39 4.43l.3 1.5 1.53.11c1.56.1 2.78 1.41 2.78 2.96 0 1.65-1.35 3-3 3H6c-2.21 0-4-1.79-4-4 0-2.05 1.53-3.76 3.56-3.97l1.07-.11.5-.95C8.08 7.14 9.94 6 12 6m0-2C9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96C18.67 6.59 15.64 4 12 4z"/></g></svg>
}



export const svgs = {
  Aircraft,
  CloudUp,
  CloudDown,
  CloudDone,
  CloudOff,
  Sync,
  Cloud
}