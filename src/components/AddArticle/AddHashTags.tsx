import { useState } from "react";

export type SelectOption = {
  label: string;
  value: string | number;
};

type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};

type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};

type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

const AddHashTags = ({ multiple, value, onChange, options }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const clearSelectedTags = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const selectTags = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((opt) => opt !== opt));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  return (
    <main
      onClick={() => setIsOpen((prev) => !prev)}
      onBlur={() => setIsOpen(false)}
      tabIndex={0}
      className="relative min-h-[1.5em] flex items-center border border-gray-300 gap-6 p-2 focus:border-purple-600 rounded-sm cursor-pointer"
    >
      <div className="value">
        {multiple
          ? value.map((val) => (
              <button
                className="tag-badge mr-2 rounded-sm bg-green-100 p-1"
                key={val.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectTags(val);
                }}
              >
                # {val.label} <span  className="remove font-bold text-lg hover:text-red-600">&times;</span>
              </button>
            ))
          : value?.label}
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearSelectedTags();
        }}
        className="text-lg text-purple-500 font-semibold focus:text-red-600 "
      >
        &times;
      </button>
      <div className="devider"></div>
      <div className="caret"></div>
      <ul
        className={`${"tag-options border border-gray-300 bg-gray-200 w-full"}  ${
          isOpen ? "tag-options__show" : ""
        }`}
      >
        {options.map((option) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectTags(option);
              setIsOpen(false);
            }}
            className="tag-option"
            key={option.value}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </main>
  );
};

export default AddHashTags;
