import { Injectable } from "@angular/core";

import {
  ICompressedEmojiData,
  IEmojiData,
  IEmojiVariation,
} from "./data/data.interfaces";
import { emojis } from "./data/emojis";
import { IEmoji } from "./emoji.model";

const COLONS_REGEX = /^(?:\:([^\:]+)\:)(?:\:skin-tone-(\d)\:)?$/;
const SKINS = ["1F3FA", "1F3FB", "1F3FC", "1F3FD", "1F3FE", "1F3FF"];
export const DEFAULT_BACKGROUNDFN = (
  set: string,
  sheetSize: number,
) => "~/assets/emojis_apple_64.png";

@Injectable({ providedIn: "root" })
export class EmojiService {
  public uncompressed = false;
  public names: { [key: string]: IEmojiData } = {};
  public emojis: IEmojiData[] = [];

  constructor() {
    if (!this.uncompressed) {
      this.uncompress(emojis);
      this.uncompressed = true;
    }
  }

  public uncompress(list: ICompressedEmojiData[]) {
    this.emojis = list.map((emoji) => {
      const data: any = { ...emoji };
      if (!data.shortNames) {
        data.shortNames = [];
      }
      data.shortNames.unshift(data.shortName);
      data.id = data.shortName;
      data.native = this.unifiedToNative(data.unified);

      if (!data.skinVariations) {
        data.skinVariations = [];
      }

      if (!data.keywords) {
        data.keywords = [];
      }

      if (!data.emoticons) {
        data.emoticons = [];
      }

      if (!data.hidden) {
        data.hidden = [];
      }

      if (!data.text) {
        data.text = "";
      }

      if (data.obsoletes) {
        // get keywords from emoji that it obsoletes since that is shared
        const f = list.find((x) => x.unified === data.obsoletes);
        if (f) {
          if (f.keywords) {
            data.keywords = [...data.keywords, ...f.keywords, f.shortName];
          } else {
            data.keywords = [...data.keywords, f.shortName];
          }
        }
      }

      this.names[data.unified] = data;
      for (const n of data.shortNames) {
        this.names[n] = data;
      }
      return data;
    });
  }

  public getData(
    emoji: IEmojiData | string,
    skin?: IEmoji["skin"],
    set?: IEmoji["set"],
  ): IEmojiData | null {
    let emojiData: any;

    if (typeof emoji === "string") {
      const matches = emoji.match(COLONS_REGEX);

      if (matches) {
        emoji = matches[1];

        if (matches[2]) {
          skin = parseInt(matches[2], 10) as IEmoji["skin"];
        }
      }
      if (this.names.hasOwnProperty(emoji)) {
        emojiData = this.names[emoji];
      } else {
        return null;
      }
    } else if (emoji.id) {
      emojiData = this.names[emoji.id];
    } else if (emoji.unified) {
      emojiData = this.names[emoji.unified.toUpperCase()];
    }

    if (!emojiData) {
      emojiData = emoji;
      emojiData.custom = true;
    }

    const hasSkinVariations = emojiData.skinVariations && emojiData.skinVariations.length;
    if (hasSkinVariations && skin && skin > 1 && set) {
      emojiData = { ...emojiData };

      const skinKey = SKINS[skin - 1];
      const variationData = emojiData.skinVariations.find((n: IEmojiVariation) =>
        n.unified.includes(skinKey),
      );

      if (!variationData.hidden || !variationData.hidden.includes(set)) {
        emojiData.skinTone = skin;
        emojiData = { ...emojiData, ...variationData };
      }
      emojiData.native = this.unifiedToNative(emojiData.unified);
    }

    emojiData.set = set || "";
    return emojiData as IEmojiData;
  }

  public unifiedToNative(unified: string) {
    const codePoints = unified.split("-").map((u) => parseInt(`0x${u}`, 16));
    return String.fromCodePoint(...codePoints);
  }

  public emojiSpriteStyles(
    sheet: IEmojiData["sheet"],
    set: IEmoji["set"] = "apple",
    size: IEmoji["size"] = 24,
    sheetSize: IEmoji["sheetSize"] = 64,
    backgroundImageFn: IEmoji["backgroundImageFn"] = DEFAULT_BACKGROUNDFN,
    sheetColumns = 52,
  ) {
    return {
      "background-image": `url("${backgroundImageFn(set, sheetSize)}")`,
      "background-position": this.getSpritePosition(sheet, sheetColumns),
      "background-size": `${100 * sheetColumns}%`,
      "display": "inline-block",
      "height": `${size}px`,
      "width": `${size}px`,
    };
  }

  public getSpritePosition(sheet: IEmojiData["sheet"], sheetColumns: number) {
    const [sheetX, sheetY] = sheet;
    const multiply = 100 / (sheetColumns - 1);
    return `${multiply * sheetX}% ${multiply * sheetY}%`;
  }

  public sanitize(emoji: IEmojiData | null): IEmojiData | null {
    if (emoji === null) {
      return null;
    }
    const id = emoji.id || emoji.shortNames[0];
    let colons = `:${id}:`;
    if (emoji.skinTone) {
      colons += `:skin-tone-${emoji.skinTone}:`;
    }
    emoji.colons = colons;
    return { ...emoji };
  }

  public getSanitizedData(
    emoji: string | IEmojiData,
    skin?: IEmoji["skin"],
    set?: IEmoji["set"],
  ) {
    return this.sanitize(this.getData(emoji, skin, set));
  }
}
