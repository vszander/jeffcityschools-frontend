export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <p className="eyebrow">Jefferson City Schools</p>

        <h1>Curriculum Browser</h1>

        <p className="lead">
          Frontend is live. This React/Vite page is ready to connect to the
          Django curriculum backend.
        </p>

        <div className="actions">
          <a
            className="primary-link"
            href="https://backend.jeffcityschools.net/curriculum/"
          >
            Open Curriculum Browser
          </a>
        </div>

        <p className="dev-note">
          DEV frontend running from <code>~/Documents/CTAE/cloudflare</code>
        </p>
      </section>
    </main>
  );
}
