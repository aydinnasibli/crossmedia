import { NextResponse } from "next/server";
import { seedDatabase } from "@/app/actions";

export async function GET() {
  const result = await seedDatabase();
  return NextResponse.json(result);
}
