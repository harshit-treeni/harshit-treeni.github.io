import React, { createContext, useState } from "react"
const NavContext = createContext()

const NavProvider = ({ children }) => {
  const [bookmark, setBookmark] = useState('')
  const [isDataMngmtNavCollapsed, setIsDataMngmtNavCollapsed] = useState(true)
  const [isSupChainNavCollapsed, setIsSupChainNavCollapsed] = useState(true)
  const [isStratNavCollapsed, setIsStratNavCollapsed] = useState(true)
  const [isDiscNavCollapsed, setIsDiscNavCollapsed] = useState(true)
  
  return (
    <NavContext.Provider value={{ 
      bookmark, 
      setBookmark,
      isDataMngmtNavCollapsed,
      setIsDataMngmtNavCollapsed,
      isSupChainNavCollapsed,
      setIsSupChainNavCollapsed,
      isStratNavCollapsed, 
      setIsStratNavCollapsed,
      isDiscNavCollapsed,
      setIsDiscNavCollapsed
    }}>
      { children }
    </NavContext.Provider>
  )
}

const withNav = (Child) => (props) => (
  <NavContext.Consumer>
    {(context) => <Child {...props} {...context}/>}
  </NavContext.Consumer>
);

export { NavProvider, withNav, NavContext }