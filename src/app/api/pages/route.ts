import pages from '../../../../public/data/pages.json';

export async function GET() {
  return new Response(JSON.stringify(pages), { status: 200 });
}
