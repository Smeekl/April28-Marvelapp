export default interface Repository<T> {
  exists(t: T): Promise<boolean>;
  delete(t: T): Promise<void>;
  getById(id: number): Promise<T>;
  save(t: T): Promise<void>;
}
