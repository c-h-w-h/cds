import { Dispatch, SetStateAction, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOptions = (id: string, setValue?: Dispatch<SetStateAction<any>>) => {
  const selectRef = useRef<HTMLSelectElement>(null);
  const optionRefs = useRef<HTMLLIElement[]>([]);

  const registerOption = ($el: HTMLLIElement, value: string) => {
    optionRefs.current.push($el);

    if (!selectRef.current) return;

    const option = document.createElement('option');
    option.id = `${id}-${value}`;
    option.value = value;
    selectRef.current.appendChild(option);
  };

  const selectValue = (value: string) => {
    if (setValue) setValue(value);

    if (!selectRef.current) return;

    const $target = selectRef.current.querySelector(`#${id}-${value}`);
    [...selectRef.current.childNodes].forEach(($option) => {
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

export default useOptions;
