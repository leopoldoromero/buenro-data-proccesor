export interface MongoDbFilters {
  filters: {
    [key: string]:
      | string
      | {
          [x: string]: string | number | Array<string | number>;
        };
  };
  limit: number;
  skip: number;
  sortBy: any;
}
