import React, { useState } from "react";

type SearcherProps = {
  onSubmit: (search: string) => void;
};

function SearchBar({ onSubmit }: SearcherProps) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(search);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-4 items-center"
    >
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar productos..."
        className="w-full md:flex-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <button
        type="submit"
        className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors w-full md:w-auto"
      >
        Buscar
      </button>
    </form>
  );
}

export default SearchBar;
