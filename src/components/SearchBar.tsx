// components/SearchBar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useDebounce } from "@/hooks/useDebounce";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<{ name: string; id: string }[]>([]);
  const [isFocused, setIsFocused] = useState(false);
  const debouncedQuery = useDebounce(query, 300);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const { data } = await axios.get(`/api/topics/search?q=${debouncedQuery}`);
        setResults(data.filtered);
      } catch {}
    };

    fetchResults();
  }, [debouncedQuery]);

  const handleSelect = (name: string) => {
    setQuery("");
    setResults([]);
    router.push(`/topic/${name.toLowerCase().replaceAll(" ", "-")}`);
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className={`flex items-center rounded-2xl bg-white shadow-md px-3 py-2 transition ring-1 ring-gray-200 focus-within:ring-blue-400`}>
        <svg
          className="mr-2 h-5 w-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2"/>
        </svg>
        <input
          ref={inputRef}
          type="text"
          placeholder="Search topics..."
          value={query}
          autoComplete="off"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent outline-none text-gray-700 placeholder-gray-400 font-medium"
        />
        {query && (
          <button
            aria-label="Clear"
            onClick={() => setQuery("")}
            className="ml-2 text-gray-400 hover:text-gray-600 focus:outline-none"
          >
            &#10005;
          </button>
        )}
      </div>
      {isFocused && query && results.length > 0 && (
        <ul className="absolute left-0 right-0 mt-1 rounded-2xl bg-white shadow-lg border ring-1 ring-blue-200 animate-fade-in z-50 max-h-64 overflow-y-auto">
          {results.map((t) => (
            <li
              key={t.id}
              onMouseDown={() => handleSelect(t.name)}
              tabIndex={0}
              className="px-4 py-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 font-medium transition"
            >
              {t.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
