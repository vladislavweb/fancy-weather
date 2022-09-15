export enum Scale {
    FAR = "far",
    CEL = "cel",
}

export enum Language {
    RU = "ru",
    EN = "en",
    UA = "ua",
}

export type LanguageKeys = keyof typeof Language;

export interface Weather {
    img: string;
    description: string;
    avgTemp: number;
}
