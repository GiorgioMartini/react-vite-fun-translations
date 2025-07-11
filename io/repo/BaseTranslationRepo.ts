import type { Engine } from "domain/types/Engine";

export interface TranslationResponse {
  json(): Promise<{
    success: { total: number };
    contents: {
      translated: string;
      text: string;
      translation: string;
    };
  }>;
}

export abstract class BaseTranslationRepo {
  protected readonly apiUrl: string;
  readonly engine: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
    this.apiUrl = `https://api.funtranslations.com/translate/${engine}.json`;
  }

  async getTranslation(text: string): Promise<TranslationResponse> {
    // Real API
    return fetch(this.apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `text=${encodeURIComponent(text)}`,
    });

    // Use mock data for development
    // const json = await import(
    //   `../mocks/api.funtranslations.com_translate_${this.engine}.json`
    // );

    // return {
    //   async json() {
    //     return json.default || json;
    //   },
    // };
  }
}
