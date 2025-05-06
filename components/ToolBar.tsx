type ToolBarProps = {
    groupByCat: boolean;
    minPrice: number;
    maxPrice: number;
    sortBy: string;
    sortOrder: string;
    onGroupByCatChange: (value: boolean) => void;
    onMinPriceChange: (value: number) => void;
    onMaxPriceChange: (value: number) => void;
    onSortByChange: (value: "" | "name" | "price" | "rating") => void;
    onSortOrderChange: (value: "asc" | "desc") => void;
  };
  
  export default function ToolBar({
    groupByCat,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    onGroupByCatChange,
    onMinPriceChange,
    onMaxPriceChange,
    onSortByChange,
    onSortOrderChange,
  }: ToolBarProps) {
    return (
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Agrupar por categoría</label>
          <input
            type="checkbox"
            checked={groupByCat}
            onChange={(e) => onGroupByCatChange(e.target.checked)}
          />
        </div>
  
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Precio:</label>
          <input
            type="number"
            placeholder="Mín"
            className="border rounded px-2 py-1 w-20"
            value={minPrice}
            onChange={(e) => onMinPriceChange(Number(e.target.value))}
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Máx"
            className="border rounded px-2 py-1 w-20"
            value={maxPrice === Infinity ? "" : maxPrice}
            onChange={(e) =>
              onMaxPriceChange(Number(e.target.value) || Infinity)
            }
          />
        </div>
  
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium">Ordenar por:</label>
          <select
            className="border rounded px-2 py-1"
            value={sortBy}
            onChange={(e) => onSortByChange(e.target.value as "" | "name" | "price" | "rating")}
          >
            <option value="">Ninguno</option>
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
            <option value="rating">Calificación</option>
          </select>
          <select
            className="border rounded px-2 py-1"
            value={sortOrder}
            onChange={(e) => onSortOrderChange(e.target.value as "asc" | "desc")}
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
      </div>
    );
  }
  