import "./globals.css";

export const metadata = {
  title: "Askar — Portfolio",
  description: "A selected collection of digital work by Askar.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
