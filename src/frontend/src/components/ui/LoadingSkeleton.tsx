import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export function TableSkeleton({ rows = 5, cols = 5 }: TableSkeletonProps) {
  const rowArr = Array.from({ length: rows }, (_, i) => i);
  const colArr = Array.from({ length: cols }, (_, i) => i);

  return (
    <div className="space-y-3 p-4" data-ocid="loading-skeleton-table">
      <div className="flex gap-4">
        {colArr.map((c) => (
          <Skeleton key={`header-${c}`} className="h-4 flex-1" />
        ))}
      </div>
      <div className="h-px bg-border" />
      {rowArr.map((r) => (
        <div key={`row-${r}`} className="flex gap-4 items-center">
          {colArr.map((c) => (
            <Skeleton
              key={`cell-${r}-${c}`}
              className={`h-4 ${c === 0 ? "w-8 flex-none" : "flex-1"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

interface CardSkeletonProps {
  count?: number;
}

export function CardSkeleton({ count = 4 }: CardSkeletonProps) {
  const items = Array.from({ length: count }, (_, i) => i);
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6"
      data-ocid="loading-skeleton-cards"
    >
      {items.map((i) => (
        <div
          key={`card-${i}`}
          className="bg-card border border-border rounded-xl p-5 space-y-3"
        >
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-3 w-32" />
        </div>
      ))}
    </div>
  );
}

export function FormSkeleton() {
  const fields = Array.from({ length: 4 }, (_, i) => i);
  return (
    <div className="space-y-5 p-6" data-ocid="loading-skeleton-form">
      {fields.map((i) => (
        <div key={`field-${i}`} className="space-y-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-10 w-full" />
        </div>
      ))}
      <Skeleton className="h-10 w-32 mt-6" />
    </div>
  );
}
