export {};

declare global {
    interface Window {
        darkMode: {
            toggle: () => Promise<boolean>;
        };
    }
}
