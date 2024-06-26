import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { GetUser, GetUserBalance } from "@/utils/userData";

export async function POST(req: NextRequest) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { FundingAmount, post_id } = await req.json();

  if (!FundingAmount || !post_id) {
    return new Response(JSON.stringify({ error: "Missing required fields" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  const user = await GetUser();

  console.log(FundingAmount);
  const balance = await GetUserBalance(user.id);
  if (FundingAmount > balance) {
    return NextResponse.json({ error: "Insufficient balance" });
  }
  const { data, error } = await supabase
    .rpc("fund_post", {
      userid: user.id,
      postid: post_id,
      funding_amount: FundingAmount,
    })
    .select();
  await supabase
    .from("payments_allocation")
    .insert({ user_id: user.id, post_id, amount: FundingAmount })
    .select();
  if (error) {
    return NextResponse.json({
      error: `DB transaction failed: ${error.message}`,
    });
  }

  return NextResponse.json(data);
}
