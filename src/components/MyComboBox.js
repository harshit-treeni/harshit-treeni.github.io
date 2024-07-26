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

import { IoMdCloseCircle } from "react-icons/io";

export default function MyComboBox({
  placeholder,
  value,
  onChange,
  onClear,
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
    <div className="flex-auto">
      <Combobox 
        value={value} 
        onChange={(value) => { 
          setQuery("")
          onChange(value) 
        }}
        multiple>
        <div className="relative">
          <IoMdCloseCircle
            onClick={onClear}
            className={clsx(
              "absolute top-[9px] left-[6px] text-[22px] text-red-400 cursor-pointer hover:text-red-500",
              { hidden: value.length === 0 },
              { visible: value.length > 0 }
            )}
          />
          <ComboboxInput
            placeholder={placeholder}
            className={clsx(
              "w-full rounded-full border-none bg-white py-2 pr-8 text-sm/6 text-black",
              "focus:outline-none data-[focus]:outline-2 data-[focus]:-outline-offset-2 data-[focus]:outline-black/25",
              "placeholder:text-black/50",
              { "pl-4": value.length === 0 },
              { "pl-[30px]": value.length > 0 }
            )}
            displayValue={(something) => value.length === 0 ? "" : value.map(obj => obj.name).join(", ") + ", "}
            onChange={(event) => {
              if(value.length === 0) {
                return setQuery(event.target.value)
              }

              if(event.target.value.includes(value.map(obj => obj.name).join(", ") + ", "))
                setQuery(event.target.value.split(value.map(obj => obj.name).join(", ") + ", ")[1])
              else {
                event.target.value = value.map(obj => obj.name).join(", ") + ", "
              }
            }}
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
            className="mt-[4px] rounded-xl border-2 border-black/25 bg-white p-1 [--anchor-gap:var(--spacing-1)] empty:hidden min-w-[200px] "
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