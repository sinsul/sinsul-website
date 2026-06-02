import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";

export const isSupabaseConfigured = url.startsWith("https://") && anonKey.length > 10;

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url, anonKey)
  : null;

export const supabaseAdmin: SupabaseClient | null =
  isSupabaseConfigured && serviceKey.length > 10
    ? createClient(url, serviceKey)
    : null;

export type ProjectRow = {
  id: number;
  year: string;
  client: string;
  service: string;
  count: string;
  category: string;
  featured: boolean;
  created_at: string;
  tags?: string[];      // 사업 태그 (Supabase: text[])
  amount?: string;      // 계약금액 (예: "1,361,209,000")
};

export type NewsRow = {
  id: number;
  date: string;
  category: string;
  title: string;
  excerpt: string | null;
  content: string | null;
  published: boolean;
  created_at: string;
};
