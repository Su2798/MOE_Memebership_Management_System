import {
  ArrowUpRight,
  BookOpenCheck,
  Clock3,
  Send,
  TrendingUp,
  Users,
} from "lucide-react"
import { Link } from "react-router"
import { Card, PageTitle, StatusBadge } from "../../components/shared/UI"
import { useAppState } from "../../state/AppState"

export function Dashboard() {
  const { students, memberships, invitations } = useAppState()
  const stats = [
    {
      label: "Total Students",
      value: students.length + 1243,
      note: "+12.5% from last month",
      icon: Users,
      tone: "brand",
    },
    {
      label: "Active Memberships",
      value: memberships.filter((m) => m.status === "Active").length + 894,
      note: "+8.2% from last month",
      icon: BookOpenCheck,
      tone: "green",
    },
    {
      label: "Pending Invitations",
      value: invitations.filter((i) => i.status === "Pending").length + 22,
      note: "8 expire this week",
      icon: Send,
      tone: "amber",
    },
    {
      label: "Expiring Soon",
      value: 37,
      note: "Within the next 30 days",
      icon: Clock3,
      tone: "red",
    },
  ]
  return (
    <>
      <PageTitle
        title="Dashboard overview"
        description="Monitor membership health and recent activity."
        actions={<span className="updated">Last updated: Today, 10:42 AM</span>}
      />
      <div className="stats-grid">
        {stats.map(({ label, value, note, icon: Icon, tone }) => (
          <Card key={label} className="stat-card">
            <div className={`stat-icon stat-icon--${tone}`}>
              <Icon size={21} />
            </div>
            <div className="stat-label">{label}</div>
            <div className="stat-value">{value.toLocaleString()}</div>
            <div className="stat-note">
              <TrendingUp size={14} />
              {note}
            </div>
          </Card>
        ))}
      </div>
      <div className="dashboard-grid">
        <Card className="analytics-card">
          <div className="card-heading">
            <div>
              <h2>Membership analytics</h2>
              <p>Growth over the last 6 months</p>
            </div>
            <select>
              <option>Last 6 months</option>
              <option>This year</option>
            </select>
          </div>
          <div className="chart-area">
            <div className="y-labels">
              <span>1,000</span>
              <span>750</span>
              <span>500</span>
              <span>250</span>
              <span>0</span>
            </div>
            <div className="line-chart">
              <svg viewBox="0 0 600 210" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="area" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="var(--primary)" stopOpacity=".22" />
                    <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path
                  className="area-path"
                  d="M0,165 C80,155 90,145 130,148 S210,118 260,125 S340,88 390,100 S470,55 520,66 S570,32 600,38 L600,210 L0,210 Z"
                />
                <path
                  className="line-path"
                  d="M0,165 C80,155 90,145 130,148 S210,118 260,125 S340,88 390,100 S470,55 520,66 S570,32 600,38"
                />
              </svg>
              <div className="x-labels">
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>
                <span>Jan</span>
              </div>
            </div>
          </div>
          <div className="distribution">
            <div>
              <span className="dot dot--brand" />
              <b>Active</b>
              <strong>72%</strong>
            </div>
            <div>
              <span className="dot dot--amber" />
              <b>Upcoming</b>
              <strong>14%</strong>
            </div>
            <div>
              <span className="dot dot--gray" />
              <b>Expired</b>
              <strong>11%</strong>
            </div>
            <div>
              <span className="dot dot--red" />
              <b>Cancelled</b>
              <strong>3%</strong>
            </div>
          </div>
        </Card>
        <Card className="activity-card">
          <div className="card-heading">
            <div>
              <h2>Recent activity</h2>
              <p>Latest actions across MOE</p>
            </div>
            <Link to="/admin/audit-logs">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="activity-list">
            {[
              [
                "Thiri Aung activated a membership",
                "MOE Premium Learning · 8 min ago",
                "TA",
              ],
              [
                "Invitation created for Su Myat Noe",
                "By Daw Aye Aye · 32 min ago",
                "SM",
              ],
              [
                "Min Khant was added as a student",
                "By Admin Team · 1 hr ago",
                "MK",
              ],
              [
                "MEM-82938 membership renewed",
                "Foundation Membership · 3 hrs ago",
                "RN",
              ],
            ].map(([title, meta, initials]) => (
              <div className="activity-item" key={title}>
                <div className="activity-avatar">{initials}</div>
                <div>
                  <strong>{title}</strong>
                  <span>{meta}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <div className="card-heading">
          <div>
            <h2>Upcoming expirations</h2>
            <p>Memberships expiring within 30 days</p>
          </div>
          <Link to="/admin/memberships">
            Manage memberships <ArrowUpRight size={14} />
          </Link>
        </div>
        <div className="expiration-list">
          {[
            ["Hnin Wai Phyo", "Foundation Membership", "MEM-82938", "7 days"],
            ["Aye Chan Mon", "Career Accelerator", "MEM-82921", "12 days"],
            ["Ko Ko Naing", "MOE Premium Learning", "MEM-82884", "19 days"],
          ].map(([name, program, id, days]) => (
            <div key={id}>
              <div className="avatar avatar--soft">
                {name
                  .split(" ")
                  .map((v) => v[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div>
                <strong>{name}</strong>
                <span>
                  {program} · {id}
                </span>
              </div>
              <StatusBadge status={`Expires in ${days}`} />
            </div>
          ))}
        </div>
      </Card>
    </>
  )
}
