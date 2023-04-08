import Store from "./store";

import { Scale } from "types/settings";

const ScaleStore = new Store<Scale>("scale", Scale.CEL);

export default ScaleStore;
