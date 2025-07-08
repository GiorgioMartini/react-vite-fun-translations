export type Engine = "yoda" | "pirate";

// - To add a new engine extend the union:
// export type Engine = "yoda" | "pirate" | "starwars";

// - Add a new repo:
// io/repo/StarwarsTranslationRepo.ts
// import { BaseTranslationRepo } from "./BaseTranslationRepo";

// /** Fun-translations “Star Wars” engine. */
// export default class StarwarsTranslationRepo extends BaseTranslationRepo {
//   constructor() {
//     super("starwars");
//   }
// }

// io/service/FunTranslationService.ts
// import StarwarsTranslationRepo from "../repo/StarwarsTranslationRepo";

// const repoMap: Record<Engine, new () => BaseTranslationRepo> = {
//   yoda: YodaTranslationRepo,
//   pirate: PirateTranslationRepo,
//   starwars: StarwarsTranslationRepo,   // ← new line
// };

/* app/translate/form.tsx */
// <option value="starwars">Star Wars</option>

// Also add:
// api.funtranslations.com_translate_starwars.json
