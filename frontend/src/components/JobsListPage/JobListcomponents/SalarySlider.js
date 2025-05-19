import React, { useState } from 'react';
import '../styles/JobFilters.css';

const SalarySlider = ({ min, max, onChange }) => {
  const [range, setRange] = useState({ min, max });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newRange = { ...range, [name]: Number(value) };
    setRange(newRange);
    onChange(newRange);
  };

  return (
    <div className="salary-slider">
      <div className="salary-display">
        <span>${range.min}</span>
        <span>${range.max}</span>
      </div>
      <input
        type="range"
        name="min"
        min={min}
        max={max}
        value={range.min}
        onChange={handleChange}
        className="slider"
      />
      <input
        type="range"
        name="max"
        min={min}
        max={max}
        value={range.max}
        onChange={handleChange}
        className="slider"
      />
    </div>
  );
};

export default SalarySlider;