import {
  CheckCircle2,
  Download,
  KeyRound,
  Languages,
  ShieldCheck,
  UserCog,
} from "lucide-react"
import { useState } from "react"
import {
  Button,
  Card,
  DataTable,
  Field,
  PageTitle,
  SearchBar,
  Select,
  StatusBadge,
} from "../../components/shared/UI"
import { useAppState } from "../../state/AppState"

export function Reports() {
  const { memberships, invitations, programs, notify } = useAppState()
  const [applied, setApplied] = useState(false)
  const stats = [
    ["Total students", "1,248", "+12.5%"],
    ["Active memberships", "896", "+8.2%"],
    ["Expired memberships", "137", "-3.4%"],
    ["Pending invitations", "23", "8 expiring soon"],
  ]
  return (
    <>
      <PageTitle
        title="Reports"
        description="Analyze student, membership, and invitation performance."
        actions={
          <Button
            variant="secondary"
            icon={<Download size={17} />}
            onClick={() => {
              notify("Excel export is being prepared")
              window.setTimeout(
                () => notify("MOE-report-Jan-2025.xlsx is ready"),
                900,
              )
            }}
          >
            Export Excel
          </Button>
        }
      />
      <Card className="report-filters">
        <div className="form-grid form-grid--four">
          <Field label="Date from" type="date" />
          <Field label="Date to" type="date" />
          <Select label="Membership program">
            <option>All programs</option>
            {programs.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </Select>
          <Select label="Membership status">
            <option>All statuses</option>
            <option>Active</option>
            <option>Upcoming</option>
            <option>Expired</option>
          </Select>
        </div>
        <div className="filter-actions">
          <Button variant="ghost" onClick={() => setApplied(false)}>
            Reset
          </Button>
          <Button onClick={() => setApplied(true)}>Apply filters</Button>
        </div>
      </Card>
      {applied && (
        <div className="applied-banner">
          <CheckCircle2 size={18} /> Filters applied — showing January 2025
          results
        </div>
      )}
      <div className="stats-grid stats-grid--reports">
        {stats.map(([label, value, trend]) => (
          <Card className="report-stat" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{trend}</small>
          </Card>
        ))}
      </div>
      <div className="dashboard-grid">
        <Card>
          <div className="card-heading">
            <div>
              <h2>Membership status</h2>
              <p>Distribution across all programs</p>
            </div>
          </div>
          <div className="donut-wrap">
            <div className="donut">
              <div>
                <strong>1,084</strong>
                <span>Total</span>
              </div>
            </div>
            <div className="legend">
              {[
                ["Active", "83%"],
                ["Upcoming", "7%"],
                ["Expired", "8%"],
                ["Cancelled", "2%"],
              ].map(([s, v]) => (
                <div key={s}>
                  <StatusBadge status={s} />
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
          </div>
        </Card>
        <Card>
          <div className="card-heading">
            <div>
              <h2>Invitation conversion</h2>
              <p>Last 30 days</p>
            </div>
          </div>
          <div className="bar-report">
            {[
              ["Redeemed", 72],
              ["Pending", 18],
              ["Expired", 7],
              ["Revoked", 3],
            ].map(([label, val]) => (
              <div key={label}>
                <span>{label}</span>
                <div>
                  <i style={{ width: `${val}%` }} />
                </div>
                <strong>{val}%</strong>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <div className="card-heading">
          <div>
            <h2>Report data</h2>
            <p>Membership records matching current filters</p>
          </div>
        </div>
        <DataTable
          columns={[
            "Membership ID",
            "Student",
            "Program",
            "Status",
            "Start",
            "Expiry",
          ]}
        >
          {memberships.map((m) => (
            <tr key={m.id}>
              <td>{m.id}</td>
              <td>{m.student}</td>
              <td>{m.program}</td>
              <td>
                <StatusBadge status={m.status} />
              </td>
              <td>{m.start}</td>
              <td>{m.expiry}</td>
            </tr>
          ))}
        </DataTable>
        <div className="report-foot">
          {invitations.length} invitations included in this reporting period
        </div>
      </Card>
    </>
  )
}

export function AuditLogs() {
  const [query, setQuery] = useState("")
  const logs = [
    [
      "Daw Aye Aye",
      "Renewed membership",
      "Thiri Aung · MEM-82941",
      "Expiry: 31 Dec 2025",
      "Expiry: 31 Dec 2026",
      "24 Jan 2025, 10:42",
    ],
    [
      "Ko Zaw Min",
      "Updated student",
      "Min Khant · STU-1023",
      "Language: English",
      "Language: မြန်မာ",
      "24 Jan 2025, 09:18",
    ],
    [
      "Daw Aye Aye",
      "Revoked invitation",
      "Nay Lin Htet · INV-2045",
      "Status: Pending",
      "Status: Revoked",
      "23 Jan 2025, 16:22",
    ],
    [
      "Admin Team",
      "Created program",
      "Career Accelerator",
      "—",
      "Status: Active",
      "22 Jan 2025, 14:06",
    ],
  ].filter((row) => row.join(" ").toLowerCase().includes(query.toLowerCase()))
  return (
    <>
      <PageTitle
        title="Audit logs"
        description="Review administrative changes and sensitive actions."
      />
      <Card>
        <div className="filters">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search admin, action, or record"
          />
          <Field label="" type="date" aria-label="Filter audit date" />
        </div>
        <DataTable
          columns={[
            "Admin",
            "Action performed",
            "Related record",
            "Previous value",
            "Updated value",
            "Timestamp",
          ]}
        >
          {logs.map((row) => (
            <tr key={row.join()}>
              {row.map((cell, i) => (
                <td key={cell}>
                  {i === 0 || i === 1 ? <strong>{cell}</strong> : cell}
                </td>
              ))}
            </tr>
          ))}
        </DataTable>
      </Card>
    </>
  )
}

export function Settings() {
  const { notify } = useAppState()
  const [section, setSection] = useState("profile")
  return (
    <>
      <PageTitle
        title="Admin settings"
        description="Manage your profile, preferences, security, and administrator access."
      />
      <div className="settings-layout">
        <Card className="settings-nav">
          {[
            ["profile", UserCog, "Admin profile"],
            ["language", Languages, "Language preference"],
            ["security", KeyRound, "Account security"],
            ["admins", ShieldCheck, "Admin management"],
          ].map(([id, Icon, label]) => (
            <button
              key={String(id)}
              className={section === id ? "active" : ""}
              onClick={() => setSection(String(id))}
            >
              <Icon size={18} />
              {String(label)}
            </button>
          ))}
        </Card>
        <Card className="settings-panel">
          {section === "profile" && (
            <>
              <h2>Admin profile</h2>
              <p>Update the information shown to other administrators.</p>
              <div className="settings-avatar">
                <div className="profile-avatar">DA</div>
                <div>
                  <strong>Daw Aye Aye</strong>
                  <span>Super Administrator</span>
                </div>
              </div>
              <div className="form-grid">
                <Field label="Full name" defaultValue="Daw Aye Aye" />
                <Field label="Email address" defaultValue="ayeaye@moe.edu.mm" />
              </div>
              <Button onClick={() => notify("Profile changes saved")}>
                Save changes
              </Button>
            </>
          )}
          {section === "language" && (
            <>
              <h2>Language preference</h2>
              <p>Select the default language for your admin dashboard.</p>
              <div className="language-options">
                <label>
                  <input type="radio" name="language" defaultChecked />
                  <span>
                    <strong>English</strong>
                    <small>Use the dashboard in English</small>
                  </span>
                </label>
                <label>
                  <input type="radio" name="language" />
                  <span>
                    <strong>မြန်မာ</strong>
                    <small>Dashboard ကို မြန်မာဘာသာဖြင့် သုံးပါ</small>
                  </span>
                </label>
              </div>
              <Button onClick={() => notify("Language preference saved")}>
                Save preference
              </Button>
            </>
          )}
          {section === "security" && (
            <>
              <h2>Account security</h2>
              <p>Keep your administrator account protected.</p>
              <Field label="Current password" type="password" />
              <div className="form-grid">
                <Field label="New password" type="password" />
                <Field label="Confirm new password" type="password" />
              </div>
              <Button onClick={() => notify("Password updated securely")}>
                Update password
              </Button>
            </>
          )}
          {section === "admins" && (
            <>
              <div className="card-heading">
                <div>
                  <h2>Admin management</h2>
                  <p>Control who can manage MOE memberships.</p>
                </div>
                <Button onClick={() => notify("Admin invitation sent")}>
                  Invite admin
                </Button>
              </div>
              <DataTable columns={["Administrator", "Role", "Status"]}>
                <tr>
                  <td>
                    <strong>Daw Aye Aye</strong>
                    <br />
                    ayeaye@moe.edu.mm
                  </td>
                  <td>Super Administrator</td>
                  <td>
                    <StatusBadge status="Active" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Ko Zaw Min</strong>
                    <br />
                    zawmin@moe.edu.mm
                  </td>
                  <td>Membership Manager</td>
                  <td>
                    <StatusBadge status="Active" />
                  </td>
                </tr>
              </DataTable>
            </>
          )}
        </Card>
      </div>
    </>
  )
}
