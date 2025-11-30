declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: {
          InlineLayout?: {
            SIMPLE: number;
            VERTICAL: number;
          };
        };
        [key: string]: any;
      };
    };
    googleTranslateElementInit?: () => void;
  }
}

export {};
