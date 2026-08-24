import type { Config } from "tailwindcss";
export default { content:["./app/**/*.{ts,tsx}","./components/**/*.{ts,tsx}"], theme:{extend:{colors:{ink:"#10241f", moss:"#285a48", lime:"#c7ea70", sand:"#eee8d8", rust:"#d66b3b"},fontFamily:{display:["Georgia","serif"]}}}, plugins:[] } satisfies Config;
