declare module "preload" {
    namespace Preload {
        export interface versionsInterface {
            node: () => string;
            chrome: () => string;
            electron: () => string;
            ping: () => Promise<void>;

            // example variable
            myVariable?: string;
        }

        export interface Window {
            versions: versionsInterface;
        }
    }
}
