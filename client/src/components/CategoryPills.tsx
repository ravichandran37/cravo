import React from 'react';

interface CategoryPillsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const CategoryPills: React.FC<CategoryPillsProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
      {categories.map((cat) => {
        const active = selectedCategory.toLowerCase() === cat.toLowerCase();
        return (
          <button
            key={cat}
            onClick={() => onSelectCategory(cat)}
            className={`px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 border ${
              active
                ? 'bg-primary border-primary text-white shadow-sm'
                : 'bg-white border-[#e8e4dc] text-[#5a4138] hover:text-[#111c2d] hover:bg-[#f5f2eb]'
            }`}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
};
