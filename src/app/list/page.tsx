"use client";

import { appLanguage, spices } from "@/lib/spices";
import Link from "next/link";
import Image from "next/image";

export default function ListPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">All Spices</h1>
      <ul className="divide-y divide-zinc-200 dark:divide-zinc-700">
        {spices.map((spice) => {
          const name =
            spice.names.find((n) => n.lang === appLanguage)?.value ?? spice.id;
          return (
            <li key={spice.id}>
              <Link
                href={`/spices/${encodeURIComponent(spice.id)}`}
                className="flex items-center gap-4 py-3 px-2 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <Image
                  src={`/spices/${spice.imageId ?? spice.id}.png`}
                  alt={name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <div className="font-medium">{name}</div>
                  {spice.binomialName && (
                    <div className="text-xs text-zinc-500 dark:text-zinc-400 italic">
                      {spice.binomialName}
                    </div>
                  )}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
