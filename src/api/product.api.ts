"use server"

export default async function getProducts() {
  const response = await fetch(
    `https://ecommerce.routemisr.com/api/v1/products`,
    {
      method: "GET",
      // cache: 'no-store' // SSR
      // cache: 'force-cache' // SSG
      next: {revalidate: 120} // ISR
    }
  );
  const { data } = await response.json();

  return data;
}
