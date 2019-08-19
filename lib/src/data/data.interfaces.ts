import { IEmoji } from "../emoji.model";

export interface IEmojiCategory {
  id: string;
  name: string;
  emojis: any[] | null;
  anchor?: boolean;
  first?: boolean;
}

export interface ICompressedEmojiData {
  name: string;
  unified: string;
  shortName: string;
  shortNames?: string[];
  sheet: [number, number];
  keywords?: string[];
  hidden?: string[];
  emoticons?: string[];
  text?: string;
  skinVariations?: IEmojiVariation[];
  obsoletedBy?: string;
  obsoletes?: string;
}

export interface IEmojiData {
  id: string;
  name: string;
  unified?: string;
  shortName: string;
  shortNames: string[];
  sheet: [number, number];
  keywords: string[];
  hidden: string[];
  emoticons: string[];
  text: string;
  set?: IEmoji["set"];
  skinVariations: IEmojiVariation[];
  obsoletedBy?: string;
  obsoletes?: string;
  skinTone?: IEmoji["skin"];
  custom?: boolean;
  native?: string;
  imageUrl?: string;
  colons?: string;
  skin?: IEmoji["skin"];
  spriteUrl?: string;
  sheetRows?: string;
}

export interface IEmojiVariation {
  unified: string;
  sheet: [number, number];
  hidden?: string[];
}

export interface ISkinData {
  name: string;
  unified: string;
  shortName: string;
  hidden: string[];
  sheet: [number, number];
}
