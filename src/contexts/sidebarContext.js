import React, { createContext, useState } from "react"
const SidebarContext = createContext()

const SidebarProvider = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  
  return (
    <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      { children }
    </SidebarContext.Provider>
  )
}

export { SidebarProvider, SidebarContext }