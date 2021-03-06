// TODO: Remove when updating this class!!!
// eslint-disable-next-line
// @ts-nocheck

/**
 * The base grid class.
 * This double-dips to implement the "gridless" option
 */
declare class BaseGrid extends PIXI.Container {
  constructor(options: {
    dimensions: Canvas['dimensions'];
    color: string;
    alpha: Scene['data']['gridAlpha'];
    columns?: boolean;
    even?: boolean;
  });

  /**
   * Grid Unit Width
   */
  w: number;

  /**
   * Grid Unit Height
   */
  h: number;

  /**
   * Highlight active grid spaces
   */
  highlight: PIXI.Container;

  draw(): this;

  /**
   * Highlight a grid position for a certain coordinates
   * @param layer  - The highlight layer to use
   * @param x      - The x-coordinate of the highlighted position
   * @param y      - The y-coordinate of the highlighted position
   * @param color  - The hex fill color of the highlight
   *                 (default: `0x33BBFF`)
   * @param border - The hex border color of the highlight
   *                 (default: `null`)
   * @param alpha  - The opacity of the highlight
   *                 (default: `0.25`)
   * @param shape  - A predefined shape to highlight
   *                 (default: `null`)
   */
  highlightGridPosition(
    layer: GridHighlight,
    options?: {
      x?: number;
      y?: number;
      color?: number;
      border?: number | null;
      alpha?: number;
      shape?: PIXI.Polygon | null;
    }
  ): void;

  /**
   * Given a pair of coordinates (x, y) - return the top-left of the grid square which contains that point
   * @param x - The x-coordinate
   * @param y - The y-coordinate
   * @returns An Array [x, y] of the top-left coordinate of the square which contains (x, y)
   */
  getTopLeft(x: number, y: number): PointArray;

  /**
   * Given a pair of coordinates (x, y), return the center of the grid square which contains that point
   * @param x - The x-coordinate
   * @param y - The y-coordinate
   * @returns An array [cx, cy] of the central point of the grid space which contains (x, y)
   */
  getCenter(x: number, y: number): PointArray;

  /**
   * Given a pair of coordinates (x1,y1), return the grid coordinates (x2,y2) which represent the snapped position
   * Under a "gridless" system, every pixel position is a valid snapping position
   *
   * @param x        - The exact target location x
   * @param y        - The exact target location y
   * @param interval - An interval of grid spaces at which to snap.
   *                   At interval=1, snapping occurs at pixel intervals defined by the grid size
   *                   At interval=2, snapping would occur at the center-points of each grid size
   *                   At interval=null, no snapping occurs
   *                   (default: `null`)
   * @returns An object containing the coordinates of the snapped location
   */
  getSnappedPosition(x: number, y: number, interval: number | null): { x: number; y: number };

  /**
   * Given a pair of pixel coordinates, return the grid position as an Array.
   * Always round down to the nearest grid position so the pixels are within the grid space (from top-left).
   * @param x - The x-coordinate pixel position
   * @param y - The y-coordinate pixel position
   * @returns An array [x, y] representing the position in grid units
   */
  getGridPositionFromPixels(x: number, y: number): PointArray;

  /**
   * Given a pair of grid coordinates, return the pixel position as an Array.
   * Always round up to a whole pixel so the pixel is within the grid space (from top-left).
   * @param x - The x-coordinate grid position
   * @param y - The y-coordinate grid position
   * @returns An array [x, y] representing the position in pixels
   */
  getPixelsFromGridPosition(x: number, y: number): PointArray;

  /**
   * Shift a pixel position [x,y] by some number of grid units dx and dy
   * @param x  - The starting x-coordinate in pixels
   * @param y  - The starting y-coordinate in pixels
   * @param dx - The number of grid positions to shift horizontally
   * @param dy - The number of grid positions to shift vertically
   * @returns An array [x, y] representing the new position in pixels
   */
  shiftPosition(x: number, y: number, dx: number, dy: number): PointArray;

  /* -------------------------------------------- */

  /**
   * Measure the distance traversed over an array of measured segments
   * @param segments - An Array of measured movement segments
   * @param options  - Additional options which modify the measurement
   *                   (default: `{}`)
   * @returns An Array of distance measurements for each segment
   */
  measureDistances(
    segments: { ray: Ray; label?: Ruler['labels']['children'][number] }[],
    options?: { gridSpaces?: boolean }
  ): number[];

  /* -------------------------------------------- */

  /**
   * Get the grid row and column positions which are neighbors of a certain position
   * @param row - The grid row coordinate against which to test for neighbors
   * @param col - The grid column coordinate against which to test for neighbors
   * @returns An array of grid positions which are neighbors of the row and column
   */
  getNeighbors(row: number, col: number): [number, number][];
}
