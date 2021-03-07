export {};

declare global {
  /**
   * The client-side document mixin which is used to extend the common BaseDocument.
   * This mixin provides the client-side interface for database operations and common document behaviors.
   * @mixin
   * @augments abstract.Document
   */
  export function ClientDocumentMixin<T extends ADocument>(
    Base: ConstructorOf<T>
  ): ConstructorOf<T & ClientDocumentMixin<T>>;
}

type ADocument = { data: unknown };
declare abstract class ClientDocumentMixin<T extends ADocument = any> {
  constructor(data: DeepPartial<T['data']>, context: Entity.CreateOptions);

  /**
   * A collection of Application instances which should be re-rendered whenever this document is updated.
   * The keys of this object are the application ids and the values are Application instances. Each
   * Application in this object will have its render method called by {@link Document#render}.
   * @type {Object<Application>}
   * @see {@link Document#render}
   * @memberof ClientDocumentMixin#
   */
  apps: Record<string, Application>;

  /**
   * A cached reference to the FormApplication instance used to configure this Document.
   * @type {FormApplication|null}
   * @private
   */
  _sheet: FormApplication<this> | null;

  /**
   * @see abstract.Document#_initialize
   * @memberof ClientDocumentMixin#
   */
  _initialize(): void;

  /**
   * Return a reference to the parent Collection instance which contains this Document.
   * @type {Collection}
   * @memberof ClientDocumentMixin#
   */
  get collection(): Collection<this>;

  /**
   * A reference to the Compendium Collection which contains this Document, if any, otherwise undefined.
   * @type {CompendiumCollection}
   * @name ClientDocumentMixin#compendium
   */
  get compendium(): Compendium; // CompendiumCollection;

  /**
   * Return a reference to the Folder to which this Document belongs, if any.
   * @type {Folder|null}
   * @memberof ClientDocumentMixin#
   *
   * @example <caption>A Document may belong to a Folder</caption>
   * let folder = game.folders.entities[0];
   * let actor = await Actor.create({name: "New Actor", folder: folder.id});
   * console.log(actor.data.folder); // folder.id;
   * console.log(actor.folder); // folder;
   */
  get folder(): Folder | null | undefined;

  /**
   * A boolean indicator for whether or not the current game User has ownership rights for this Document.
   * Different Document types may have more specialized rules for what constitutes ownership.
   * @type {boolean}
   * @memberof ClientDocumentMixin#
   */
  get isOwner(): boolean;

  /**
   * Test whether this Document is owned by any non-Gamemaster User.
   * @type {boolean}
   * @memberof ClientDocumentMixin#
   */
  get hasPlayerOwner(): boolean;

  /**
   * A boolean indicator for whether the current game User has exactly LIMITED visibility (and no greater).
   * @type {boolean}
   * @memberof ClientDocumentMixin#
   */
  get limited(): boolean;

  /**
   * Return a string which creates a dynamic link to this Document instance.
   * @return {string}
   * @memberof ClientDocumentMixin#
   */
  get link(): string;

  /**
   * Return the permission level that the current game User has over this Document.
   * See the CONST.ENTITY_PERMISSIONS object for an enumeration of these levels.
   * @type {number}
   * @memberof ClientDocumentMixin#
   *
   * @example
   * game.user.id; // "dkasjkkj23kjf"
   * actor.data.permission; // {default: 1, "dkasjkkj23kjf": 2};
   * actor.permission; // 2
   */
  get permission(): number;

  /**
   * Lazily obtain a FormApplication instance used to configure this Document, or null if no sheet is available.
   * @type {FormApplication|null}
   * @memberof ClientDocumentMixin#
   */
  get sheet(): this['_sheet'];

  /**
   * A Universally Unique Identifier (uuid) for this Document instance.
   * @type {string}
   * @memberof ClientDocumentMixin#
   */
  get uuid(): string;

  /**
   * A boolean indicator for whether or not the current game User has at least limited visibility for this Document.
   * Different Document types may have more specialized rules for what determines visibility.
   * @type {boolean}
   * @memberof ClientDocumentMixin#
   */
  get visible(): boolean;

  /**
   * Obtain the FormApplication class constructor which should be used to configure this Document.
   * @returns {Function|null}
   * @private
   */
  _getSheetClass(): ConstructorOf<FormApplication<this>>;

  /**
   * Prepare data for the Document.
   * Begin by resetting the prepared data back to its source state.
   * Next prepare any embedded Documents and compute any derived data elements.
   * @memberof ClientDocumentMixin#
   */
  prepareData(): void;

  /**
   * Prepare data related to this Document itself, before any embedded Documents or derived data is computed.
   * @memberof ClientDocumentMixin#
   */
  prepareBaseData(): void;

  /**
   * Prepare all embedded Document instances which exist within this primary Document.
   * @memberof ClientDocumentMixin#
   */
  prepareEmbeddedEntities(): void;

  /**
   * Apply transformations or derivations to the values of the source data object.
   * Compute data fields whose values are not stored to the database.
   * @memberof ClientDocumentMixin#
   */
  prepareDerivedData(): void;

  /**
   * Render all of the Application instances which are connected to this document by calling their respective
   * @see Application#render
   * @param force   - Force rendering
   *                  (default: `false`)
   * @param context - Optional context
   *                  (default: `{}`)
   * @memberof ClientDocumentMixin#
   */
  render(force?: boolean, context?: Application.RenderOptions): void;

  /**
   * Determine the sort order for this Document by positioning it relative a target sibling.
   * See SortingHelper.performIntegerSort for more details
   * @param {object} [options]          Sorting options provided to SortingHelper.performIntegerSort
   * @returns {Promise<Document>}       The Document after it has been re-sorted
   * @memberof ClientDocumentMixin#
   */
  sortRelative({
    target,
    siblings,
    sortKey,
    sortBefore,
    updateData
  }: {
    target: T;
    siblings: T[];
    sortKey: string;
    sortBefore: boolean;
    updateData: unknown;
  }): Promise<this>;

  /**
   * @see abstract.Document#_onCreate
   * @memberof ClientDocumentMixin#
   */
  _onCreate(data: T['data'], options: Entity.CreateOptions, userId: string): void;

  /**
   * @see abstract.Document#_onUpdate
   * @memberof ClientDocumentMixin#
   */
  _onUpdate(data: T['data'], options: Entity.UpdateOptions, userId: string): void;

  /**
   * @see abstract.Document#_onDelete
   * @memberof ClientDocumentMixin#
   */
  _onDelete(options: Entity.DeleteOptions, userId: string): void;

  /**
   * Preliminary actions taken before a set of embedded Documents in this parent Document are created.
   * @param {string} embeddedName   The name of the embedded Document type
   * @param {object[]} result       An Array of created data objects
   * @param {object} options        Options which modified the creation operation
   * @param {string} userId         The ID of the User who triggered the operation
   * @memberof ClientDocumentMixin#
   */
  _preCreateEmbeddedDocuments(
    embeddedName: string,
    result: object[],
    options: Entity.CreateOptions,
    userId: string
  ): void;

  /**
   * Follow-up actions taken after a set of embedded Documents in this parent Document are created.
   * @param {string} embeddedName   The name of the embedded Document type
   * @param {Document[]} documents  An Array of created Documents
   * @param {object[]} result       An Array of created data objects
   * @param {object} options        Options which modified the creation operation
   * @param {string} userId         The ID of the User who triggered the operation
   * @memberof ClientDocumentMixin#
   */
  _onCreateEmbeddedDocuments(
    embeddedName: string,
    documents: object[],
    result: object[],
    options: Entity.CreateOptions,
    userId: string
  ): void;

  /**
   * Preliminary actions taken before a set of embedded Documents in this parent Document are updated.
   * @param {string} embeddedName   The name of the embedded Document type
   * @param {object[]} result       An Array of incremental data objects
   * @param {object} options        Options which modified the update operation
   * @param {string} userId         The ID of the User who triggered the operation
   * @memberof ClientDocumentMixin#
   */
  _preUpdateEmbeddedDocuments(
    embeddedName: string,
    result: object[],
    options: Entity.UpdateOptions,
    userId: string
  ): void;

  /**
   * Follow-up actions taken after a set of embedded Documents in this parent Document are updated.
   * @param {string} embeddedName   The name of the embedded Document type
   * @param {Document[]} documents  An Array of updated Documents
   * @param {object[]} result       An Array of incremental data objects
   * @param {object} options        Options which modified the update operation
   * @param {string} userId         The ID of the User who triggered the operation
   * @memberof ClientDocumentMixin#
   */
  _onUpdateEmbeddedDocuments(
    embeddedName: string,
    documents: unknown[],
    result: object[],
    options: Entity.UpdateOptions,
    userId: string
  ): void;

  /**
   * Preliminary actions taken before a set of embedded Documents in this parent Document are deleted.
   * @param {string} embeddedName   The name of the embedded Document type
   * @param {object[]} result       An Array of document IDs being deleted
   * @param {object} options        Options which modified the deletion operation
   * @param {string} userId         The ID of the User who triggered the operation
   * @memberof ClientDocumentMixin#
   */
  _preDeleteEmbeddedDocuments(
    embeddedName: string,
    result: object[],
    options: Entity.DeleteOptions,
    userId: string
  ): void;

  /**
   * Follow-up actions taken after a set of embedded Documents in this parent Document are deleted.
   * @param {string} embeddedName   The name of the embedded Document type
   * @param {Document[]} documents  An Array of deleted Documents
   * @param {object[]} result       An Array of document IDs being deleted
   * @param {object} options        Options which modified the deletion operation
   * @param {string} userId         The ID of the User who triggered the operation
   * @memberof ClientDocumentMixin#
   */
  _onDeleteEmbeddedDocuments(
    embeddedName: string,
    documents: unknown[],
    result: object[],
    options: Entity.DeleteOptions,
    userId: string
  ): void;

  /**
   * Provide a Dialog form to create a new Document of this type.
   * Choose a name and a type from a select menu of types.
   * @param {object} data         Initial data with which to populate the creation form
   * @param {object} options      Initial positioning and sizing options for the dialog form
   * @return {Promise<Document>}  A Promise which resolves to the created Document
   * @memberof ClientDocumentMixin
   */
  static createDialog(data?: unknown, options?: Application.RenderOptions): Promise<unknown>;

  /**
   * Export entity data to a JSON file which can be saved by the client and later imported into a different session.
   * @memberof ClientDocumentMixin#
   */
  exportToJSON(): void;

  /**
   * A helper function to handle obtaining the relevant Document from dropped data provided via a DataTransfer event.
   * The dropped data could have:
   * 1. A compendium pack and entry id
   * 2. A World Entity _id
   * 3. A data object explicitly provided
   * @memberof ClientDocumentMixin
   *
   * @param {object} data   The data object extracted from a DataTransfer event
   * @param {object} [options={}]   Additional options which configure data retrieval
   * @param {boolean} [options.importWorld=false]   Import the provided document data into the World, if it is not already a World-level Document reference
   * @return {Promise<Document|null>}    The Document data that should be handled by the drop handler
   */
  static fromDropData<D extends ClientDocumentMixin<any>>(
    this: D,
    data: unknown,
    { importWorld }?: { importWorld?: boolean }
  ): Promise<D>;

  /**
   * Update this Document using a provided JSON string.
   * @param {string} json           JSON data string
   * @return {Promise<Document>}    The updated Document
   * @memberof ClientDocumentMixin#
   */
  importFromJSON(json: string): Promise<this>;

  /**
   * Render an import dialog for updating the data related to this Document through an exported JSON file
   * @return {Promise<void>}
   * @memberof ClientDocumentMixin#
   */
  importFromJSONDialog(): Promise<void>;

  /* -------------------------------------------- */

  /**
   * Transform the Document data to be stored in a Compendium pack.
   * Remove any features of the data which are world-specific.
   * This function is asynchronous in case any complex operations are required prior to exporting.
   * @param {CompendiumCollection} [pack]   A specific pack being exported to
   * @return {object}                       A data object of cleaned data suitable for compendium import
   * @memberof ClientDocumentMixin#
   */
  toCompendium(pack: Compendium): unknown;

  /* -------------------------------------------- */
  /*  DEPRECATIONS                                */
  /* -------------------------------------------- */

  /**
   * @deprecated since 0.8.0
   * @ignore
   */
  get _id(): string;

  /**
   * @deprecated since 0.8.0
   * @ignore
   */
  static get config(): Entity.Config;

  /**
   * @deprecated since 0.8.0
   * @ignore
   */
  get entity(): string;

  /**
   * @memberof ClientDocumentMixin#
   * @deprecated since 0.8.0
   * @ignore
   */
  get owner(): boolean;

  /**
   * @deprecated since 0.8.0
   * @ignore
   */
  static update(updates: unknown | unknown[], options: Entity.UpdateOptions): Promise<unknown>;

  /**
   * @deprecated since 0.8.0
   * @ignore
   */
  static delete(ids: string[], options: Entity.DeleteOptions): Promise<unknown>;

  /**
   * @deprecated since 0.8.0
   * @ignore
   */
  getEmbeddedEntity(...args: any[]): unknown;

  /**
   * @deprecated since 0.8.0
   * @ignore
   */
  createEmbeddedEntity(
    documentName: string,
    data: unknown | unknown[],
    options: Entity.CreateOptions
  ): Promise<unknown[]>;

  /**
   * @deprecated since 0.8.0
   * @ignore
   */
  updateEmbeddedEntity(
    documentName: string,
    data: unknown | unknown[],
    options: Entity.UpdateOptions
  ): Promise<unknown[]>;

  /**
   * @deprecated since 0.8.0
   * @ignore
   */
  deleteEmbeddedEntity(documentName: string, ids: string | string[], options: Entity.DeleteOptions): Promise<unknown[]>;
}
