import { CircleHelp, ContactRound, CreditCard, UserRound } from "lucide-react"
import { NavLink, Outlet } from "react-router"
import { Toast } from "../components/shared/UI"
import { useAppState } from "../state/AppState"

export function MiniLayout() {
  const { toast, clearToast } = useAppState()
  return (
    <div className="mini-stage">
      <div className="mini-shell">
        <header className="mini-top">
          <div className="mini-brand">
            <div className="brand-mark">M</div>
            <div>
              <b>MOE</b>
              <span>Membership</span>
            </div>
          </div>
          <CircleHelp size={21} />
        </header>
        <main className="mini-content">
          <Outlet />
        </main>
        <nav className="bottom-nav">
          <NavLink to="/app/memberships">
            <CreditCard size={20} />
            <span>Memberships</span>
          </NavLink>
          <NavLink to="/app/profile">
            <UserRound size={20} />
            <span>Profile</span>
          </NavLink>
          <a href="https://t.me/" target="_blank" rel="noreferrer">
            <ContactRound size={20} />
            <span>Contact MOE</span>
          </a>
        </nav>
      </div>
      <a className="preview-switch preview-switch--mini" href="/admin">
        Admin Preview
      </a>
      {toast && (
        <Toast message={toast.message} tone={toast.tone} onClose={clearToast} />
      )}
    </div>
  )
}

export function MiniBareLayout() {
  const { toast, clearToast } = useAppState()
  return (
    <div className="mini-stage">
      <div className="mini-shell mini-shell--bare">
        <main className="mini-content">
          <Outlet />
        </main>
      </div>
      <a className="preview-switch preview-switch--mini" href="/admin">
        Admin Preview
      </a>
      {toast && (
        <Toast message={toast.message} tone={toast.tone} onClose={clearToast} />
      )}
    </div>
  )
}
