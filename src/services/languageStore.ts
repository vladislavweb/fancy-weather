import Store from "./store";

import { Language } from "types/settings";

const LanguageStore = new Store<Language>("language", Language.EN);

export default LanguageStore;
