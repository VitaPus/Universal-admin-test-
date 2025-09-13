// app/api/products/route.ts
import products from '../../../../public/data/products.json'

export async function GET() {
  return new Response(JSON.stringify(products), { status: 200 });
}
