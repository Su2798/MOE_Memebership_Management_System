import { Navigate, createBrowserRouter } from "react-router"
import { AdminLayout } from "../admin/AdminLayout"
import { Dashboard } from "../admin/pages/Dashboard"
import { InvitationPreview, Invitations } from "../admin/pages/Invitations"
import { MembershipDetails, Memberships } from "../admin/pages/Memberships"
import { AuditLogs, Reports, Settings } from "../admin/pages/Operations"
import { Programs } from "../admin/pages/Programs"
import { StudentDetails, Students } from "../admin/pages/Students"
import { MiniBareLayout, MiniLayout } from "../mini/MiniLayout"
import {
  ActivationLoading,
  ActivationSuccess,
  Invitation,
  InvitationError,
  MiniMembershipDetails,
  MyMemberships,
  Profile,
} from "../mini/pages/MiniPages"

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/admin" replace /> },
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "students", Component: Students },
      { path: "students/:id", Component: StudentDetails },
      { path: "programs", Component: Programs },
      { path: "invitations", Component: Invitations },
      { path: "invitations/:id", Component: InvitationPreview },
      { path: "memberships", Component: Memberships },
      { path: "memberships/:id", Component: MembershipDetails },
      { path: "reports", Component: Reports },
      { path: "audit-logs", Component: AuditLogs },
      { path: "settings", Component: Settings },
    ],
  },
  { path: "/app", element: <Navigate to="/app/memberships" replace /> },
  {
    Component: MiniLayout,
    children: [
      { path: "/app/memberships", Component: MyMemberships },
      { path: "/app/memberships/:id", Component: MiniMembershipDetails },
      { path: "/app/profile", Component: Profile },
    ],
  },
  {
    Component: MiniBareLayout,
    children: [
      { path: "/app/invitation", Component: Invitation },
      { path: "/app/activation", Component: ActivationLoading },
      { path: "/app/success", Component: ActivationSuccess },
      { path: "/app/error", Component: InvitationError },
    ],
  },
  { path: "*", element: <Navigate to="/admin" replace /> },
])
