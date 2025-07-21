class CacheService {
  get<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    const item = localStorage.getItem(key);
    if (!item) return null;
    try {
      return JSON.parse(item) as T;
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
}

const cacheService = new CacheService();

export default cacheService;
