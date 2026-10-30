import {
  X,
  Search,
  Inbox,
  LoaderCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import {
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react"

export function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger"
  icon?: ReactNode
}) {
  return (
    <button className={`button button--${variant} ${className}`} {...props}>
      {icon}
      {children}
    </button>
  )
}

export function Field({
  label,
  error,
  helper,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
  helper?: string
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input className={error ? "is-error" : ""} {...props} />
      {error && <small className="field-error">{error}</small>}
      {helper && !error && <small>{helper}</small>}
    </label>
  )
}

export function TextArea({
  label,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <textarea {...props} />
    </label>
  )
}

export function Select({
  label,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string
  children: ReactNode
}) {
  const select = <select {...props}>{children}</select>
  return label ? (
    <label className="field">
      <span>{label}</span>
      {select}
    </label>
  ) : (
    select
  )
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
}: {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <div className="search">
      <Search size={17} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
      />
    </div>
  )
}

export function PageTitle({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="page-heading">
      <div>
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      {actions && <div className="heading-actions">{actions}</div>}
    </div>
  )
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <section className={`card ${className}`}>{children}</section>
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`status status--${status.toLowerCase().replaceAll(" ", "-")}`}
    >
      <i />
      {status}
    </span>
  )
}

export function Modal({
  open,
  title,
  children,
  onClose,
  actions,
  className = "",
}: {
  open: boolean
  title: string
  children: ReactNode
  onClose: () => void
  actions?: ReactNode
  className?: string
}) {
  if (!open) return null
  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <div
        className={`modal ${className}`}
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-head">
          <h2>{title}</h2>
          <Button
            variant="ghost"
            icon={<X size={19} />}
            aria-label="Close"
            onClick={onClose}
          />
        </div>
        <div className="modal-body">{children}</div>
        {actions && <div className="modal-actions">{actions}</div>}
      </div>
    </div>
  )
}

export function Toast({
  message,
  tone = "success",
  onClose,
}: {
  message: string
  tone?: "success" | "error"
  onClose: () => void
}) {
  return (
    <div className={`toast toast--${tone}`}>
      <span>{message}</span>
      <Button
        variant="ghost"
        icon={<X size={16} />}
        aria-label="Close"
        onClick={onClose}
      />
    </div>
  )
}

export function EmptyState({
  title = "Nothing here yet",
  description,
  action,
}: {
  title?: string
  description?: string
  action?: ReactNode
}) {
  return (
    <div className="empty">
      <div className="empty-icon">
        <Inbox size={25} />
      </div>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {action}
    </div>
  )
}

export function LoadingState({ title = "Loading..." }: { title?: string }) {
  return (
    <div className="loading">
      <LoaderCircle size={28} className="spin" />
      <span>{title}</span>
    </div>
  )
}

export function Pagination() {
  return (
    <div className="pagination">
      <span>Showing 1–5 of 24</span>
      <div>
        <Button
          variant="secondary"
          icon={<ChevronLeft size={16} />}
          aria-label="Previous"
        />
        <Button variant="primary">1</Button>
        <Button variant="ghost">2</Button>
        <Button variant="ghost">3</Button>
        <Button
          variant="secondary"
          icon={<ChevronRight size={16} />}
          aria-label="Next"
        />
      </div>
    </div>
  )
}

export function DataTable({
  columns,
  children,
  className = "",
}: {
  columns: string[]
  children: ReactNode
  className?: string
}) {
  return (
    <div className={`table-wrap ${className}`}>
      <table className={className ? `${className}__table` : undefined}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export function DetailRow({
  label,
  value,
}: {
  label: string
  value: ReactNode
}) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}
