import {
  AlertTriangle,
  ArrowLeft,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleX,
  ContactRound,
  CreditCard,
  Globe2,
  LoaderCircle,
  LockKeyhole,
  RefreshCw,
  Send,
  ShieldCheck,
  UserRound,
} from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useNavigate, useParams, useSearchParams } from "react-router"
import {
  Button,
  DetailRow,
  EmptyState,
  StatusBadge,
} from "../../components/shared/UI"
import { useAppState } from "../../state/AppState"

const activeStudent = {
  name: "Thiri Aung",
  id: "STU-1024",
  phone: "+95 9 *** *** 204",
  telegram: "@thiriaung · Connected",
}

export function Invitation() {
  const navigate = useNavigate()
  return (
    <div className="invite-screen">
      <div className="mini-brand mini-brand--center">
        <div className="brand-mark">M</div>
        <div>
          <b>MOE</b>
          <span>Membership</span>
        </div>
      </div>
      <div className="welcome">
        <span>PERSONAL INVITATION</span>
        <h1>Welcome, Su Myat Noe</h1>
        <p>
          Your membership invitation is ready. Please review your information
          before joining.
        </p>
      </div>
      <div className="invite-program">
        <div className="program-symbol">
          <CreditCard size={24} />
        </div>
        <span>Membership program</span>
        <h2>MOE Premium Learning</h2>
        <p>
          Premium access to learning resources, mentorship, and member support.
        </p>
      </div>
      <div className="date-pair">
        <div>
          <CalendarDays size={18} />
          <span>Starts</span>
          <strong>01 Feb 2025</strong>
        </div>
        <div>
          <CalendarDays size={18} />
          <span>Expires</span>
          <strong>31 Jan 2026</strong>
        </div>
      </div>
      <div className="mini-benefits">
        <strong>Your benefits</strong>
        {[
          "Full learning resource library",
          "Monthly group mentoring",
          "Priority member support",
        ].map((item) => (
          <div key={item}>
            <Check size={16} />
            {item}
          </div>
        ))}
      </div>
      <div className="privacy-note">
        <ShieldCheck size={19} />
        <span>
          This personal invitation is linked to your Telegram account. Please do
          not share it.
        </span>
      </div>
      <Button
        className="button--wide button--large"
        onClick={() => navigate("/app/activation")}
      >
        Confirm & Join
      </Button>
      <a
        className="contact-link"
        href="https://t.me/"
        target="_blank"
        rel="noreferrer"
      >
        <ContactRound size={17} />
        Contact MOE Page
      </a>
    </div>
  )
}

export function ActivationLoading() {
  const navigate = useNavigate()
  useEffect(() => {
    const timer = window.setTimeout(() => navigate("/app/success"), 1800)
    return () => window.clearTimeout(timer)
  }, [navigate])
  return (
    <div className="state-screen">
      <div className="mini-brand mini-brand--center">
        <div className="brand-mark">M</div>
        <div>
          <b>MOE</b>
          <span>Membership</span>
        </div>
      </div>
      <div className="loading-orbit">
        <LoaderCircle className="spin" size={48} />
        <div>
          <LockKeyhole size={20} />
        </div>
      </div>
      <h1>Activating Your Membership...</h1>
      <p>Please wait while we confirm your membership.</p>
      <Button className="button--wide button--large" disabled>
        Processing securely
      </Button>
      <span className="state-helper">Please don’t close this window</span>
    </div>
  )
}

export function ActivationSuccess() {
  const navigate = useNavigate()
  return (
    <div className="state-screen success-screen">
      <div className="mini-brand mini-brand--center">
        <div className="brand-mark">M</div>
        <div>
          <b>MOE</b>
          <span>Membership</span>
        </div>
      </div>
      <div className="success-mark">
        <CheckCircle2 size={48} />
      </div>
      <span className="eyebrow success-text">ACTIVATION COMPLETE</span>
      <h1>Membership Activated Successfully!</h1>
      <p>Welcome to the MOE member community, Su Myat Noe.</p>
      <div className="success-summary">
        <div>
          <span>Student</span>
          <strong>Su Myat Noe</strong>
        </div>
        <div>
          <span>Program</span>
          <strong>MOE Premium Learning</strong>
        </div>
        <div>
          <span>Membership ID</span>
          <strong>MEM-82942</strong>
        </div>
        <div>
          <span>Valid period</span>
          <strong>01 Feb 2025 – 31 Jan 2026</strong>
        </div>
      </div>
      <Button
        className="button--wide button--large"
        onClick={() => navigate("/app/memberships/MEM-82941")}
      >
        View Membership
      </Button>
      <Button
        variant="secondary"
        className="button--wide button--large"
        onClick={() => navigate("/app/memberships")}
      >
        My Memberships
      </Button>
    </div>
  )
}

export function MyMemberships() {
  const { memberships } = useAppState()
  const mine = memberships.filter((m) => m.studentId === activeStudent.id)
  return (
    <div>
      <div className="mini-greeting">
        <div>
          <span>Good morning</span>
          <h1>Hi, Thiri</h1>
          <p>{activeStudent.id}</p>
        </div>
        <div className="mini-avatar">TA</div>
      </div>
      <div className="mini-stats">
        <div>
          <strong>{mine.length}</strong>
          <span>Total memberships</span>
        </div>
        <div>
          <strong>{mine.filter((m) => m.status === "Active").length}</strong>
          <span>Active now</span>
        </div>
      </div>
      <div className="section-heading">
        <div>
          <h2>My memberships</h2>
          <p>Your current and upcoming access</p>
        </div>
      </div>
      {mine.length ? (
        <div className="membership-cards">
          {mine.map((membership, index) => (
            <Link
              to={`/app/memberships/${membership.id}`}
              key={membership.id}
              className={`membership-tile ${
                index === 0 ? "membership-tile--primary" : ""
              }`}
            >
              <div className="tile-top">
                <div className="tile-logo">MOE</div>
                <StatusBadge status={membership.status} />
              </div>
              <span>MEMBERSHIP PROGRAM</span>
              <h2>{membership.program}</h2>
              <p>{membership.id}</p>
              <div className="tile-dates">
                <div>
                  <span>Start date</span>
                  <strong>{membership.start}</strong>
                </div>
                <div>
                  <span>Expiry date</span>
                  <strong>{membership.expiry}</strong>
                </div>
              </div>
              <div className="tile-action">
                View details <ChevronRight size={17} />
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No memberships yet"
          description="Your active memberships will appear here after you join."
        />
      )}
    </div>
  )
}

export function MiniMembershipDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { memberships, programs } = useAppState()
  const membership = memberships.find((m) => m.id === id) || memberships[0]
  const program =
    programs.find((p) => p.name === membership.program) || programs[0]
  return (
    <div>
      <button className="back-link" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        Membership details
      </button>
      <div className="digital-card">
        <div className="digital-card-top">
          <div className="tile-logo">MOE</div>
          <span>MEMBER CARD</span>
        </div>
        <div className="digital-name">
          <span>MEMBER</span>
          <h2>{membership.student}</h2>
          <p>{membership.program}</p>
        </div>
        <div className="digital-card-bottom">
          <div>
            <span>STUDENT ID</span>
            <strong>{membership.studentId}</strong>
          </div>
          <div>
            <span>MEMBERSHIP ID</span>
            <strong>{membership.id}</strong>
          </div>
          <StatusBadge status={membership.status} />
        </div>
      </div>
      <div className="read-only">
        <LockKeyhole size={15} />
        Membership information is read-only
      </div>
      <section className="mini-section">
        <h2>Membership period</h2>
        <div className="date-pair date-pair--plain">
          <div>
            <span>Start date</span>
            <strong>{membership.start}</strong>
          </div>
          <div>
            <span>Expiry date</span>
            <strong>{membership.expiry}</strong>
          </div>
        </div>
      </section>
      <section className="mini-section">
        <h2>About this program</h2>
        <p>{program.description}</p>
      </section>
      <section className="mini-section">
        <h2>Membership benefits</h2>
        <div className="mini-benefits mini-benefits--plain">
          {program.benefits.split(", ").map((item) => (
            <div key={item}>
              <Check size={16} />
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export function Profile() {
  const { notify } = useAppState()
  const [language, setLanguage] = useState<"English" | "မြန်မာ">("English")
  return (
    <div>
      <div className="profile-mobile">
        <div className="profile-mobile-avatar">TA</div>
        <h1>{activeStudent.name}</h1>
        <p>{activeStudent.id}</p>
        <StatusBadge status="Active" />
      </div>
      <section className="mini-section profile-details">
        <h2>Personal information</h2>
        <DetailRow label="Student name" value={activeStudent.name} />
        <DetailRow label="Student ID" value={activeStudent.id} />
        <DetailRow label="Phone number" value={activeStudent.phone} />
        <DetailRow
          label="Telegram account"
          value={
            <span className="connected">
              <CheckCircle2 size={15} /> Connected
            </span>
          }
        />
      </section>
      <section className="mini-section">
        <h2>Preferred language</h2>
        <p>Choose the language used throughout your app.</p>
        <div className="mini-language">
          <button
            className={language === "English" ? "active" : ""}
            onClick={() => {
              setLanguage("English")
              notify("Language changed to English")
            }}
          >
            <Globe2 size={18} />
            <span>
              <strong>English</strong>
              <small>English</small>
            </span>
            {language === "English" && <Check size={18} />}
          </button>
          <button
            className={language === "မြန်မာ" ? "active" : ""}
            onClick={() => {
              setLanguage("မြန်မာ")
              notify("ဘာသာစကား ပြောင်းပြီးပါပြီ")
            }}
          >
            <Globe2 size={18} />
            <span>
              <strong>မြန်မာ</strong>
              <small>Myanmar</small>
            </span>
            {language === "မြန်မာ" && <Check size={18} />}
          </button>
        </div>
      </section>
      <a
        className="contact-card"
        href="https://t.me/"
        target="_blank"
        rel="noreferrer"
      >
        <div>
          <ContactRound size={20} />
        </div>
        <span>
          <strong>Need help?</strong>
          <small>Contact the MOE Page</small>
        </span>
        <ChevronRight size={18} />
      </a>
      <div className="profile-note">
        <LockKeyhole size={15} />
        Membership details can only be updated by MOE administrators.
      </div>
    </div>
  )
}

const errors: Record<string, {
  title: string
  description: string
  icon: typeof AlertTriangle
  action?: string
}> = {
  expired: {
    title: "Invitation Expired",
    description:
      "This invitation was valid for 7 days and can no longer be used. Please ask MOE for a new invitation.",
    icon: CalendarDays,
    action: "Contact MOE Page",
  },
  revoked: {
    title: "Invitation Revoked",
    description:
      "This invitation has been cancelled by an MOE administrator. No membership was activated.",
    icon: CircleX,
    action: "Contact MOE Page",
  },
  used: {
    title: "Invitation Already Used",
    description:
      "This personal invitation was already redeemed by a different Telegram account.",
    icon: UserRound,
    action: "Contact MOE Page",
  },
  mismatch: {
    title: "Telegram Account Mismatch",
    description:
      "This invitation belongs to another Telegram account. Please open it using the account it was sent to.",
    icon: ShieldCheck,
  },
  disabled: {
    title: "Account Disabled",
    description:
      "Your student account is currently disabled, so membership access is unavailable.",
    icon: LockKeyhole,
    action: "Contact MOE Page",
  },
  network: {
    title: "Connection Problem",
    description:
      "We could not reach MOE right now. Check your connection and try again.",
    icon: RefreshCw,
    action: "Try Again",
  },
  invalid: {
    title: "Invalid Invitation Link",
    description:
      "This link is incomplete or not recognized. Please use the original personal link sent by MOE.",
    icon: AlertTriangle,
    action: "Contact MOE Page",
  },
}

export function InvitationError() {
  const [params] = useSearchParams()
  const type = params.get("type") || "invalid"
  const error = errors[type] || errors.invalid
  const Icon = error.icon
  return (
    <div className="state-screen error-screen">
      <div className="mini-brand mini-brand--center">
        <div className="brand-mark">M</div>
        <div>
          <b>MOE</b>
          <span>Membership</span>
        </div>
      </div>
      <div className="error-mark">
        <Icon size={42} />
      </div>
      <span className="eyebrow">WE COULDN’T CONTINUE</span>
      <h1>{error.title}</h1>
      <p>{error.description}</p>
      {error.action &&
        (type === "network" ? (
          <Button
            className="button--wide button--large"
            onClick={() => window.location.reload()}
            icon={<RefreshCw size={18} />}
          >
            {error.action}
          </Button>
        ) : (
          <a
            className="button button--primary button--wide button--large"
            href="https://t.me/"
            target="_blank"
            rel="noreferrer"
          >
            <Send size={18} />
            {error.action}
          </a>
        ))}
      <span className="state-helper">
        Reference: MOE-{type.toUpperCase()}-2048
      </span>
    </div>
  )
}
