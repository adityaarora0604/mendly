// lib/static-dashboard-data.ts
export type Activity = {
    id: string;
    userId?: string;
    type: string;
    name: string;
    description?: string | null;
    timestamp: string;
    duration?: number | null;
    completed?: boolean;
    moodScore?: number | null;
    moodNote?: string | null;
    createdAt?: string;
    updatedAt?: string;
  };
  
  const KEY = "mendly_activities_v1";
  
  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) as Activity[] : [];
    } catch {
      return [];
    }
  }
  function write(data: Activity[]) {
    localStorage.setItem(KEY, JSON.stringify(data));
  }
  
  export async function getUserActivities(_userId = "default-user"): Promise<Activity[]> {
    const data = read();
    // return last 7 items (or mock if empty)
    if (data.length === 0) {
      const now = new Date().toISOString();
      const sample: Activity[] = [
        { id: "a1", userId: _userId, type: "mood", name: "Morning mood", timestamp: now, moodScore: 72, completed: true, createdAt: now, updatedAt: now },
      ];
      write(sample);
      return sample;
    }
    return data;
  }
  
  export async function saveMoodData(payload: { userId: string; mood: number; note?: string }) {
    const data = read();
    const now = new Date().toISOString();
    data.unshift({
      id: `m-${Date.now()}`,
      userId: payload.userId,
      type: "mood",
      name: "Mood check",
      timestamp: now,
      moodScore: payload.mood,
      moodNote: payload.note ?? null,
      completed: true,
      createdAt: now,
      updatedAt: now,
    });
    write(data);
    return { ok: true };
  }
  
  export async function logActivity(payload: { userId?: string; type: string; name: string; description?: string; duration?: number }) {
    const data = read();
    const now = new Date().toISOString();
    data.unshift({
      id: `act-${Date.now()}`,
      userId: payload.userId || "default-user",
      type: payload.type,
      name: payload.name,
      description: payload.description || null,
      timestamp: now,
      duration: payload.duration ?? null,
      completed: true,
      createdAt: now,
      updatedAt: now,
    });
    write(data);
    return { ok: true };
  }
  