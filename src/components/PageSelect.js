import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

const pageOptions = [
  { id: 1, option: 10 },
  { id: 2, option: 20 },
  { id: 3, option: 40 },
  { id: 4, option: 80 },
  { id: 5, option: 160 },
];

export default function PageSelect({ value = pageOptions[0], onChange }) {
  return (
    <div>
      <Listbox
        value={value}
        onChange={(val) => {
          if (val.id !== value.id) {
            onChange(val);
          }
        }}
      >
        <ListboxButton className="relative block w-full rounded-lg bg-white py-1.5 pr-8 pl-3 text-left text-sm/6 text-black border border-black/5 focus:outline-none">
          {value.option}
          <ChevronDownIcon
            className="group pointer-events-none absolute top-2.5 right-2.5 size-4 fill-black"
            aria-hidden="true"
          />
        </ListboxButton>
        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <ListboxOptions
            anchor="bottom"
            className="rounded-xl border border-black/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none z-10"
          >
            {pageOptions.map((pageOption) => (
              <ListboxOption
                key={pageOption.id}
                value={pageOption}
                className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-black/5"
              >
                <CheckIcon className="invisible size-4 fill-black group-data-[selected]:visible" />
                <div className="text-sm/6 text-black font-manrope">
                  {pageOption.option}
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </Transition>
      </Listbox>
    </div>
  );
}
