declare global {
    interface versionsInterface {
        node: () => string;
        chrome: () => string;
        electron: () => string;
        ping: () => Promise<void>;

        // example variable
        myVariable?: string;
    }

    interface Window {
        versions: versionsInterface;
    }
}
