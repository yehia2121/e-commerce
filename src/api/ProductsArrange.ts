"use server";

export default async function ProductsArrange(sign: string) {
  const res = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products?sort=${sign}price`
  );

  const payload = await res.json();
  return payload;
}
