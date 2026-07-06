export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero-card home-hero-card">
        <div className="home-copy">
          <p className="eyebrow">Jefferson City Schools</p>

          <h1>Engineering Dragons Gateway</h1>

          <p className="lead">
            A shared frontend for curriculum browsing, student engineering
            projects, substitute lesson plans, and authorized IoT network
            visibility.
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
        </div>

        <aside
          className="logo-float-card"
          aria-label="Engineering Dragons logo"
        >
          <img
            src="/eng-dragons-team-logo-design_sm.png"
            alt="Engineering Dragons team logo"
            className="home-logo"
          />
        </aside>
      </section>
    </main>
  );
}
