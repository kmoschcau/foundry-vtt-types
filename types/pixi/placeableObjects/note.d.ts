declare class Note extends PlaceableObject {
  get bounds(): NormalizedRectangle;

  draw(): Promise<PlaceableObject>;

  refresh(): PlaceableObject;
}
