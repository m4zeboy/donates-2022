import { React, createContext, useState } from "react";

export const DonatesContext = createContext();

export const DonatesProvider = function({children}) {
    const [donates, setDonates] = useState(() => {
    const saved = localStorage.getItem('donates')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })
  return (
    <DonatesContext.Provider value={{donates, setDonates}}>
      {children}
    </DonatesContext.Provider>
  )
}