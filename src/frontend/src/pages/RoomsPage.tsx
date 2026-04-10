import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BedDouble, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import { RoomStatus, RoomType } from "../backend";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
import { CurrencyDisplay } from "../components/ui/CurrencyDisplay";
import { EmptyState } from "../components/ui/EmptyState";
import { TableSkeleton } from "../components/ui/LoadingSkeleton";
import { PageHeader } from "../components/ui/PageHeader";
import { ALL_ROOM_TYPES, RoomTypeLabel } from "../components/ui/RoomTypeLabel";
import { StatusBadge } from "../components/ui/StatusBadge";
import { useIsAdmin, useRooms } from "../lib/hooks";
import { useCreateRoom, useDeleteRoom, useUpdateRoom } from "../lib/mutations";
import type { Room } from "../lib/types";

// ─── Form state ──────────────────────────────────────────────────────────────

interface RoomFormData {
  number: string;
  roomType: RoomType;
  pricePerDay: string;
  status: RoomStatus;
}

const DEFAULT_FORM: RoomFormData = {
  number: "",
  roomType: RoomType.Single,
  pricePerDay: "",
  status: RoomStatus.Available,
};

function roomToFormData(room: Room): RoomFormData {
  return {
    number: room.number,
    roomType: room.roomType,
    pricePerDay: String(room.pricePerDay),
    status: room.status,
  };
}

// ─── Room Form Sheet ──────────────────────────────────────────────────────────

interface RoomFormSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  editRoom?: Room | null;
}

function RoomFormSheet({ open, onOpenChange, editRoom }: RoomFormSheetProps) {
  const isEdit = !!editRoom;
  const [form, setForm] = useState<RoomFormData>(
    editRoom ? roomToFormData(editRoom) : DEFAULT_FORM,
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof RoomFormData, string>>
  >({});

  const createRoom = useCreateRoom();
  const updateRoom = useUpdateRoom();
  const isPending = createRoom.isPending || updateRoom.isPending;

  // Reset form when sheet opens
  const handleOpenChange = useCallback(
    (val: boolean) => {
      if (val) {
        setForm(editRoom ? roomToFormData(editRoom) : DEFAULT_FORM);
        setErrors({});
      }
      onOpenChange(val);
    },
    [editRoom, onOpenChange],
  );

  function validate(): boolean {
    const next: Partial<Record<keyof RoomFormData, string>> = {};
    if (!isEdit && !form.number.trim()) next.number = "Room number is required";
    const price = Number.parseFloat(form.pricePerDay);
    if (!form.pricePerDay || Number.isNaN(price) || price <= 0)
      next.pricePerDay = "Price must be greater than 0";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    const price = Number.parseFloat(form.pricePerDay);
    try {
      if (isEdit && editRoom) {
        await updateRoom.mutateAsync({
          id: editRoom.id,
          roomType: form.roomType,
          pricePerDay: price,
          status: form.status,
        });
        toast.success("Room updated successfully");
      } else {
        await createRoom.mutateAsync({
          number: form.number.trim(),
          roomType: form.roomType,
          pricePerDay: price,
        });
        toast.success("Room added successfully");
      }
      onOpenChange(false);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      toast.error(message);
    }
  }

  const statusOptions = isEdit
    ? [RoomStatus.Available, RoomStatus.Maintenance, RoomStatus.Occupied]
    : [RoomStatus.Available, RoomStatus.Maintenance];

  const statusLabels: Record<RoomStatus, string> = {
    [RoomStatus.Available]: "Available",
    [RoomStatus.Occupied]: "Occupied",
    [RoomStatus.Maintenance]: "Maintenance",
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="font-display">
            {isEdit ? `Edit Room ${editRoom?.number}` : "Add New Room"}
          </SheetTitle>
          <SheetDescription>
            {isEdit
              ? "Update room details below."
              : "Fill in the details to add a new room."}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5 px-1">
          {/* Room Number */}
          <div className="space-y-1.5">
            <Label htmlFor="room-number">Room Number</Label>
            {isEdit ? (
              <div
                className="h-10 flex items-center px-3 rounded-md bg-muted text-muted-foreground text-sm border border-border"
                data-ocid="room-number-readonly"
              >
                {editRoom?.number}
              </div>
            ) : (
              <>
                <Input
                  id="room-number"
                  placeholder="101"
                  value={form.number}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, number: e.target.value }))
                  }
                  aria-invalid={!!errors.number}
                  data-ocid="room-number-input"
                  autoFocus
                />
                {errors.number && (
                  <p className="text-xs text-destructive">{errors.number}</p>
                )}
              </>
            )}
          </div>

          {/* Room Type */}
          <div className="space-y-1.5">
            <Label htmlFor="room-type">Room Type</Label>
            <Select
              value={form.roomType}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, roomType: v as RoomType }))
              }
            >
              <SelectTrigger id="room-type" data-ocid="room-type-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {ALL_ROOM_TYPES.map(({ value, label }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Price Per Day */}
          <div className="space-y-1.5">
            <Label htmlFor="room-price">Price per Day</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium select-none">
                ₹
              </span>
              <Input
                id="room-price"
                type="number"
                min="1"
                step="1"
                placeholder="1500"
                className="pl-7"
                value={form.pricePerDay}
                onChange={(e) =>
                  setForm((f) => ({ ...f, pricePerDay: e.target.value }))
                }
                aria-invalid={!!errors.pricePerDay}
                data-ocid="room-price-input"
              />
            </div>
            {errors.pricePerDay && (
              <p className="text-xs text-destructive">{errors.pricePerDay}</p>
            )}
          </div>

          {/* Status */}
          <div className="space-y-1.5">
            <Label htmlFor="room-status">Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) =>
                setForm((f) => ({ ...f, status: v as RoomStatus }))
              }
            >
              <SelectTrigger id="room-status" data-ocid="room-status-select">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((s) => (
                  <SelectItem key={s} value={s}>
                    {statusLabels[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {!isEdit && (
              <p className="text-xs text-muted-foreground">
                New rooms cannot start as Occupied.
              </p>
            )}
          </div>

          <SheetFooter className="mt-8 gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
              data-ocid="room-form-cancel"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              data-ocid="room-form-submit"
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Save Changes" : "Add Room"}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function RoomsPage() {
  const { data: rooms = [], isLoading } = useRooms();
  const { data: isAdmin } = useIsAdmin();
  const deleteRoom = useDeleteRoom();
  const updateRoom = useUpdateRoom();

  // Sheet state
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editRoom, setEditRoom] = useState<Room | null>(null);

  // Delete dialog state
  const [deleteTarget, setDeleteTarget] = useState<Room | null>(null);

  // Filter state
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  // Bulk selection
  const [selectedIds, setSelectedIds] = useState<Set<bigint>>(new Set());

  // ── Filtering ──
  const filtered = useMemo(() => {
    return rooms.filter((room) => {
      const matchSearch =
        !searchQuery ||
        room.number.toLowerCase().includes(searchQuery.toLowerCase());
      const matchStatus =
        filterStatus === "all" || room.status === filterStatus;
      const matchType = filterType === "all" || room.roomType === filterType;
      return matchSearch && matchStatus && matchType;
    });
  }, [rooms, searchQuery, filterStatus, filterType]);

  // ── Handlers ──
  function openAddSheet() {
    setEditRoom(null);
    setSheetOpen(true);
  }

  function openEditSheet(room: Room) {
    setEditRoom(room);
    setSheetOpen(true);
  }

  function confirmDelete(room: Room) {
    setDeleteTarget(room);
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    try {
      await deleteRoom.mutateAsync(deleteTarget.id);
      toast.success(`Room ${deleteTarget.number} deleted`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Delete failed";
      toast.error(message);
    } finally {
      setDeleteTarget(null);
    }
  }

  // Bulk selection
  function toggleSelect(id: bigint) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function toggleSelectAll() {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((r) => r.id)));
    }
  }

  async function handleBulkStatus(status: RoomStatus) {
    const toUpdate = filtered.filter((r) => selectedIds.has(r.id));
    try {
      await Promise.all(
        toUpdate.map((r) => updateRoom.mutateAsync({ id: r.id, status })),
      );
      toast.success(
        `${toUpdate.length} room${toUpdate.length !== 1 ? "s" : ""} marked as ${status}`,
      );
      setSelectedIds(new Set());
    } catch {
      toast.error("Bulk update failed");
    }
  }

  const allSelected =
    filtered.length > 0 && selectedIds.size === filtered.length;
  const someSelected = selectedIds.size > 0 && !allSelected;

  const statusLabel: Record<RoomStatus, string> = {
    [RoomStatus.Available]: "Available",
    [RoomStatus.Occupied]: "Occupied",
    [RoomStatus.Maintenance]: "Maintenance",
  };

  return (
    <TooltipProvider>
      <div data-ocid="rooms-page">
        <PageHeader
          title="Room Management"
          description="Add, edit, and manage hotel rooms"
          action={
            isAdmin ? (
              <Button
                onClick={openAddSheet}
                data-ocid="add-room-btn"
                className="gap-2"
              >
                <Plus size={16} />
                Add Room
              </Button>
            ) : null
          }
        />

        {/* Filters */}
        <div className="px-6 py-4 bg-card border-b border-border flex flex-wrap gap-3 items-center">
          <Input
            placeholder="Search room number…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-48"
            data-ocid="room-search-input"
          />
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40" data-ocid="filter-status-select">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {Object.values(RoomStatus).map((s) => (
                <SelectItem key={s} value={s}>
                  {statusLabel[s]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40" data-ocid="filter-type-select">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {ALL_ROOM_TYPES.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span
            className="ml-auto text-sm text-muted-foreground"
            data-ocid="room-count-label"
          >
            {filtered.length} room{filtered.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {/* Bulk Actions */}
        {isAdmin && selectedIds.size > 0 && (
          <div className="px-6 py-2.5 bg-primary/5 border-b border-primary/20 flex items-center gap-3 text-sm">
            <span className="font-medium text-foreground">
              {selectedIds.size} selected
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkStatus(RoomStatus.Available)}
              data-ocid="bulk-mark-available"
              disabled={updateRoom.isPending}
            >
              Mark Available
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleBulkStatus(RoomStatus.Maintenance)}
              data-ocid="bulk-mark-maintenance"
              disabled={updateRoom.isPending}
            >
              Mark Maintenance
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setSelectedIds(new Set())}
              className="ml-auto text-muted-foreground"
            >
              Clear
            </Button>
          </div>
        )}

        {/* Table Content */}
        <div className="px-6 py-4">
          {isLoading ? (
            <div className="rounded-xl border border-border overflow-hidden bg-card">
              <TableSkeleton rows={6} cols={5} />
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<BedDouble size={32} />}
              title={
                rooms.length === 0
                  ? "No rooms yet"
                  : "No rooms match your filters"
              }
              description={
                rooms.length === 0
                  ? "Add your first room to get started."
                  : "Try adjusting your search or filter criteria."
              }
              action={
                rooms.length === 0 && isAdmin
                  ? {
                      label: "Add First Room",
                      onClick: openAddSheet,
                      dataOcid: "empty-add-room-btn",
                    }
                  : undefined
              }
            />
          ) : (
            <div className="rounded-xl border border-border overflow-hidden bg-card shadow-subtle">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    {isAdmin && (
                      <TableHead className="w-10 pl-4">
                        <Checkbox
                          checked={
                            allSelected
                              ? true
                              : someSelected
                                ? "indeterminate"
                                : false
                          }
                          onCheckedChange={toggleSelectAll}
                          aria-label="Select all rooms"
                          data-ocid="select-all-checkbox"
                        />
                      </TableHead>
                    )}
                    <TableHead className="font-semibold text-foreground">
                      Room #
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Type
                    </TableHead>
                    <TableHead className="font-semibold text-foreground text-right">
                      Price / Day
                    </TableHead>
                    <TableHead className="font-semibold text-foreground">
                      Status
                    </TableHead>
                    <TableHead className="font-semibold text-foreground text-right">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((room) => {
                    const isOccupied = room.status === RoomStatus.Occupied;
                    const isSelected = selectedIds.has(room.id);
                    return (
                      <TableRow
                        key={room.id.toString()}
                        className={`transition-colors hover:bg-muted/30 ${isSelected ? "bg-primary/5" : ""}`}
                        data-ocid={`room-row-${room.number}`}
                      >
                        {isAdmin && (
                          <TableCell className="pl-4">
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={() => toggleSelect(room.id)}
                              aria-label={`Select room ${room.number}`}
                              data-ocid={`room-checkbox-${room.number}`}
                            />
                          </TableCell>
                        )}
                        <TableCell className="font-semibold text-foreground">
                          {room.number}
                        </TableCell>
                        <TableCell>
                          <RoomTypeLabel
                            type={room.roomType}
                            className="text-sm text-muted-foreground"
                          />
                        </TableCell>
                        <TableCell className="text-right">
                          <CurrencyDisplay
                            amount={room.pricePerDay}
                            size="sm"
                          />
                        </TableCell>
                        <TableCell>
                          <StatusBadge status={room.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {isAdmin && (
                              <>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8 text-muted-foreground hover:text-foreground"
                                      onClick={() => openEditSheet(room)}
                                      aria-label={`Edit room ${room.number}`}
                                      data-ocid={`edit-room-${room.number}`}
                                    >
                                      <Pencil size={14} />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>Edit room</TooltipContent>
                                </Tooltip>

                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <span
                                      tabIndex={isOccupied ? 0 : -1}
                                      aria-label={
                                        isOccupied
                                          ? "Cannot delete occupied room"
                                          : undefined
                                      }
                                    >
                                      <Button
                                        size="icon"
                                        variant="ghost"
                                        className="h-8 w-8 text-muted-foreground hover:text-destructive disabled:opacity-40"
                                        onClick={() =>
                                          !isOccupied && confirmDelete(room)
                                        }
                                        disabled={isOccupied}
                                        aria-label={`Delete room ${room.number}`}
                                        data-ocid={`delete-room-${room.number}`}
                                      >
                                        <Trash2 size={14} />
                                      </Button>
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    {isOccupied
                                      ? "Cannot delete occupied room"
                                      : "Delete room"}
                                  </TooltipContent>
                                </Tooltip>
                              </>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </div>

        {/* Add / Edit Sheet */}
        <RoomFormSheet
          open={sheetOpen}
          onOpenChange={setSheetOpen}
          editRoom={editRoom}
        />

        {/* Delete Confirm */}
        <ConfirmDialog
          open={!!deleteTarget}
          onOpenChange={(v) => !v && setDeleteTarget(null)}
          title={`Delete Room ${deleteTarget?.number ?? ""}?`}
          description="This action cannot be undone. The room and all its data will be permanently removed."
          confirmLabel="Delete Room"
          variant="destructive"
          onConfirm={handleDelete}
          loading={deleteRoom.isPending}
        />
      </div>
    </TooltipProvider>
  );
}
