import "./globals.css";
import type { Metadata, Viewport } from "next";
export const metadata: Metadata = { title:"Museo Interactivo", description:"Tu expedición científica", manifest:"/manifest.webmanifest" };
export const viewport: Viewport = { themeColor:"#10241f", width:"device-width", initialScale:1 };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="es"><body>{children}</body></html> }
