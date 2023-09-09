export interface OrderedBook {
  bookId: string;
  quantity: number;
}

export interface IOrder {
  orderedBooks: OrderedBook[];
}
