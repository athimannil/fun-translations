import type { Engine } from "./Engine";

export interface Translation {
  originalText: string;
  translatedText: string;
  engine: Engine;
  timestamp: Date;
}
