declare module '*.svg' {
  const content: any;
  export default content;
} 

// src/declarations.d.ts
declare module '*.png' {
    const content: string;
    export default content;
}

declare module 'company/CompanyComponent' {
  const CompanyComponent: React.ComponentType<any>;
  export default CompanyComponent;
}