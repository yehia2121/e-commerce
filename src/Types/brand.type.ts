export interface brandsRoot {
  results: number;
  metadata: brandsMetadata;
  data: brandsDaum[];
}

export interface brandsMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface brandsDaum {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
