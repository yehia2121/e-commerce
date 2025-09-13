"use server";

export default async function GetBrandProducts(id: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?brand=${id}`
  );

  const payload = await res.json();
  return payload;
}
