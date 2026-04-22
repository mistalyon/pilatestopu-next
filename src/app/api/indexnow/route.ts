import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const HOST = 'www.pilatestopu.com';
const KEY = process.env.INDEXNOW_KEY || '';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINTS = [
    'https://api.indexnow.org/IndexNow',
    'https://www.bing.com/IndexNow',
    'https://yandex.com/indexnow',
  ];

async function pingEndpoint(endpoint: string, payload: any) {
    try {
          const r = await fetch(endpoint, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json; charset=utf-8' },
                  body: JSON.stringify(payload),
                });
          return { endpoint, status: r.status, ok: r.ok };
        } catch (e: any) {
          return { endpoint, status: 0, ok: false, error: String(e && e.message ? e.message : e) };
        }
  }

async function submitUrls(urls: string[]) {
    if (!KEY) {
          return { ok: false, error: 'INDEXNOW_KEY env var not set' };
        }
    const cleaned = Array.from(new Set(urls.filter((u) => typeof u === 'string' && u.startsWith('https://' + HOST)))).slice(0, 10000);
    if (cleaned.length === 0) {
          return { ok: false, error: 'no valid urls (must start with https://' + HOST + ')' };
        }
    const payload = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: cleaned };
    const results = await Promise.all(ENDPOINTS.map((e) => pingEndpoint(e, payload)));
    return { ok: true, submitted: cleaned.length, results };
  }

// GET /api/indexnow?slug=... or ?slugs=a,b,c   or ?recent=N (last N posts)
export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');
    const slugsParam = searchParams.get('slugs');
    const recentParam = searchParams.get('recent');
    let urls: string[] = [];

    if (slug) {
          urls.push(`https://${HOST}/blog/${slug}`);
        }
    if (slugsParam) {
          slugsParam.split(',').map((s) => s.trim()).filter(Boolean).forEach((s) => {
                  urls.push(`https://${HOST}/blog/${s}`);
                });
        }
    if (recentParam) {
          const n = Math.min(parseInt(recentParam, 10) || 0, 1000);
          if (n > 0) {
                  try {
                            const { data } = await supabase
                              .from('blog_posts')
                              .select('slug')
                              .or('status.eq.published,published.eq.true')
                              .order('created_at', { ascending: false })
                              .limit(n);
                            (data || []).forEach((p: any) => urls.push(`https://${HOST}/blog/${p.slug}`));
                          } catch (e) {}
                }
        }
    if (urls.length === 0) {
          return NextResponse.json({ ok: false, error: 'provide ?slug= or ?slugs=a,b or ?recent=N' }, { status: 400 });
        }
    const result = await submitUrls(urls);
    return NextResponse.json(result);
  }

// POST /api/indexnow  body: { urls: string[] }   or   { slugs: string[] }   or { all: true }
export async function POST(req: NextRequest) {
    let body: any = {};
    try { body = await req.json(); } catch (e) {}
    let urls: string[] = [];
    if (Array.isArray(body.urls)) {
          urls = urls.concat(body.urls);
        }
    if (Array.isArray(body.slugs)) {
          body.slugs.forEach((s: string) => urls.push(`https://${HOST}/blog/${s}`));
        }
    if (body.all === true) {
          try {
                  const pageSize = 1000;
                  let from = 0;
                  while (true) {
                            const { data, error } = await supabase
                              .from('blog_posts')
                              .select('slug')
                              .or('status.eq.published,published.eq.true')
                              .range(from, from + pageSize - 1);
                            if (error || !data || data.length === 0) break;
                            data.forEach((p: any) => urls.push(`https://${HOST}/blog/${p.slug}`));
                            if (data.length < pageSize) break;
                            from += pageSize;
                          }
                } catch (e) {}
        }
    if (urls.length === 0) {
          return NextResponse.json({ ok: false, error: 'provide urls[], slugs[], or all=true' }, { status: 400 });
        }
    const result = await submitUrls(urls);
    return NextResponse.json(result);
  }
