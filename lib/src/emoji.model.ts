import {
  EventEmitter,
} from "@angular/core";

import { IEmojiData } from "./data/data.interfaces";

export interface IEmoji {
  /** Renders the native unicode emoji */
  isNative: boolean;
  forceSize: boolean;
  tooltip: boolean;
  skin: 1 | 2 | 3 | 4 | 5 | 6;
  sheetSize: 16 | 20 | 32 | 64;
  set:
  | "apple"
  | "google"
  | "twitter"
  | "emojione"
  | "messenger"
  | "facebook"
  | "";
  size: number;
  emoji: string | IEmojiData;
  backgroundImageFn: (set: string, sheetSize: number) => string;
  fallback?: (data: any, props: any) => string;
  emojiOver: EventEmitter<IEmojiEvent>;
  emojiLeave: EventEmitter<IEmojiEvent>;
  emojiClick: EventEmitter<IEmojiEvent>;
}

export interface IEmojiEvent {
  emoji: IEmojiData;
  $event: Event;
}
