import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Arrow, useLayer } from "react-laag";

export default function Home() {
  const [isOpen, setOpen] = useState(false);

  // helper function to close the menu
  function close() {
    setOpen(false);
  }

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: false, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: "bottom-start", // we prefer to place the menu "top-end"
    triggerOffset: 12, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
    arrowOffset: 16, // let the arrow have some room to breath also
  });

  return (
    <>
      <div className="p-[48px] flex justify-between">
        Home
        <div
          {...triggerProps}
          onClick={() => setOpen(!isOpen)}
          className="w-[36px] h-[36px] rounded-full bg-teal-500"
        />
        {renderLayer(
          <AnimatePresence>
            {isOpen && (
              <div className="bg-white" {...layerProps}>
                asdfasdf
                <Arrow color="white" {...arrowProps} />
              </div>
            )}
          </AnimatePresence>
        )}
      </div>
    </>
  );
}
