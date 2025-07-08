import { BaseTranslationRepo } from "./BaseTranslationRepo";

/** Fun-translations “Minion” engine. */
class MinionTranslationRepo extends BaseTranslationRepo {
  constructor() {
    super("minion");
  }
}

export default MinionTranslationRepo;
