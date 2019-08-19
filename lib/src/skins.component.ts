import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { IEmoji } from "./emoji.model";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "emoji-skins",
  template: `
    <StackLayout
      class="emoji-mart-skin-swatches"
      [class.emoji-mart-skin-swatches-opened]="opened"
    >
      <Label
        *ngFor="let skinTone of skinTones"
        class="emoji-mart-skin-swatch"
        [class.emoji-mart-skin-swatch-selected]="skinTone === skin"
      >
        <Label
          (click)="this.handleClick(skinTone)"
          (keyup.enter)="handleClick(skinTone)"
          (keyup.space)="handleClick(skinTone)"
          class="emoji-mart-skin emoji-mart-skin-tone-{{ skinTone }}"
          role="button"
          [tabIndex]="tabIndex(skinTone)"
          [attr.aria-hidden]="!isVisible(skinTone)"
          [attr.aria-pressed]="pressed(skinTone)"
          [attr.aria-haspopup]="!!isSelected(skinTone)"
          [attr.aria-expanded]="expanded(skinTone)"
          [attr.aria-label]="i18n.skintones[skinTone]"
          [title]="i18n.skintones[skinTone]"
        ></Label>
      </Label>
    </StackLayout>
  `,

  preserveWhitespaces: false,
})
export class SkinComponent {
  /** currently selected skin */
  @Input() public skin?: IEmoji["skin"];
  @Input() public i18n: any;
  @Output() public changeSkin = new EventEmitter<number>();
  public opened = false;
  public skinTones = [1, 2, 3, 4, 5, 6];

  public toggleOpen() {
    this.opened = !this.opened;
  }

  public isSelected(skinTone: IEmoji["skin"]): boolean {
    return skinTone === this.skin;
  }

  public isVisible(skinTone: IEmoji["skin"]): boolean {
    return this.opened || this.isSelected(skinTone);
  }

  public pressed(skinTone: IEmoji["skin"]) {
    return this.opened ? !!this.isSelected(skinTone) : "";
  }

  public tabIndex(skinTone: IEmoji["skin"]) {
    return this.isVisible(skinTone) ? "0" : "";
  }

  public expanded(skinTone: IEmoji["skin"]) {
    return this.isSelected(skinTone) ? this.opened : "";
  }

  public handleClick(skin: number) {
    if (!this.opened) {
      this.opened = true;
      return;
    }
    this.opened = false;
    if (skin !== this.skin) {
      this.changeSkin.emit(skin);
    }
  }
}
