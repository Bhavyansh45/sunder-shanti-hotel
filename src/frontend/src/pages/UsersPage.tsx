import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { TableSkeleton } from "@/components/ui/LoadingSkeleton";
import { PageHeader } from "@/components/ui/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth, useIsAdmin, useUsers } from "@/lib/hooks";
import {
  useAddUser,
  useDeactivateUser,
  useUpdateUserRole,
} from "@/lib/mutations";
import { UserRole } from "@/lib/types";
import type { StaffUser } from "@/lib/types";
import { formatDate } from "@/lib/utils-hotel";
import { Principal } from "@icp-sdk/core/principal";
import { RefreshCw, ShieldAlert, UserPlus, UserX, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// ─── Add User Sheet ───────────────────────────────────────────────────────────

interface AddUserSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function AddUserSheet({ open, onOpenChange }: AddUserSheetProps) {
  const addUser = useAddUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [principalText, setPrincipalText] = useState("");
  const [role, setRole] = useState<UserRole>(UserRole.Staff);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate(): Record<string, string> {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Name is required";
    if (!email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "Enter a valid email";
    if (!principalText.trim()) errs.principal = "Principal is required";
    else {
      try {
        Principal.fromText(principalText.trim());
      } catch {
        errs.principal = "Invalid Internet Identity principal format";
      }
    }
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    try {
      await addUser.mutateAsync({
        principal: Principal.fromText(principalText.trim()),
        name: name.trim(),
        email: email.trim(),
        role,
      });
      toast.success("User added successfully");
      onOpenChange(false);
      setName("");
      setEmail("");
      setPrincipalText("");
      setRole(UserRole.Staff);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to add user");
    }
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <SheetTitle className="font-display">Add Staff Member</SheetTitle>
          <SheetDescription>
            Grant a new user access to Sunder Shanti Hotel system.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="user-name">
                Full Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="user-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Priya Sharma"
                data-ocid="add-user-name"
                aria-invalid={!!errors.name}
              />
              {errors.name && (
                <p className="text-xs text-destructive">{errors.name}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="user-email">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="user-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="priya@example.com"
                data-ocid="add-user-email"
                aria-invalid={!!errors.email}
              />
              {errors.email && (
                <p className="text-xs text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="user-principal">
                Internet Identity Principal{" "}
                <span className="text-destructive">*</span>
              </Label>
              <Input
                id="user-principal"
                value={principalText}
                onChange={(e) => setPrincipalText(e.target.value)}
                placeholder="xxxxx-xxxxx-xxxxx-xxxxx-cai"
                className="font-mono text-xs"
                data-ocid="add-user-principal"
                aria-invalid={!!errors.principal}
              />
              {errors.principal ? (
                <p className="text-xs text-destructive">{errors.principal}</p>
              ) : (
                <p className="text-xs text-muted-foreground">
                  The user must log in with the Internet Identity matching this
                  Principal.
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>
                Role <span className="text-destructive">*</span>
              </Label>
              <RadioGroup
                value={role}
                onValueChange={(v) => setRole(v as UserRole)}
                className="flex gap-6"
                data-ocid="add-user-role"
              >
                <div className="flex items-center gap-2">
                  <RadioGroupItem value={UserRole.Staff} id="role-staff" />
                  <Label
                    htmlFor="role-staff"
                    className="cursor-pointer font-normal"
                  >
                    Staff
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <RadioGroupItem value={UserRole.Admin} id="role-admin" />
                  <Label
                    htmlFor="role-admin"
                    className="cursor-pointer font-normal"
                  >
                    Admin
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <div className="rounded-lg bg-muted/60 border border-border px-4 py-3 text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Note:</span> The
              user must log in with the Internet Identity matching this
              Principal to access the system.
            </div>
          </div>

          <SheetFooter className="mt-8 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={addUser.isPending}
              data-ocid="add-user-submit"
            >
              {addUser.isPending ? "Adding…" : "Add User"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

// ─── Change Role Dialog ───────────────────────────────────────────────────────

interface ChangeRoleDialogProps {
  user: StaffUser | null;
  onClose: () => void;
}

function ChangeRoleDialog({ user, onClose }: ChangeRoleDialogProps) {
  const updateRole = useUpdateUserRole();
  const newRole =
    user?.role === UserRole.Admin ? UserRole.Staff : UserRole.Admin;

  async function handleConfirm() {
    if (!user) return;
    try {
      await updateRole.mutateAsync({
        principal: user.principal,
        role: newRole,
      });
      toast.success(`${user.name}'s role updated to ${newRole}`);
      onClose();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update role");
    }
  }

  return (
    <Dialog open={!!user} onOpenChange={(open) => !open && onClose()}>
      <DialogContent data-ocid="change-role-dialog">
        <DialogHeader>
          <DialogTitle className="font-display">Change Role</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground py-2">
          Change{" "}
          <span className="font-medium text-foreground">{user?.name}</span>
          's role to{" "}
          <span className="font-medium text-foreground">{newRole}</span>?
        </p>
        <DialogFooter className="gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={updateRole.isPending}
            data-ocid="change-role-confirm"
          >
            {updateRole.isPending ? "Updating…" : `Set as ${newRole}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Badges ───────────────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: UserRole }) {
  if (role === UserRole.Admin) {
    return (
      <Badge
        className="bg-accent/20 text-accent-foreground border-accent/40 font-medium"
        variant="outline"
      >
        Admin
      </Badge>
    );
  }
  return (
    <Badge
      className="bg-primary/15 text-primary border-primary/30 font-medium"
      variant="outline"
    >
      Staff
    </Badge>
  );
}

function StatusBadge({ isActive }: { isActive: boolean }) {
  if (isActive) {
    return (
      <Badge
        className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium"
        variant="outline"
      >
        Active
      </Badge>
    );
  }
  return (
    <Badge
      className="bg-muted text-muted-foreground border-border font-medium"
      variant="outline"
    >
      Inactive
    </Badge>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UsersPage() {
  const { data: users, isLoading } = useUsers();
  const { data: isAdmin } = useIsAdmin();
  const { principal } = useAuth();

  const [addOpen, setAddOpen] = useState(false);
  const [changeRoleTarget, setChangeRoleTarget] = useState<StaffUser | null>(
    null,
  );
  const [deactivateTarget, setDeactivateTarget] = useState<StaffUser | null>(
    null,
  );
  const deactivate = useDeactivateUser();

  const currentPrincipalText = principal?.toText();
  const bootstrapNotice = !isLoading && users && users.length <= 1;

  async function handleDeactivate() {
    if (!deactivateTarget) return;
    try {
      await deactivate.mutateAsync(deactivateTarget.principal);
      const action = deactivateTarget.isActive ? "deactivated" : "reactivated";
      toast.success(`${deactivateTarget.name} ${action} successfully`);
      setDeactivateTarget(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Action failed");
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      <PageHeader
        title="Staff Users"
        description="Manage hotel staff access and permissions"
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Users" },
        ]}
        action={
          isAdmin ? (
            <Button onClick={() => setAddOpen(true)} data-ocid="add-user-btn">
              <UserPlus size={16} className="mr-2" />
              Add User
            </Button>
          ) : undefined
        }
      />

      <div className="flex-1 p-6">
        {bootstrapNotice && (
          <div
            className="mb-5 flex items-start gap-3 rounded-lg border border-primary/30 bg-primary/10 px-4 py-3.5 text-sm"
            data-ocid="bootstrap-notice"
            role="alert"
          >
            <ShieldAlert size={18} className="text-primary mt-0.5 shrink-0" />
            <p className="text-foreground">
              <span className="font-semibold">You are the first admin.</span>{" "}
              Add staff members to grant them access to the system.
            </p>
          </div>
        )}

        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-subtle">
          {isLoading ? (
            <TableSkeleton rows={5} cols={6} />
          ) : !users || users.length === 0 ? (
            <EmptyState
              icon={<Users size={28} />}
              title="No staff users yet"
              description="Add your first staff member to grant them access to the hotel system."
              action={{
                label: "Add User",
                onClick: () => setAddOpen(true),
                dataOcid: "empty-state-add-user",
              }}
            />
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead className="font-semibold text-foreground">
                    Name
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Email
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Role
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Status
                  </TableHead>
                  <TableHead className="font-semibold text-foreground">
                    Added
                  </TableHead>
                  <TableHead className="font-semibold text-foreground text-right">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => {
                  const isSelf =
                    user.principal.toText() === currentPrincipalText;
                  return (
                    <TableRow
                      key={user.principal.toText()}
                      className="hover:bg-muted/20 transition-colors"
                      data-ocid="user-row"
                    >
                      <TableCell className="font-medium">
                        <span className="flex items-center gap-2 min-w-0">
                          <span className="truncate">{user.name}</span>
                          {isSelf && (
                            <span className="text-xs text-muted-foreground font-normal shrink-0">
                              (You)
                            </span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="text-muted-foreground truncate max-w-[180px]">
                        {user.email}
                      </TableCell>
                      <TableCell>
                        <RoleBadge role={user.role} />
                      </TableCell>
                      <TableCell>
                        <StatusBadge isActive={user.isActive} />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-3 text-xs"
                            onClick={() => setChangeRoleTarget(user)}
                            disabled={isSelf}
                            data-ocid="change-role-btn"
                            title={
                              isSelf
                                ? "Cannot change your own role"
                                : "Change role"
                            }
                            aria-label={`Change role for ${user.name}`}
                          >
                            <RefreshCw size={13} className="mr-1.5" />
                            {user.role === UserRole.Admin
                              ? "Set Staff"
                              : "Set Admin"}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className={`h-8 px-3 text-xs ${
                              user.isActive
                                ? "text-destructive hover:text-destructive hover:bg-destructive/10"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                            onClick={() => setDeactivateTarget(user)}
                            disabled={isSelf}
                            data-ocid="deactivate-btn"
                            title={
                              isSelf
                                ? "Cannot deactivate yourself"
                                : user.isActive
                                  ? "Deactivate user"
                                  : "Reactivate user"
                            }
                            aria-label={
                              user.isActive
                                ? `Deactivate ${user.name}`
                                : `Reactivate ${user.name}`
                            }
                          >
                            <UserX size={13} className="mr-1.5" />
                            {user.isActive ? "Deactivate" : "Reactivate"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <AddUserSheet open={addOpen} onOpenChange={setAddOpen} />

      <ChangeRoleDialog
        user={changeRoleTarget}
        onClose={() => setChangeRoleTarget(null)}
      />

      <ConfirmDialog
        open={!!deactivateTarget}
        onOpenChange={(open) => !open && setDeactivateTarget(null)}
        title={
          deactivateTarget?.isActive ? "Deactivate User" : "Reactivate User"
        }
        description={
          deactivateTarget?.isActive
            ? `Deactivate ${deactivateTarget?.name}? They will no longer be able to access the system.`
            : `Reactivate ${deactivateTarget?.name}? They will regain access to the system.`
        }
        confirmLabel={deactivateTarget?.isActive ? "Deactivate" : "Reactivate"}
        variant={deactivateTarget?.isActive ? "destructive" : "default"}
        onConfirm={handleDeactivate}
        loading={deactivate.isPending}
      />
    </div>
  );
}
