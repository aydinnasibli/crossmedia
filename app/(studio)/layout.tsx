export const metadata = {
  title: "Crossmedia Studio",
  description: "Backend for Crossmedia Platform",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  );
}
