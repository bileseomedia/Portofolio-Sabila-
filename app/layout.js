import "./globals.css";

export const metadata = {
  title: "Sabila Alifia Sundawa — Portfolio",
  description:
    "Personal portfolio of Sabila Alifia Sundawa — Management student exploring business, digital creativity & beyond.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
