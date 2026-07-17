import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";

// ─── Types ─────────────────────────────────────────────────────────────────────

export interface Permission {
  id: number;
  code: string;
  label: string;
}

export interface Role {
  id: number;
  name: string;
  slug: string;
  permissions: Permission[];
}

export interface TeamMember {
  id: string;
  full_name: string;
  email: string;
  avatar_initials: string;
  role: { id: number; name: string } | null;
  last_active: string | null;
  invite_status: "pending" | "active";
  is_active: boolean;
}

export interface InviteUserPayload {
  full_name: string;
  email: string;
  phone?: string;
  role_id: number;
  user_type?: "user" | "admin" | "super_admin";
}

export interface UpdateUserPayload {
  full_name?: string;
  email?: string;
  role_id?: number;
  is_active?: boolean;
}

export interface CreateRolePayload {
  name: string;
  permission_codes: string[];
}

// ─── Endpoints ─────────────────────────────────────────────────────────────────

export const teamAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/users/?type=team — List all back-office team members */
    getTeamMembers: build.query<ApiResponse<TeamMember[]>, void>({
      query: () => "/api/users/?type=team",
      providesTags: ["Team"],
    }),

    /** POST /api/users/invite/ — Invite a new team member */
    inviteTeamMember: build.mutation<ApiResponse<{ id: string; invite_link: string }>, InviteUserPayload>({
      query: (body) => ({
        url: "/api/users/invite/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Team"],
    }),

    /** PATCH /api/users/{id}/ — Update a team member */
    updateTeamMember: build.mutation<ApiResponse<TeamMember>, { id: string; payload: UpdateUserPayload }>({
      query: ({ id, payload }) => ({
        url: `/api/users/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Team"],
    }),

    /** DELETE /api/users/{id}/ — Remove a team member */
    deleteTeamMember: build.mutation<ApiResponse<void>, string>({
      query: (id) => ({
        url: `/api/users/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),

    /** GET /api/roles/ — List all roles with permissions */
    getRoles: build.query<ApiResponse<Role[]>, void>({
      query: () => "/api/roles/",
      providesTags: ["Roles"],
    }),

    /** POST /api/roles/ — Create a new role */
    createRole: build.mutation<ApiResponse<Role>, CreateRolePayload>({
      query: (body) => ({
        url: "/api/roles/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Roles"],
    }),

    /** PATCH /api/roles/{id}/ — Update a role */
    updateRole: build.mutation<ApiResponse<Role>, { id: number; payload: CreateRolePayload }>({
      query: ({ id, payload }) => ({
        url: `/api/roles/${id}/`,
        method: "PATCH",
        body: payload,
      }),
      invalidatesTags: ["Roles"],
    }),

    /** DELETE /api/roles/{id}/ — Delete a role (blocked if users assigned) */
    deleteRole: build.mutation<ApiResponse<void>, number>({
      query: (id) => ({
        url: `/api/roles/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Roles"],
    }),

    /** GET /api/permissions/ — List all available permissions */
    getPermissions: build.query<ApiResponse<Permission[]>, void>({
      query: () => "/api/permissions/",
      providesTags: ["Roles"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetTeamMembersQuery,
  useInviteTeamMemberMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
  useGetRolesQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
  useGetPermissionsQuery,
} = teamAPI;
