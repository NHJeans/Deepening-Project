"use client";

import { useEffect, useRef } from "react";

type CategoryButtonsProps = {
  handleCategoryChange: (category: string) => void;
};

const CategoryButtons = ({ handleCategoryChange }: CategoryButtonsProps) => {
  const categoryRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    if (categoryRef.current) {
      handleCategoryChange(categoryRef.current.value);
    }
  }, [handleCategoryChange]);

  return (
    <div>
      <label htmlFor="category"></label>
      <select
        id="category"
        ref={categoryRef}
        defaultValue="응원글"
        onChange={(e) => handleCategoryChange(e.target.value)}
        className="w-3/5 p-1 bg-customGreen border rounded-md text-white shadow-md text-center "
        required
      >
        <option value="">선택해주세요</option>
        <option value="응원글">응원글</option>

        <option value="위로글">위로글</option>
        <option value="축하글">축하글</option>
        <option value="의견글">의견글</option>
        <option value="고백글">고백글</option>
      </select>
    </div>
  );
};

export default CategoryButtons;
