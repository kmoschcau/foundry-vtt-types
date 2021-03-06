/**
 * A Macro configuration sheet
 *
 * @see {@link Macro} The Macro Entity which is being configured
 */
// TODO: Remove this when `DocumentSheet` has been updated to use `foundry.abstract.Document`s instead of entities!!!
// eslint-disable-next-line
// @ts-ignore
declare class MacroConfig extends DocumentSheet<DocumentSheet.Options, MacroConfig.Data, Macro> {
  /**
   * @override
   * @defaultValue
   * ```typescript
   * mergeObject(super.defaultOptions, {
   *   classes: ["sheet", "macro-sheet"],
   *   template: "templates/sheets/macro-config.html",
   *   width: 560,
   *   height: 480,
   *   resizable: true
   * });
   * ```
   */
  static get defaultOptions(): typeof DocumentSheet['defaultOptions'];

  /**
   * @override
   */
  get id(): string;

  /**
   * @override
   */
  getData(): MacroConfig.Data;

  /**
   * @override
   */
  activateListeners(html: JQuery): void;

  /**
   * Handle changing the actor profile image by opening a FilePicker
   */
  protected _onEditImage(event: JQuery.ClickEvent): ReturnType<FilePicker['browse']>;

  /**
   * Save and execute the macro using the button on the configuration sheet
   * @param event - The originating click event
   */
  protected _onExecute(event: JQuery.ClickEvent): Promise<void>;

  /**
   * @override
   */
  protected _updateObject(event: Event, formData: MacroConfig.FormData): Promise<Macro>;
}

declare namespace MacroConfig {
  interface Data extends DocumentSheet.Data {
    macroTypes: foundry.utils.Duplicated<Game['system']['entityTypes']['Macro']>;
    macroScopes: typeof foundry.CONST['MACRO_SCOPES'];
  }

  type FormData = {
    command: string;
    img: string;
    name: string;
    type: ValueOf<typeof CONST.MACRO_TYPES>;
  };
}
