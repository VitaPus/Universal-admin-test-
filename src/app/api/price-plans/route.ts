import pricePlans from '../../../../public/data/price-plans.json'

export async function GET() {
  return new Response(JSON.stringify(pricePlans), { status: 200 });
}
