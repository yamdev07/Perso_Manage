export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <title>Gestion du personnel</title>
      </head>
      <body>
        <header style={{ padding: 20, background: "#f0f0f0" }}>
          <h1>Gestion du Personnel</h1>
          <nav>
            <a href="/">Accueil</a> | <a href="/employees">Employés</a>
          </nav>
        </header>

        <main style={{ padding: 20 }}>{children}</main>

        <footer style={{ padding: 20, background: "#f0f0f0", marginTop: 20 }}>
          © 2025 Gestion Personnel
        </footer>
      </body>
    </html>
  );
}
