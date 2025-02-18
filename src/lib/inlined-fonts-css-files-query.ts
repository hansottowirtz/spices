"use client";

import * as csstree from 'css-tree';

const cache = new Map<string, string>();


export async function inlineFontsCssFile(url: string) {
  if (cache.has(url)) {
    return cache.get(url)!;
  }
  const result = await fetch(url);
  const text = await result.text();
  const ast = csstree.parse(text);
  const urlNodes: csstree.Url[] = [];
  csstree.walk(ast, (node) => {
    if (node.type === 'Url') {
      urlNodes.push(node);
    }
  });
  for (const urlNode of urlNodes) {
    if (!urlNode.value.startsWith('http')) {
      continue;
    }
    const res = await fetch(urlNode.value);
    if (!res.ok) {
      throw new Error(`Failed to fetch ${urlNode.value}`);
    }
    const buffer = await res.arrayBuffer();
    const contentType = res.headers.get('content-type');
    const mime = contentType?.split(';')[0] ?? 'application/octet-stream';
    const base64 = Buffer.from(buffer).toString('base64');
    urlNode.value = `data:${mime};base64,${base64}`;
  }
  const inlinedStylesheet = csstree.generate(ast);
  cache.set(url, inlinedStylesheet);
  return inlinedStylesheet;
}