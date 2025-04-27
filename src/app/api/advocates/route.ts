import { or, ilike, eq, sql } from 'drizzle-orm';
import db from "../../../db";
import { advocates } from "../../../db/schema";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchTerm = request.nextUrl.searchParams.get('search');
  let filters = undefined;
  if (searchTerm) {
    filters = or(
      ilike(advocates.firstName, `%${searchTerm}%`),
      ilike(advocates.lastName, `%${searchTerm}%`),
      ilike(advocates.city, `%${searchTerm}%`),
      ilike(advocates.degree, `%${searchTerm}%`),
      sql`${advocates.specialties}::text ILIKE ${`%${searchTerm}%`}`,
      parseInt(searchTerm) ? eq(advocates.yearsOfExperience, searchTerm) : undefined,
    );
  }
  const data = await db
    .select()
    .from(advocates)
    .where(filters);

  return Response.json({ data });
}
