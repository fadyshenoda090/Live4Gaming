// Client-side enrollment store using localStorage with a tiny pub/sub
// Provides: getEnrollments, isEnrolled, enroll, cancel, subscribe

const STORAGE_KEY = "l4g_enrollments";

type Subscriber = () => void;

let subscribers: Subscriber[] = [];

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed as string[];
    return [];
  } catch {
    return [];
  }
}

function write(ids: string[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(new Set(ids))));
  // notify
  subscribers.forEach((fn) => {
    try { fn(); } catch {}
  });
}

export function getEnrollments(): string[] {
  return read();
}

export function isEnrolled(tournamentId: string): boolean {
  return read().includes(tournamentId);
}

export function addEnrollment(tournamentId: string) {
  const ids = read();
  if (!ids.includes(tournamentId)) {
    ids.push(tournamentId);
    write(ids);
  }
}

export function removeEnrollment(tournamentId: string) {
  const ids = read().filter((id) => id !== tournamentId);
  write(ids);
}

export function subscribe(cb: Subscriber) {
  subscribers.push(cb);
  // Also listen to storage events across tabs
  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) cb();
  };
  window.addEventListener("storage", storageHandler);

  return () => {
    subscribers = subscribers.filter((s) => s !== cb);
    window.removeEventListener("storage", storageHandler);
  };
}
