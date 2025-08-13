declare module 'cookie-cutter' {
    interface CookieCutter {
      set: (name: string, value: string, options?: any) => void;
      get: (name: string) => string;
    }
  
    const cookieCutter: CookieCutter;
  
    export = cookieCutter;
  }