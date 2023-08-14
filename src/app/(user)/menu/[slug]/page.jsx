import { getOneProductsBySlug,getProducts } from '@/src/app/services/ProductServices';
import AddToCart from './AddToCart';
export const dynamic = "force-static";
export const dynamicParams = false;

async function page({params}) {
    
    const {slug} = params;
    const {product} = await getOneProductsBySlug(slug)
  return (
    <div>
        <h1 className='font-bold text-2xl mb-6'> {product.title}</h1>
        <p className='mb-6'>{product.description}</p>
        <p>
            قیمت محصول :
            <span className={`${product.discount ? "line-through" : "font-bold"}`}>{product.price}</span>
        </p>
        {!!product.discount && (
            <div className='flex items-center gap-x-2 mb-6'>
                <p className='text-xl font-bold'>
                    قیمت با تخفیف : {product.offPrice}
                </p>
                <div className='bg-rose-500 px-2 py-0.5 rounded-xl text-white text-sm'>
                    {product.discount} %
                </div>
            </div>
        )}

       <AddToCart product={product}/>
     
    
    </div>
  )
}

export default page

export async function generateStaticParams() {
const {products} = await getProducts()
    return products.map((product) => ({
        slug: product.slug
    }))
}