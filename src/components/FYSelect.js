import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

const date = new Date();
const month = date.getMonth();
const year = date.getFullYear();

export default function FYSelect({ value, onChange }) {
  if (value.id === 0) return null;
  else {
    console.log(value, year);
    let FYOptions;
    if (value.startMonth === 4)
      if (month < 3)
        FYOptions = Array(50)
          .fill(0)
          .map((_, index) => ({
            id: index + 1,
            option: year - index,
            FY: `${year - index - 1}-${year - index}`,
            startMonth: value.startMonth,
          }));
      else {
        FYOptions = Array(50)
          .fill(0)
          .map((_, index) => ({
            id: index + 1,
            option: year - index + 1,
            FY: `${year - index}-${year - index + 1}`,
            startMonth: value.startMonth,
          }));
      }
    else
      FYOptions = Array(50)
        .fill(0)
        .map((_, index) => ({
          id: index + 1,
          option: year - index,
          FY: `${year - index}-${year - index + 1}`,
          startMonth: value.startMonth,
        }));

    console.log(FYOptions);

    return (
      <div>
        <Listbox value={value} onChange={(value) => onChange(value)}>
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
              {FYOptions.map((FYOption) => (
                <ListboxOption
                  key={FYOption.id}
                  value={FYOption}
                  className="group flex cursor-default items-center gap-2 rounded-lg py-1.5 px-3 select-none hover:bg-black/5"
                >
                  <CheckIcon
                    className={clsx(
                      "size-4 fill-black",
                      { invisible: FYOption.id !== value.id },
                      { visible: FYOption.id === value.id }
                    )}
                  />
                  <div className="text-sm/6 text-black font-manrope">
                    {FYOption.option}
                  </div>
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Transition>
        </Listbox>
      </div>
    );
  }
}
