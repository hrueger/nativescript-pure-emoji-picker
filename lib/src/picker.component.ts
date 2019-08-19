import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { categories } from "./data/categories";
import { IEmojiCategory } from "./data/data.interfaces";
import { EmojiFrequentlyService } from "./emoji-frequently.service";
import { IEmoji, IEmojiEvent } from "./emoji.model";
import { EmojiService } from "./emoji.service";

import * as appSettings from "tns-core-modules/application-settings";

const I18N: any = {
  categories: {
    activity: "Activity",
    flags: "Flags",
    foods: "Food & Drink",
    nature: "Animals & Nature",
    objects: "Objects",
    people: "Smileys & People",
    places: "Travel & Places",
    recent: "Frequently Used",
    search: "Search Results",
    symbols: "Symbols",
  },
  clear: "Clear",
  emojilist: "List of emoji",
  notfound: "No Emoji Found",
  search: "Search",
  skintones: {
    1: "Default Skin Tone",
    2: "Light Skin Tone",
    3: "Medium-Light Skin Tone",
    4: "Medium Skin Tone",
    5: "Medium-Dark Skin Tone",
    6: "Dark Skin Tone",
  },
};

@Component({
  selector: "emoji-picker",
  styleUrls: ["./picker.scss"],
  templateUrl: "./picker.component.html",

  changeDetection: ChangeDetectionStrategy.OnPush,
  preserveWhitespaces: false,
})
export class PickerComponent implements OnInit {
  @Input() public perLine = 10;
  @Input() public showEmojiPicker: boolean = false;
  @Input() public i18n: any = {};

  @Input() public color = "#2b669a";
  @Input() public hideObsolete = true;
  /** all categories shown */
  @Input() public categories: IEmojiCategory[] = [];
  /** used to temporarily draw categories */
  @Input() public activeCategories: IEmojiCategory[] = [];
  @Input() public skin: IEmoji["skin"] = 1;
  @Output() public emojiClick = new EventEmitter<any>();
  @Output() public backspaceClick = new EventEmitter<any>();
  @Output() public skinChange = new EventEmitter<IEmoji["skin"]>();

  public recent?: string[];

  public NAMESPACE = "emoji-picker";

  public RECENT_CATEGORY: IEmojiCategory = {
    emojis: null,
    id: "recent",
    name: "Recent",

  };
  public showSearch: boolean = false;
  constructor(
    private lastUsedEmojisService: EmojiFrequentlyService,
    private emojiService: EmojiService,
  ) { }

  public ngOnInit() {

    this.i18n = { ...I18N, ...this.i18n };
    this.i18n.categories = { ...I18N.categories, ...this.i18n.categories };
    this.skin =
      JSON.parse(appSettings.getString(`${this.NAMESPACE}.skin`) || "null") ||
      this.skin;

    const recentEmojis: string[] = this.lastUsedEmojisService.get(40);
    this.categories.push({ id: "recent", name: "Recent Emojis", emojis: recentEmojis });
    this.categories.push(...categories);

  }

  public changeViewTo(view) {
    alert("Multiple views are not avalible yet");
  }

  public handleSearch($emojis: any[] | null) {

    /*for (const component of this.categoryRefs.toArray()) {
      if (component.name === "Search") {
        component.emojis = $emojis;
        component.updateDisplay($emojis ? "block" : "none");
      } else {
        component.updateDisplay($emojis ? "none" : "block");
      }
    }

    this.scrollRef.nativeElement.scrollTop = 0;
    this.handleScroll();*/
  }

  public handleEmojiClick($event: IEmojiEvent) {
    this.emojiClick.emit($event);

  }
  public handleSkinChange(skin: IEmoji["skin"]) {
    this.skin = skin;
    appSettings.setString(`${this.NAMESPACE}.skin`, String(skin));
    this.skinChange.emit(skin);
  }

  public getImgSrc(emoji) {
    if (emoji) {
      return `~/assets/emoji-picker-emojis/${emoji.toLowerCase()}.png`;
    }

  }

  public onEmojiClick(emoji) {
    this.lastUsedEmojisService.add(emoji);
    this.emojiClick.emit(emoji);
  }

  public backspace() {
    this.backspaceClick.emit();
  }

  public toggleSearch() {
    this.showSearch = !this.showSearch;
  }

}
