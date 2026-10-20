// components/activities/activity-logger.tsx
import React from "react";
import { Button } from "@/components/ui/button";

export function ActivityLogger({ open, onOpenChange, onActivityLogged }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      <div className="w-full max-w-md bg-background p-4 rounded-lg border">
        <h4 className="font-semibold">Activity Logger (mock)</h4>
        <p className="text-sm text-muted-foreground">Log an activity (mock).</p>
        <div className="mt-3 flex justify-end gap-2">
          <Button
            onClick={() => {
              onActivityLogged?.();
              onOpenChange?.(false);
            }}
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
