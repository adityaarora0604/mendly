// app/dashboard/page.tsx
"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { format, subDays } from "date-fns";
import {
  Sparkles,
  MessageSquare,
  Heart,
  Brain,
  Trophy,
  Activity,
  Bell,
  ArrowRight,
  Loader2,
  Music,
  Waves,
  TreeDeciduous,
  Flower,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

/* -----------------------------
   Small Modal component (local)
   ----------------------------- */
function Modal({ open, onClose, title, children }: any) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl bg-background rounded-lg border border-primary/10 p-6">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-muted-foreground">✕</button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}

/* -----------------------------
   Mock session + activities
   ----------------------------- */
const useSession = () => ({ user: { name: "Anushka" } });

type Activity = {
  id: string;
  type: "mood" | "game" | "therapy" | "activity";
  name: string;
  timestamp: string;
  moodScore?: number | null;
};

const initialActivities: Activity[] = [
  { id: "a1", type: "game", name: "Breathe Calmly", timestamp: subDays(new Date(), 1).toISOString() },
];

/* -----------------------------
   Dashboard Page
   ----------------------------- */
export default function DashboardPage() {
  const { user } = useSession();
  const [now, setNow] = useState(new Date());
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  // modals
  const [openBreathing, setOpenBreathing] = useState(false);
  const [openZen, setOpenZen] = useState(false);
  const [openForest, setOpenForest] = useState(false);
  const [openOcean, setOpenOcean] = useState(false);

  // which activity card is currently selected (visual)
  const [activeActivityId, setActiveActivityId] = useState<string | null>(null);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  // derived
  const moodEntries = activities.filter((a) => a.type === "mood" && typeof a.moodScore === "number");
  const moodScore = moodEntries.length ? Math.round(moodEntries.reduce((s, a) => s + (a.moodScore || 0), 0) / moodEntries.length) : null;
  const therapySessions = activities.filter((a) => a.type === "therapy").length;
  const totalActivities = activities.length;
  const completionRate = 100;

  // handlers to log mock activities
  const addMood = (score: number) => {
    setActivities((s) => [{ id: `m-${Date.now()}`, type: "mood", name: "Mood check", timestamp: new Date().toISOString(), moodScore: score }, ...s]);
  };
  const addActivity = (name: string, type: Activity["type"] = "activity") => {
    setActivities((s) => [{ id: `x-${Date.now()}`, type, name, timestamp: new Date().toISOString() }, ...s]);
  };

  // anxiety activities config
  const activitiesList = [
    {
      id: "breathing",
      icon: Waves,
      title: "Breathing Patterns",
      desc: "Follow calming breathing exercises with visual guidance",
      duration: "5 mins",
      open: () => setOpenBreathing(true),
      audio: "/audio/breathing-bell.mp3",
    },
    {
      id: "zen",
      icon: Flower,
      title: "Zen Garden",
      desc: "Create and maintain your digital peaceful space",
      duration: "10 mins",
      open: () => setOpenZen(true),
      audio: null,
    },
    {
      id: "forest",
      icon: TreeDeciduous,
      title: "Mindful Forest",
      desc: "Take a peaceful walk through a virtual forest",
      duration: "15 mins",
      open: () => setOpenForest(true),
      audio: "/audio/forest-ambience.mp3",
    },
    {
      id: "ocean",
      icon: Waves,
      title: "Ocean Waves",
      desc: "Match your breath with gentle ocean waves",
      duration: "8 mins",
      open: () => setOpenOcean(true),
      audio: "/audio/ocean-waves.mp3",
    },
  ];

  // click handler that both opens modal and marks active UI
  const handleActivityClick = (id: string, onOpen: () => void) => {
    setActiveActivityId(id);
    onOpen();
  };

  return (
    <div className="min-h-screen bg-background">
      <Container className="pt-20 pb-12">
        {/* HERO */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight">Welcome back, {user?.name || "there"}</h1>
            <p className="mt-2 text-muted-foreground">{format(now, "EEEE, MMMM d, yyyy")}</p>
          </div>

          <div className="flex items-center gap-3">
            <button aria-label="notifications" className="inline-flex items-center justify-center h-10 w-10 rounded-lg border border-primary/10 bg-card/50 cursor-pointer">
              <Bell className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="h-full border-primary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    Quick Actions
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm">Start your wellness journey</CardDescription>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <div className="space-y-4">
                <Button
                  variant="default"
                  className={cn("w-full justify-between items-center p-6 h-auto rounded-xl", "bg-gradient-to-r from-primary/80 to-primary/60 hover:from-primary/90")}
                  onClick={() => addActivity("Therapy session", "therapy")}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                      <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold">Start Therapy</div>
                      <div className="text-xs text-muted-foreground">Begin a new session</div>
                    </div>
                  </div>
                  <ArrowRight className="w-5 h-5 text-white" />
                </Button>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      const score = Math.round(Math.random() * 100);
                      addMood(score);
                    }}
                    className="transform-gpu transition-all duration-200 rounded-lg p-4 bg-card/50 border border-primary/10 flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-primary/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mb-2">
                      <Heart className="w-5 h-5 text-rose-500" />
                    </div>
                    <div className="font-medium">Track Mood</div>
                    <div className="text-xs text-muted-foreground mt-1">How are you feeling?</div>
                  </button>

                  <button
                    onClick={() => addActivity("Quick check-in")}
                    className="transform-gpu transition-all duration-200 rounded-lg p-4 bg-card/50 border border-primary/10 flex flex-col items-center justify-center cursor-pointer hover:scale-105 hover:shadow-lg hover:ring-2 hover:ring-primary/30"
                  >
                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-2">
                      <Brain className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="font-medium">Check-in</div>
                    <div className="text-xs text-muted-foreground mt-1">Quick wellness check</div>
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Overview */}
          <Card className="border-primary/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Today's Overview</CardTitle>
                  <CardDescription className="text-sm">Your wellness metrics for {format(new Date(), "MMMM d, yyyy")}</CardDescription>
                </div>
                <Button variant="ghost" size="icon">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-card/30 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <Brain className="w-6 h-6 text-primary" />
                    <p className="text-sm font-medium">Mood Score</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-bold">
                      {moodScore !== null ? `${moodScore}%` : "No data"}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">Today's average mood</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-card/30 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-primary" />
                    <p className="text-sm font-medium">Completion Rate</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-bold">{completionRate}%</div>
                    <p className="text-sm text-muted-foreground mt-1">Perfect completion rate</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-card/30 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <Heart className="w-6 h-6 text-primary" />
                    <p className="text-sm font-medium">Therapy Sessions</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-bold">{therapySessions}</div>
                    <p className="text-sm text-muted-foreground mt-1">Total sessions</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-card/30 border border-primary/10">
                  <div className="flex items-center gap-3">
                    <Activity className="w-6 h-6 text-primary" />
                    <p className="text-sm font-medium">Total Activities</p>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-bold">{totalActivities}</div>
                    <p className="text-sm text-muted-foreground mt-1">All logged activities</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Insights */}
          <Card className="border-primary/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-primary" />
                Insights
              </CardTitle>
              <CardDescription className="text-sm">Personalized recommendations based on your activity patterns</CardDescription>
            </CardHeader>

            <CardContent className="flex flex-col justify-center items-center py-12">
              <div className="text-center text-muted-foreground">
                <p className="mb-3">Complete more activities to receive personalized insights</p>
                <div className="opacity-60">
                  <svg width="48" height="36" viewBox="0 0 48 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 18h8l3-9 5 18 5-12 3 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Anxiety Relief Activities section */}
        <div className="mt-10">
          <Card className="border-primary/10">
            <CardHeader>
              <div>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-primary" />
                  </div>
                  Anxiety Relief Activities
                </CardTitle>
                <CardDescription className="mt-1 text-sm">Interactive exercises to help reduce stress and anxiety</CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activitiesList.map((act) => {
                  const Icon = act.icon;
                  const isActive = activeActivityId === act.id;
                  return (
                    <div
                      key={act.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => handleActivityClick(act.id, act.open)}
                      onKeyDown={(e) => { if (e.key === "Enter") handleActivityClick(act.id, act.open); }}
                      className={cn(
                        "rounded-lg p-5 flex items-center gap-4 transition-all duration-200 cursor-pointer",
                        // base styles
                        "bg-card/20 border border-primary/10",
                        // hover
                        "hover:scale-[1.02] hover:shadow-xl hover:ring-2 hover:ring-primary/25",
                        // active (selected)
                        isActive
                          ? "border-primary/70 bg-gradient-to-br from-primary/8 to-primary/4 ring-2 ring-primary/40 shadow-lg"
                          : ""
                      )}
                    >
                      <div className={cn("w-12 h-12 rounded-lg bg-card/50 flex items-center justify-center", isActive ? "ring-1 ring-primary/30" : "")}>
                        <Icon className={cn("w-6 h-6", isActive ? "text-primary" : "text-primary")} />
                      </div>
                      <div className="flex-1">
                        <div className="text-lg font-semibold">{act.title}</div>
                        <div className="text-sm text-muted-foreground mt-1">{act.desc}</div>
                        <div className="text-xs text-muted-foreground mt-3 flex items-center gap-2">
                          <Music className="w-4 h-4" />
                          <span>{act.duration}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>

      {/* ------------ Modal: Breathing Patterns ------------- */}
      <Modal open={openBreathing} onClose={() => setOpenBreathing(false)} title="Breathing Patterns">
        <BreathingExercise onComplete={() => addActivity("Breathing session")} />
      </Modal>

      {/* ------------ Modal: Zen Garden (placeholder interactive area) ------------- */}
      <Modal open={openZen} onClose={() => setOpenZen(false)} title="Zen Garden">
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="rounded-lg p-3 bg-card/40">🪨</div>
            <div className="rounded-lg p-3 bg-card/40">🌸</div>
            <div className="rounded-lg p-3 bg-card/40">🌲</div>
            <div className="rounded-lg p-3 bg-card/40">🎍</div>
          </div>
          <div className="h-56 rounded-md bg-card/30 border border-primary/8" />
          <div className="flex justify-end gap-2">
            <Button onClick={() => addActivity("Zen Garden session")}>Save Garden</Button>
            <Button variant="ghost" onClick={() => setOpenZen(false)}>Close</Button>
          </div>
        </div>
      </Modal>

      {/* ------------ Modal: Mindful Forest (audio) ------------- */}
      <Modal open={openForest} onClose={() => setOpenForest(false)} title="Mindful Forest">
        <AudioPlayer src="public/audio/forest-ambience.mp3" label="Forest ambience" onEnd={() => addActivity("Forest session")} />
      </Modal>

      {/* ------------ Modal: Ocean Waves (audio + controls) ------------- */}
      <Modal open={openOcean} onClose={() => setOpenOcean(false)} title="Ocean Waves">
        <AudioPlayer src="public/audio/ocean-waves.mp3" label="Ocean waves" onEnd={() => addActivity("Ocean session")} />
      </Modal>
    </div>
  );
}

/* -----------------------------
   BreathingExercise component
   simple inhale/hold/exhale rounds UI
   ----------------------------- */
function BreathingExercise({ onComplete }: { onComplete?: () => void }) {
  const roundsTotal = 5;
  const [round, setRound] = useState(1);
  const [phase, setPhase] = useState<"Inhale" | "Hold" | "Exhale">("Inhale");
  const [progress, setProgress] = useState(0); // 0..100
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const phaseDurations = { Inhale: 4, Hold: 4, Exhale: 6 };
    const runPhase = (p: typeof phase) => {
      let elapsed = 0;
      setPhase(p);
      setProgress(0);
      timerRef.current = window.setInterval(() => {
        elapsed++;
        const pct = Math.min(100, Math.round((elapsed / phaseDurations[p]) * 100));
        setProgress(pct);
        if (elapsed >= phaseDurations[p]) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          if (p === "Inhale") runPhase("Hold");
          else if (p === "Hold") runPhase("Exhale");
          else {
            if (round >= roundsTotal) {
              setPhase("Inhale");
              setProgress(0);
              onComplete?.();
            } else {
              setRound((r) => r + 1);
              runPhase("Inhale");
            }
          }
        }
      }, 1000);
    };

    runPhase("Inhale");
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-40 h-40 rounded-full bg-card/40 flex items-center justify-center">
        <Waves className="w-12 h-12 text-primary" />
      </div>
      <div className="text-2xl font-semibold">{phase}</div>
      <div className="w-full max-w-md">
        <div className="h-3 bg-card/20 rounded-full overflow-hidden">
          <div style={{ width: `${progress}%` }} className="h-full bg-gradient-to-r from-primary to-secondary" />
        </div>
        <div className="text-center text-sm text-muted-foreground mt-2">Round {round} of {roundsTotal}</div>
      </div>
      <div className="flex gap-3">
        <Button variant="ghost" onClick={() => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } }}>Pause</Button>
      </div>
    </div>
  );
}

/* -----------------------------
   AudioPlayer component (play/pause + volume)
   ----------------------------- */
function AudioPlayer({ src, label, onEnd }: { src: string; label?: string; onEnd?: () => void }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio(src);
    const a = audioRef.current!;
    a.loop = false;
    a.volume = volume;
    const ended = () => {
      setPlaying(false);
      onEnd?.();
    };
    a.addEventListener("ended", ended);
    return () => {
      a.removeEventListener("ended", ended);
    };
  }, [src, onEnd, volume]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.volume = volume;
  }, [volume]);

  const toggle = async () => {
    if (!audioRef.current) audioRef.current = new Audio(src);
    const a = audioRef.current!;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch (e) {
        console.error("Audio play failed", e);
      }
    }
  };

  return (
    <div className="space-y-4 text-center">
      <div className="w-40 h-40 rounded-full bg-card/40 flex items-center justify-center mx-auto">
        <Music className="w-12 h-12 text-primary" />
      </div>

      <div className="flex items-center justify-center gap-6">
        <div className="text-sm text-muted-foreground">Volume</div>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-64"
        />
        <div className="text-sm text-muted-foreground">{Math.round(volume * 100)}%</div>
      </div>

      <div className="mt-2 flex items-center justify-center gap-4">
        <Button onClick={toggle}>{playing ? "Pause" : "Play"}</Button>
        <Button variant="ghost" onClick={() => { if (audioRef.current) { audioRef.current.currentTime = 0; audioRef.current.pause(); setPlaying(false); } }}>Stop</Button>
      </div>
    </div>
  );
}
