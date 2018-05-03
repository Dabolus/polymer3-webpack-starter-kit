declare module '*.html' {
  const content: string;
  export default content;
}

declare module '*.scss' {
  const content: string;
  export default content;
}

declare module '@polymer/polymer/polymer-element' {
  // noinspection TsLint
  export const PolymerElement: any;
  export const html: any;
}

declare module '@polymer/polymer/lib/utils/settings' {
  export const useShadow: boolean;
  export const useNativeCSSProperties: boolean;
  export const useNativeCustomElements: boolean;
  export const setRootPath: (path: string) => void;
  export const setSanitizeDOMValue: (newSanitizeDOMValue: any) => void;
  export const setPassiveTouchGestures: (usePassive: boolean) => void;
}

declare module WebComponents {
  export const ready: boolean;
  export const waitFor: (callback: () => Promise<any>) => void;
}
