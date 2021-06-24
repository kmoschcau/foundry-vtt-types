import { ConfiguredDocumentClass } from '../../../../../types/helperTypes';

declare global {
  /**
   * The Application responsible for configuring a single User document.
   * @typeParam P - the type of the options object
   */
  class UserConfig<
    P extends DocumentSheet.Options = Options,
    Data extends object = UserConfig.Data<P>
  > extends DocumentSheet<P, Data, InstanceType<ConfiguredDocumentClass<typeof User>>> {
    /** @override */
    static get defaultOptions(): Options;

    /** @override */
    get title(): string;

    /** @override */
    getData(options?: Application.RenderOptions): Data;

    /** @override */
    activateListeners(html: JQuery): void;

    /**
     * Handle changing the user avatar image by opening a FilePicker
     */
    protected _onEditAvatar(event: JQuery.ClickEvent): ReturnType<FilePicker['browse']>;

    /**
     * @remarks This method not overridden in foundry but added to provide types when overriding the UserConfig.
     */
    protected _updateObject(event: Event, formData: FormData): ReturnType<User['update']>;
  }

  namespace UserConfig {
    interface Data<Options extends DocumentSheet.Options> {
      user: InstanceType<ConfiguredDocumentClass<typeof User>>;
      actors: InstanceType<ConfiguredDocumentClass<typeof Actor>>[];
      options: Options;
    }
  }
}

interface Options extends DocumentSheet.Options {
  /**
   * @defaultValue `["sheet", "user-config"]`
   */
  classes: DocumentSheet.Options['classes'];

  /**
   * @defaultValue `"templates/user/user-config.html"`
   */
  template: DocumentSheet.Options['template'];

  /**
   * @defaultValue `400`
   */
  width: DocumentSheet.Options['width'];

  /**
   * @defaultValue `auto`
   */
  height: DocumentSheet.Options['height'];
}

type FormData = Pick<foundry.data.UserData, 'avatar' | 'character' | 'color'>;