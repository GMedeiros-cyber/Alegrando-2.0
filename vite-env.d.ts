/// <reference types="vite/client" />

interface Window {
    openJadeWidget: (message?: string) => void;
    closeChatWidget: () => void;
}

// vite-imagetools: imports com "?...&as=picture"
declare module '*&as=picture' {
    const value: {
        sources: Record<string, string>;
        img: { src: string; w: number; h: number };
    };
    export default value;
}
