export interface subCategoryRoot {
  results: number;
  metadata: subCategoryMetadata;
  data: subCategoryDaum[];
}

export interface subCategoryMetadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage: number;
}

export interface subCategoryDaum {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}
