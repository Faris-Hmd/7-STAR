export type Product = {
  name: string;
  cost: number;
  img: string;
  imgs: [{ url: string }];
  category: string;
  descreption: string;
  details: string;
  breif: string;
};

export type Products = Product[];
export type Category = {
  value: string;
};
export type Categories = Category[];
export type monthsType =
  | "Jan"
  | "Feb"
  | "Mar"
  | "Apr"
  | "May"
  | "Jun"
  | "Jul"
  | "Aug"
  | "Sep"
  | "Oct"
  | "Nov"
  | "Dec";
export type st = {
  month: monthsType | string;
  totalCost: number[];
};
