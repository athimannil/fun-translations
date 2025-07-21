class CacheService {
  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      const parsed = JSON.parse(item);
      if (parsed && typeof parsed === "object" && parsed.timestamp) {
        parsed.timestamp = new Date(parsed.timestamp);
      }
      return parsed as T;
    } catch (error) {
      console.error("Failed to parse cached item:", error);
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  }

  addToEngineArray<T>(engine: string, translation: T): void {
    const current = this.get<T[]>(engine) || [];
    const updated = [translation, ...current];
    this.set(engine, updated);
  }

  removeFromEngineArray<T extends { originalText: string }>(
    engine: string,
    originalText: string
  ): void {
    const current = this.get<T[]>(engine) || [];
    const updated = current.filter((t) => t.originalText !== originalText);
    this.set(engine, updated);
  }

  removeAllEngines(engines: string[]): void {
    engines.forEach((engine) => {
      this.remove(engine);
    });
  }
}

const cacheService = new CacheService();

export default cacheService;
