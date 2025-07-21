import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";
import { fromDto } from "../codec/fun-translation";
import YodaTranslationRepo, {
  type YodaFunTranslationApiResponse,
} from "../repo/YodaTranslationRepo";
import cacheService from "./CacheService";
import { normalizeText } from "domain/normalizeText";

type AnyTranslationApiResponse = YodaFunTranslationApiResponse;

// Base interface for translation repositories
interface TranslationRepo<T> {
  getTranslation(text: string): Promise<T>;
}

// Map of engine names to repository constructors
const engineRepoMap: Record<
  Engine,
  () => TranslationRepo<AnyTranslationApiResponse>
> = {
  yoda: () => new YodaTranslationRepo(),
};

interface IFunTranslationService {
  getTranslation(text: string, engine: Engine): Promise<Translation>;
}

class FunTranslationService implements IFunTranslationService {
  repos: Partial<Record<Engine, TranslationRepo<AnyTranslationApiResponse>>> =
    {};

  getRepo(engine: Engine): TranslationRepo<AnyTranslationApiResponse> {
    if (!this.repos[engine]) {
      const repoFactory = engineRepoMap[engine];
      if (!repoFactory) throw new Error(`No repo for engine: ${engine}`);
      this.repos[engine] = repoFactory();
    }
    return this.repos[engine]!;
  }

  async getTranslation(text: string, engine: Engine) {
    const normalizedText = normalizeText(text);
    const translations = cacheService.get<Translation[]>(engine) || [];
    const cached = translations.find((t) => t.originalText === normalizedText);

    if (cached) {
      return cached;
    }
    const repo = this.getRepo(engine);
    const response = await repo.getTranslation(normalizedText);
    const translation = fromDto(response);
    cacheService.addToEngineArray<Translation>(engine, translation);
    return translation;
  }
}

const funTranslationService = new FunTranslationService();

export { funTranslationService };
