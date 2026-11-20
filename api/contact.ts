import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// In-memory per-lambda rate limit: 5 req / hour per IP
const buckets = new Map<string, { count:number, reset:number }>();
const LIMIT = 5; const WINDOW = 60*60*1000;

function rateLimited(ip:string): boolean {
  const now = Date.now();
  const b = buckets.get(ip);
  if (!b || now >= b.reset) { buckets.set(ip, {count:1, reset: now+WINDOW}); return false; }
  if (b.count >= LIMIT) return true;
  b.count++; return false;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({error:"Method not allowed"});
  const ip = (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() || (req.headers["x-real-ip"] as string) || "unknown";
  if (rateLimited(ip)) return res.status(429).json({error:"Too many messages, try later (5/hour)"});
  const { senderEmail, subject, body } = req.body || {};
  if (!senderEmail || typeof senderEmail !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(senderEmail)) return res.status(400).json({error:"Invalid email"});
  if (!subject || typeof subject !== "string" || subject.trim().length < 3 || subject.trim().length > 200) return res.status(400).json({error:"Subject must be 3-200 chars"});
  if (!body || typeof body !== "string" || body.trim().length < 10 || body.trim().length > 5000) return res.status(400).json({error:"Message must be 10-5000 chars"});
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const key = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return res.status(500).json({error:"Contact service not configured"});
  const supabase = createClient(url, key);
  const { error } = await supabase.from("messages").insert([{ senderEmail: senderEmail.trim().slice(0,256), subject: subject.trim().slice(0,200), body: body.trim().slice(0,5000) }]);
  if (error) return res.status(500).json({error: error.message});
  return res.status(200).json({ok:true});
}
