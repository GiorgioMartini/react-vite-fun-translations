import type { Translation } from "domain/types/Translation";
import YodaTranslationRepo from "../repo/YodaTranslationRepo";
import type { Engine } from "domain/types/Engine";

interface FunTranslationService {
  getTranslation(text: string): Promise<Translation>;
}

class DefaultFunTranslationService implements FunTranslationService {
  repo: YodaTranslationRepo;

  constructor(repo: YodaTranslationRepo) {
    this.repo = repo;
  }

  async getTranslation(text: string): Promise<Translation> {
    const response = await this.repo.getTranslation(text);
    const payload = await response.json();

    return {
      text: payload.contents.translated,
      engine: "yoda" as Engine,
    };
  }
}

const createDefaultFunTranslationService = () => {
  const yodaRepo = new YodaTranslationRepo();
  const service = new DefaultFunTranslationService(yodaRepo);

  return service;
};

export { DefaultFunTranslationService, createDefaultFunTranslationService };
