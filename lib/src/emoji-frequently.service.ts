import { Injectable } from "@angular/core";
import * as appSettings from "tns-core-modules/application-settings";

@Injectable({ providedIn: "root" })
export class EmojiFrequentlyService {
  public NAMESPACE = "emoji-mart";
  public frequently: { [key: string]: number } | null = null;
  public defaults: { [key: string]: number } = {};
  public initialized = false;
  public DEFAULTS = ["1f44d", "1f60e", "1f605", "1f602", "1f600"];

  public init() {
    this.frequently = JSON.parse(appSettings.getString(`${this.NAMESPACE}.frequently`) || "null");
    this.initialized = true;
  }
  public add(emojiId: string) {
    if (!this.initialized) {
      this.init();
    }
    if (!this.frequently) {
      this.frequently = this.defaults;
    }
    if (!this.frequently[emojiId]) {
      this.frequently[emojiId] = 0;
    }
    this.frequently[emojiId] += 1;

    appSettings.setString(`${this.NAMESPACE}.last`, emojiId);
    appSettings.setString(`${this.NAMESPACE}.frequently`, JSON.stringify(this.frequently));
  }
  public get(quantity: number) {
    if (!this.initialized) {
      this.init();
    }
    if (this.frequently === null) {
      this.defaults = {};
      const result = [];

      for (let i = 0; i < this.DEFAULTS.length; i++) {
        this.defaults[this.DEFAULTS[i]] = this.DEFAULTS.length - i;
        result.push(this.DEFAULTS[i]);
      }
      return result;
    }

    const frequentlyKeys = Object.keys(this.frequently);

    const sorted = frequentlyKeys
      .sort((a, b) => this.frequently[a] - this.frequently[b])
      .reverse();
    const sliced = sorted.slice(0, quantity);

    const last = appSettings.getString(`${this.NAMESPACE}.last`);

    if (last && !sliced.includes(last)) {
      sliced.pop();
      sliced.push(last);
    }
    return sliced;
  }
}
