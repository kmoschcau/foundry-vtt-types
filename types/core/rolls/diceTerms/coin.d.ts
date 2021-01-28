/**
 * Define a two-sided coin term that can be used as part of a Roll formula
 */
declare class Coin extends DiceTerm {
  constructor(termData?: DiceTerm.TermData);

  /* -------------------------------------------- */

  /**
   * @override
   */
  roll(options?: { maximize: boolean; minimize: boolean }): DiceTerm.Result;

  /* -------------------------------------------- */

  /**
   * @override
   */
  static getResultLabel(result: string): string;

  /* -------------------------------------------- */
  /*  Term Modifiers                              */
  /* -------------------------------------------- */

  /**
   * Call the result of the coin flip, marking any coins that matched the called target as a success
   *
   * 3dcc1      Flip 3 coins and treat "heads" as successes
   * 2dcc0      Flip 2 coins and treat "tails" as successes
   *
   * @param modifier - The matched modifier query
   */
  call(modifier: string): string;

  /* -------------------------------------------- */

  /**
   * @defaultValue `'c'`
   */
  static DENOMINATION: string;

  /**
   * @defaultValue `{ c: 'call' }`
   */
  static MODIFIER: Record<string, string>;
}
