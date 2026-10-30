import {
  Bell,
  BookOpenCheck,
  ChevronRight,
  ChevronsUpDown,
  ClipboardList,
  ExternalLink,
  FileBarChart,
  GraduationCap,
  LayoutDashboard,
  Menu,
  Search,
  Send,
  Settings,
  Users,
  X,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { NavLink, Outlet, useLocation } from "react-router"
import { Toast } from "../components/shared/UI"
import { useAppState } from "../state/AppState"

type NavItem = {
  to: string
  label: string
  icon: LucideIcon
  end?: boolean
  count?: "students" | "invitations"
}

const navigation: { group: string; items: NavItem[] }[] = [
  {
    group: "Overview",
    items: [
      { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
    ],
  },
  {
    group: "People",
    items: [
      { to: "/admin/students", label: "Students", icon: Users, count: "students" },
      { to: "/admin/memberships", label: "Memberships", icon: BookOpenCheck },
      {
        to: "/admin/invitations",
        label: "Invitations",
        icon: Send,
        count: "invitations",
      },
    ],
  },
  {
    group: "Catalog",
    items: [
      {
        to: "/admin/programs",
        label: "Membership Programs",
        icon: GraduationCap,
      },
    ],
  },
  {
    group: "Insights",
    items: [
      { to: "/admin/reports", label: "Reports", icon: FileBarChart },
      { to: "/admin/audit-logs", label: "Audit Logs", icon: ClipboardList },
    ],
  },
  {
    group: "System",
    items: [{ to: "/admin/settings", label: "Admin Settings", icon: Settings }],
  },
]

const sections: Record<string, { title: string; group: string }> = {
  "": { title: "Dashboard", group: "Overview" },
  students: { title: "Students", group: "People" },
  programs: { title: "Membership Programs", group: "Catalog" },
  invitations: { title: "Invitations", group: "People" },
  memberships: { title: "Memberships", group: "People" },
  reports: { title: "Reports", group: "Insights" },
  "audit-logs": { title: "Audit Logs", group: "Insights" },
  settings: { title: "Admin Settings", group: "System" },
}

export function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [lang, setLang] = useState<"EN" | "MY">("EN")
  const searchRef = useRef<HTMLInputElement>(null)
  const { pathname } = useLocation()
  const { toast, clearToast, students, invitations } = useAppState()
  const parts = pathname.split("/")
  const section = sections[parts[2] || ""] || sections[""]
  const detailId = parts[3]

  const counts = {
    students: students.length,
    invitations: invitations.filter((i) => i.status === "Pending").length,
  }

  // ⌘K / Ctrl+K focuses the global search
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  return (
    <div className="shell">
      <aside className={`rail ${mobileOpen ? "rail--open" : ""}`}>
        <div className="rail-brand">
          <div className="rail-mark" aria-hidden="true">
            <span>M</span>
          </div>
          <div className="rail-brand-copy">
            <b>MOE</b>
            <span>Membership Console</span>
          </div>
          <ChevronsUpDown size={14} className="rail-brand-switch" />
          <button
            className="rail-close"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="rail-nav" aria-label="Primary">
          {navigation.map(({ group, items }) => (
            <div className="rail-group" key={group}>
              <div className="rail-group-label">{group}</div>
              {items.map(({ to, label, icon: Icon, end, count }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rail-link ${isActive ? "is-active" : ""}`
                  }
                >
                  <Icon size={16} strokeWidth={1.75} />
                  <span>{label}</span>
                  {count && counts[count] > 0 && (
                    <em className="rail-count">{counts[count]}</em>
                  )}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="rail-foot">
          <a className="rail-preview" href="/app/invitation">
            <span className="rail-preview-dot" />
            Student app preview
            <ExternalLink size={13} />
          </a>
          <div className="rail-user">
            <div className="rail-avatar">DA</div>
            <div>
              <strong>Daw Aye Aye</strong>
              <span>Super Administrator</span>
            </div>
            <ChevronsUpDown size={14} />
          </div>
        </div>
      </aside>

      {mobileOpen && (
        <div className="rail-scrim" onClick={() => setMobileOpen(false)} />
      )}

      <main className="stage">
        <header className="masthead">
          <button
            className="masthead-menu"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          <nav className="crumbs" aria-label="Breadcrumb">
            <span className="crumbs-root">MOE</span>
            <ChevronRight size={13} />
            <span className="crumbs-group">{section.group}</span>
            <ChevronRight size={13} className="crumbs-group" />
            <span className={detailId ? "" : "crumbs-current"}>
              {section.title}
            </span>
            {detailId && (
              <>
                <ChevronRight size={13} />
                <span className="crumbs-current">{detailId}</span>
              </>
            )}
          </nav>

          <div className="masthead-tools">
            <label className="omnibox">
              <Search size={15} strokeWidth={1.75} />
              <input
                ref={searchRef}
                placeholder="Search students, memberships…"
                aria-label="Global search"
              />
              <kbd>⌘K</kbd>
            </label>

            <div className="lang-toggle" role="group" aria-label="Language">
              {(["EN", "MY"] as const).map((code) => (
                <button
                  key={code}
                  className={lang === code ? "is-on" : ""}
                  onClick={() => setLang(code)}
                  aria-pressed={lang === code}
                  title={code === "EN" ? "English" : "မြန်မာ"}
                >
                  {code}
                </button>
              ))}
            </div>

            <button className="icon-btn bell" aria-label="Notifications">
              <Bell size={16} strokeWidth={1.75} />
              <i />
            </button>

            <span className="masthead-divider" aria-hidden="true" />

            <button className="masthead-user" aria-label="Account">
              <div className="rail-avatar rail-avatar--sm">DA</div>
              <div>
                <strong>Daw Aye Aye</strong>
                <span>Administrator</span>
              </div>
            </button>
          </div>
        </header>

        <div className="stage-body">
          <Outlet />
        </div>
      </main>

      {toast && (
        <Toast message={toast.message} tone={toast.tone} onClose={clearToast} />
      )}
    </div>
  )
}
