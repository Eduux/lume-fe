export const dynamic = "force-dynamic";

import data from "./dataset.json";

export async function GET() {
  return Response.json(data);
}
