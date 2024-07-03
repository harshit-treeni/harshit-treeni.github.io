import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useState } from "react";

export default function MyComboBox({
  placeholder,
  value,
  onChange,
  options = [],
}) {
  const [query, setQuery] = useState("");

  let filteredOptions =
    query === ""
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <div className="w-[140px]">
      <Combobox value={value} onChange={(value) => onChange(value)}>
        <div className="relative">
          <ComboboxInput
            placeholder={placeholder}
            className={clsx(
              "w-full rounded-full border-none bg-white py-2 pr-8 pl-4 text-sm/6 text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25",
              "placeholder:text-black/50"
            )}
            displayValue={(person) => person?.name}
            onChange={(event) => setQuery(event.target.value)}
          />
          <ComboboxButton className="group absolute inset-y-0 right-0 px-2.5">
            <ChevronDownIcon className="size-4 fill-black/60 group-data-[hover]:fill-black" />
          </ComboboxButton>
        </div>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          afterLeave={() => setQuery("")}
        >
          <ComboboxOptions
            anchor="bottom"
            className="mt-[4px] rounded-xl border-2 border-black/25 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden "
          >
            {filteredOptions.map((person) => (
              <ComboboxOption
                key={person.id}
                value={person}
                className="group flex cursor-pointer items-center gap-2 rounded-lg py-1.5 px-3 select-none data-[focus]:bg-black/10"
              >
                <CheckIcon className="invisible size-4 fill-blue group-data-[selected]:visible" />
                <div className="text-sm/6 text-black pr-[16px]">
                  {person.name}
                </div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </Transition>
      </Combobox>
    </div>
  );
}
