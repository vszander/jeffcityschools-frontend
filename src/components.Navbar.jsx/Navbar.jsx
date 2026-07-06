import { useEffect, useState } from "react";

const SESSION_URL =
  import.meta.env.VITE_AUTH_SESSION_URL || "/api/auth/session/";

function safeCaps(session) {
  return session?.user?.capabilities || {};
}

function userLabel(session) {
  if (!session?.authenticated || !session?.user) return "Guest";

  return (
    session.user.display_name ||
    session.user.username ||
    session.user.email ||
    "User"
  );
}

export default function Navbar() {
  const [session, setSession] = useState({
    loading: true,
    authenticated: false,
    user: null,
    error: null,
  });

  useEffect(() => {
    let ignore = false;

    async function loadSession() {
      try {
        const response = await fetch(SESSION_URL, {
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`Session request failed: ${response.status}`);
        }

        const data = await response.json();

        if (!ignore) {
          setSession({
            loading: false,
            authenticated: Boolean(data.authenticated),
            user: data.user || null,
            error: null,
          });
        }
      } catch (error) {
        if (!ignore) {
          setSession({
            loading: false,
            authenticated: false,
            user: null,
            error: error.message || "Session request failed",
          });
        }
      }
    }

    loadSession();

    return () => {
      ignore = true;
    };
  }, []);

  const caps = safeCaps(session);

  return (
    <header className="site-navbar">
      <a className="brand-link" href="/">
        <span className="brand-mark">JC</span>
        <span className="brand-text">
          <strong>Jeff City Schools</strong>
          <small>Engineering Gateway</small>
        </span>
      </a>

      <nav className="nav-links" aria-label="Primary navigation">
        <a href="/">Home</a>

        {caps.can_view_curriculum && (
          <a href="https://backend.jeffcityschools.net/curriculum/">
            Curriculum
          </a>
        )}

        {caps.can_edit_curriculum && (
          <a href="https://backend.jeffcityschools.net/admin/">
            Manage Curriculum
          </a>
        )}

        {caps.can_view_iot && <a href="/iot">IoT Dashboard</a>}

        {caps.can_control_iot && <a href="/iot/control">Device Control</a>}

        {caps.can_view_substitute_plans && (
          <a href="/substitute-plans">Substitute Plans</a>
        )}

        {caps.can_access_admin && (
          <a href="https://backend.jeffcityschools.net/admin/">Admin</a>
        )}
      </nav>

      <div className="nav-session">
        {session.loading ? (
          <span className="session-pill">Checking session…</span>
        ) : session.authenticated ? (
          <span className="session-pill session-ok">{userLabel(session)}</span>
        ) : (
          <a
            className="session-pill session-login"
            href="https://backend.jeffcityschools.net/admin/login/"
          >
            Login
          </a>
        )}
      </div>
    </header>
  );
}
