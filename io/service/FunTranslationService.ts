import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";
import { BaseTranslationRepo } from "../repo/BaseTranslationRepo";
import type { TranslationResponse } from "../repo/BaseTranslationRepo";
import YodaTranslationRepo from "../repo/YodaTranslationRepo";
import PirateTranslationRepo from "../repo/PirateTranslationRepo";
import MinionTranslationRepo from "../repo/MinionTranslationRepo";
import { fromDto } from "../codec/fun-translation";

export interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}

class DefaultFunTranslationService implements FunTranslationService {
  private repo: BaseTranslationRepo;

  constructor(repo: BaseTranslationRepo) {
    this.repo = repo;
  }

  async getTranslation(text: string): Promise<Translation> {
    const response = await this.repo.getTranslation(text);
    const payload = await response.json();

    return fromDto(payload, this.repo.engine);
  }
}

// Repository mapping for the generic factory
const repoMap: Record<Engine, new () => BaseTranslationRepo> = {
  yoda: YodaTranslationRepo,
  pirate: PirateTranslationRepo,
  minion: MinionTranslationRepo,
};

// Generic factory function
const createTranslationServiceForEngine = (
  engine: Engine
): DefaultFunTranslationService => {
  const RepoClass = repoMap[engine];
  const repo = new RepoClass();
  return new DefaultFunTranslationService(repo);
};

// Convenience functions for common translations
const createYodaTranslationService = () =>
  createTranslationServiceForEngine("yoda");
const createPirateTranslationService = () =>
  createTranslationServiceForEngine("pirate");
const createMinionTranslationService = () =>
  createTranslationServiceForEngine("minion");

export {
  DefaultFunTranslationService,
  createTranslationServiceForEngine,
  createYodaTranslationService,
  createPirateTranslationService,
  createMinionTranslationService,
};
