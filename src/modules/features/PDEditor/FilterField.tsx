import React from 'react'
import { FieldValues, UseFormRegister } from 'react-hook-form';

type FilterFieldProps = {
  label: string;
  name: string;
  type: 'select' | 'input';
  options?: string[];
  levels: string[];
  currentLevel: string;
  register:  UseFormRegister<FieldValues>;
}

const FilterField: React.FC<FilterFieldProps> = ({ label, name, type, options, levels, currentLevel, register }) => {
    if (!levels.includes(currentLevel)) return null;

    return (
    <>
        <label>{label}:</label>
        {type === 'select' ? (
        <select {...register(name)}>
            <option value="">None</option>
            {options?.map((opt, idx) => <option key={idx} value={opt}>{opt}</option>)}
        </select>
        ) : (
        <input inputMode='numeric' {...register(name)} />
        )}
    </>
    )
}

export default FilterField