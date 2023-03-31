import { Dispatch, SetStateAction, useRef, useState } from 'react';

const useSelect = (id: string, setValue?: Dispatch<SetStateAction<string>>) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const optionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const registerOption = ($div: HTMLDivElement, value: string) => {
    optionRefs.current.set(value, $div);

    const optionId = `${id}-${value}`;

    if (!selectRef.current || selectRef.current.querySelector(`#${optionId}`)) {
      return;
    }

    const $option = document.createElement('option');
    $option.id = optionId;
    $option.value = value;
    selectRef.current.appendChild($option);
  };

  const selectValue = (value: string) => {
    if (!selectRef.current) return;

    if (setValue) setValue(value);
    setSelectedOption(value);

    const $target = selectRef.current.querySelector(`#${id}-${value}`);
    selectRef.current.childNodes.forEach(($option) => {
      if (!($option instanceof HTMLOptionElement)) return;
      $option.selected = $option === $target;
    });
  };

  return {
    selectRef,
    optionRefs,
    registerOption,
    selectValue,
    selectedOption,
  };
};

export default useSelect;
