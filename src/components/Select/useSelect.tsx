import { Dispatch, SetStateAction, useRef, useState } from 'react';

export interface SelectedOption {
  index: number;
  value: string;
}

const useSelect = (id: string, setValue?: Dispatch<SetStateAction<string>>) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const [selectedOption, setSelectedOption] = useState<SelectedOption | null>(
    null,
  );

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

    const $target = selectRef.current.querySelector(`#${id}-${value}`);
    selectRef.current.childNodes.forEach(($option, index) => {
      if (!($option instanceof HTMLOptionElement)) return;

      if ($option !== $target) {
        $option.selected = false;
        return;
      }

      $option.selected = true;
      setSelectedOption({ index, value });
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
