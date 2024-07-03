import { useCallback, useState } from "react"
import update from 'immutability-helper'
import DraggableNavItem from "./DraggableNavItem"


export default function DragContainer({ navObjsList }) {

  // get nav objs list from backend here
  const [navObjs, setNavObjs] = useState(navObjsList)

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    setNavObjs((prevCards) =>
      update(prevCards, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevCards[dragIndex]],
        ],
      }),
    )
  }, [])

  const renderNav = useCallback((navObj, index) => {
    return (
      <DraggableNavItem
        key={navObj.id}
        index={index}
        moveCard={moveCard}
        {...navObj}
      />
    )
  }, [])

  return navObjs.map((navObj, i) => renderNav(navObj, i))
}