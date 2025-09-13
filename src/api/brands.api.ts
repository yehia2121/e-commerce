"use server";

export default async function GetBrands() {
  const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands`);

  const payload = await res.json();
  return payload;
}
