import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";

import { EmojiSearch } from "./emoji-search.service";

let id = 0;

/*
<TextField
        [id]="inputId"
        #inputRef
        type="search"
        (keyup.enter)="handleEnterKey($event)"
        [placeholder]="i18n.search"
        [autofocus]="autoFocus"
        [(ngModel)]="query"
        (ngModelChange)="handleChange()"
         ngDefaultControl
      ></TextField>

      <Label class="emoji-mart-sr-only" [htmlFor]="inputId">
        {{ i18n.search }}
      </Label>
      <Button
        type="button"
        class="emoji-mart-search-icon"
        (click)="clear()"
        (keyup.enter)="clear()"
        [disabled]="!isSearching"
        [attr.aria-label]="i18n.clear"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          width="13"
          height="13"
          opacity="0.5"
        >
          <path [attr.d]="icon" />
        </svg>
      </Button>
*/

@Component({
  preserveWhitespaces: false,
  selector: "emoji-search",
  template: `
    <StackLayout class="emoji-mart-search">
      <Label tet="Search"></Label>
    </StackLayout>
  `,

})
export class SearchComponent implements AfterViewInit, OnInit {
  @Input() public maxResults = 75;
  @Input() public autoFocus = false;
  @Input() public i18n: any;
  @Input() public include: string[] = [];
  @Input() public exclude: string[] = [];
  @Input() public custom: any[] = [];
  @Input() public icons?: { [key: string]: string };
  @Input() public emojisToShowFilter?: (x: any) => boolean;
  @Output() public searchResults = new EventEmitter<any[]>();
  @Output() public enterKey = new EventEmitter<any>();
  public isSearching = false;
  public icon?: string;
  public query = "";
  public inputId = `emoji-mart-search-${++id}`;
  @ViewChild("inputRef", { static: true }) private inputRef!: ElementRef;

  constructor(private emojiSearch: EmojiSearch) { }

  public ngOnInit() {
    this.icon = this.icons.search;
  }
  public ngAfterViewInit() {
    if (this.autoFocus) {
      this.inputRef.nativeElement.focus();
    }
  }
  public clear() {
    this.query = "";
    this.handleSearch("");
    this.inputRef.nativeElement.focus();
  }
  public handleEnterKey($event: Event) {
    if (!this.query) {
      return;
    }
    this.enterKey.emit($event);
    $event.preventDefault();
  }
  public handleSearch(value: string) {
    if (value === "") {
      this.icon = this.icons.search;
      this.isSearching = false;
    } else {
      this.icon = this.icons.delete;
      this.isSearching = true;
    }
    const emojis = this.emojiSearch.search(
      this.query,
      this.emojisToShowFilter,
      this.maxResults,
      this.include,
      this.exclude,
      this.custom,
    );
    this.searchResults.emit(emojis);
  }
  public handleChange() {
    this.handleSearch(this.query);
  }
}
