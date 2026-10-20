// components/games/anxiety-games.tsx
import React from "react";
import { Button } from "@/components/ui/button";

export function AnxietyGames({ onGamePlayed }: { onGamePlayed?: (name: string, desc: string) => void }) {
  return (
    <div className="rounded-lg p-4 bg-card/50 border border-primary/8">
      <h4 className="font-semibold">Anxiety Games (mock)</h4>
      <p className="text-sm text-muted-foreground">Interactive mini-games placeholder.</p>
      <div className="mt-3 flex gap-2">
        <Button onClick={() => onGamePlayed?.("Breathing Game", "3 minute breathing")}>Play</Button>
      </div>
    </div>
  );
}
