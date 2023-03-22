import { Dispatch, SetStateAction, useRef } from 'react';

const useSelect = (id: string, setValue?: Dispatch<SetStateAction<string>>) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const optionRefs = useRef<HTMLLIElement[]>([]);

  const registerOption = ($el: HTMLLIElement, value: string) => {
    const optionId = `${id}-${value}`;

    if (!selectRef.current || selectRef.current.querySelector(`#${optionId}`)) {
      return;
    }

    optionRefs.current.push($el);

    const option = document.createElement('option');
    option.id = optionId;
    option.value = value;
    selectRef.current.appendChild(option);
  };

  const selectValue = (value: string) => {
    if (setValue) setValue(value);

    if (!selectRef.current) return;

    const $target = selectRef.current.querySelector(`#${id}-${value}`);
    selectRef.current.childNodes.forEach(($option) => {
      if (!($option instanceof HTMLOptionElement)) return;
      $option.selected = $option === $target;
    });
  };

  return {
    selectRef,
    registerOption,
    selectValue,
  };
};

export default useSelect;
