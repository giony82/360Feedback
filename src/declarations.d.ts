declare module '*.svg' {
  const content: any;
  export default content;
} 

// src/declarations.d.ts
declare module '*.png' {
    const content: string;
    export default content;
}