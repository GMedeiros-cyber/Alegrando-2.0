/// <reference types="vite/client" />

interface Window {
    openJadeWidget: (message?: string) => void;
    closeChatWidget: () => void;
    ChatWidgetConfig: any;
}
