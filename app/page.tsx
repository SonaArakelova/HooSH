import { Pagination } from "@/components/Pagination";


export default async function Home() {

  const res = await fetch('https://dummyjson.com/products?limit=0', { next: { revalidate: 60 } })
  if(!res.ok) throw new Error ('You failed to fetch products')

    const data = await res.json()

  return (
    <div className=" container mx-auto mb-3 bg-custom min-h-auto">

      <Pagination  data={data.products} />


    </div>
    
  );
}
