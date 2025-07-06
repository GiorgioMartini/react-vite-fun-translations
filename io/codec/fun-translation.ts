import type { Translation } from "domain/types/Translation";
import type { Engine } from "domain/types/Engine";

// Define the DTO structure that matches the API response
export interface TranslationDto {
  success: {
    total: number;
  };
  contents: {
    translated: string;
    text: string;
    translation: string;
  };
}

/**
 * Transforms the API response DTO into our domain Translation type
 * @param dto The raw API response data
 * @param engine The translation engine used (comes from the repository)
 * @returns A Translation object in our domain format
 */
export const fromDto = (dto: TranslationDto, engine: Engine): Translation => {
  return {
    text: dto.contents.translated,
    engine,
  };
};
