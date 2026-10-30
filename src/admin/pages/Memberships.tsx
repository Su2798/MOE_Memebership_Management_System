import { CalendarClock, RotateCw, SearchX } from "lucide-react"
import { useState } from "react"
import { Link, useParams } from "react-router"
import {
  Button,
  Card,
  DataTable,
  DetailRow,
  Field,
  Modal,
  PageTitle,
  Pagination,
  SearchBar,
  Select,
  StatusBadge,
} from "../../components/shared/UI"
import { useAppState } from "../../state/AppState"

export function Memberships() {
  const { memberships, programs } = useAppState()
  const [query, setQuery] = useState("")
  const [status, setStatus] = useState("All")
  const [program, setProgram] = useState("All")
  const filtered = memberships.filter(
    (m) =>
      `${m.id} ${m.student}`.toLowerCase().includes(query.toLowerCase()) &&
      (status === "All" || m.status === status) &&
      (program === "All" || m.program === program),
  )
  return (
    <>
      <PageTitle
        title="Memberships"
        description="Review active, upcoming, expired, and cancelled memberships."
      />
      <Card>
        <div className="filters filters--wrap">
          <SearchBar
            value={query}
            onChange={setQuery}
            placeholder="Search membership ID or student"
          />
          <Select value={program} onChange={(e) => setProgram(e.target.value)}>
            <option>All</option>
            {programs.map((p) => (
              <option key={p.id}>{p.name}</option>
            ))}
          </Select>
          <Select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option>All</option>
            <option>Upcoming</option>
            <option>Active</option>
            <option>Expired</option>
            <option>Cancelled</option>
          </Select>
          <Field label="" type="date" aria-label="Expiry date" />
        </div>
        <DataTable
          columns={[
            "Membership ID",
            "Student",
            "Program",
            "Start date",
            "Expiry date",
            "Status",
            "Actions",
          ]}
        >
          {filtered.map((membership) => (
            <tr key={membership.id}>
              <td>
                <Link
                  className="table-link"
                  to={`/admin/memberships/${membership.id}`}
                >
                  {membership.id}
                </Link>
              </td>
              <td>
                <strong>{membership.student}</strong>
              </td>
              <td>{membership.program}</td>
              <td>{membership.start}</td>
              <td>{membership.expiry}</td>
              <td>
                <StatusBadge status={membership.status} />
              </td>
              <td>
                <Link to={`/admin/memberships/${membership.id}`}>
                  View details
                </Link>
              </td>
            </tr>
          ))}
        </DataTable>
        <Pagination />
      </Card>
    </>
  )
}

export function MembershipDetails() {
  const { id } = useParams()
  const { memberships, programs, updateMembership } = useAppState()
  const membership =
    memberships.find((item) => item.id === id) || memberships[0]
  const program =
    programs.find((item) => item.name === membership.program) || programs[0]
  const [action, setAction] = useState<"renew" | "cancel" | null>(null)
  const [reason, setReason] = useState("")
  return (
    <>
      <PageTitle
        title={membership.id}
        description={`${membership.student} · ${membership.program}`}
        actions={
          <>
            <Button
              variant="secondary"
              icon={<RotateCw size={16} />}
              onClick={() => setAction("renew")}
            >
              Renew membership
            </Button>
            <Button variant="danger" onClick={() => setAction("cancel")}>
              Cancel membership
            </Button>
          </>
        }
      />
      <div className="detail-grid">
        <Card>
          <div className="membership-header">
            <div className="membership-icon">
              <CalendarClock size={22} />
            </div>
            <div>
              <span>Membership status</span>
              <StatusBadge status={membership.status} />
            </div>
          </div>
          <div className="details">
            <DetailRow label="Membership ID" value={membership.id} />
            <DetailRow
              label="Student"
              value={
                <Link to={`/admin/students/${membership.studentId}`}>
                  {membership.student}
                </Link>
              }
            />
            <DetailRow label="Start date" value={membership.start} />
            <DetailRow label="Expiry date" value={membership.expiry} />
          </div>
        </Card>
        <Card>
          <h2>{program.name}</h2>
          <p>{program.description}</p>
          <div className="benefits">
            <strong>Membership benefits</strong>
            {program.benefits.split(", ").map((b) => (
              <span key={b}>✓ {b}</span>
            ))}
          </div>
        </Card>
      </div>
      <Card>
        <div className="card-heading">
          <div>
            <h2>Membership history</h2>
            <p>Immutable status and change timeline</p>
          </div>
        </div>
        <div className="timeline">
          {[
            ["Membership created", "01 Jan 2025 · by Daw Aye Aye"],
            [
              "Membership activated",
              "01 Jan 2025 · confirmed through Telegram",
            ],
            ["Membership renewed", "Not yet renewed"],
            [
              "Membership cancelled",
              membership.status === "Cancelled"
                ? "12 Jan 2025 · by Admin Team"
                : "No cancellation recorded",
            ],
          ].map(([title, meta], index) => (
            <div
              className={
                meta.startsWith("No") || meta.startsWith("Not")
                  ? "timeline-item timeline-item--muted"
                  : "timeline-item"
              }
              key={title}
            >
              <i>{index + 1}</i>
              <div>
                <strong>{title}</strong>
                <span>{meta}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      <Modal
        open={action === "renew"}
        onClose={() => setAction(null)}
        title="Renew membership?"
        actions={
          <>
            <Button variant="secondary" onClick={() => setAction(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                updateMembership(membership.id, {
                  expiry: "31 Dec 2026",
                  status: "Active",
                })
                setAction(null)
              }}
            >
              Confirm renewal
            </Button>
          </>
        }
      >
        <div className="modal-illustration">
          <RotateCw size={25} />
        </div>
        <p>
          A new period will start after the current expiry date. The system will
          prevent overlapping periods for this student and program.
        </p>
        <Field label="New expiry date" type="date" defaultValue="2026-12-31" />
      </Modal>
      <Modal
        open={action === "cancel"}
        onClose={() => setAction(null)}
        title="Cancel membership?"
        actions={
          <>
            <Button variant="secondary" onClick={() => setAction(null)}>
              Keep membership
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                updateMembership(membership.id, { status: "Cancelled" })
                setAction(null)
              }}
            >
              Cancel membership
            </Button>
          </>
        }
      >
        <div className="modal-illustration modal-illustration--danger">
          <SearchX size={25} />
        </div>
        <p>
          Access will end immediately. This action is recorded in the membership
          history and audit log.
        </p>
        <label className="field">
          <span>Cancellation reason (optional)</span>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Add context for the audit log"
          />
        </label>
      </Modal>
    </>
  )
}
