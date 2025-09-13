export interface wishlistRoot {
  status: string;
  count: number;
  data: wishlistDaum[];
}

export interface wishlistDaum {
  sold: number;
  images: string[];
  subcategory: wishlistSubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: wishlistCategory;
  brand: wishlistBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface wishlistSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface wishlistCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface wishlistBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}
