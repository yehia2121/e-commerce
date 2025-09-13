"use server";

export default async function ProductCategoryArrange(sign: string, id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?sort=${sign}price&category[in]=${id}`
  );

  const payload = await res.json();
  return payload;
}
