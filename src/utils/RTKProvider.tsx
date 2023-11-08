'use client'
import { Provider } from "react-redux";
import store from "../../store";

export interface AuxProps  { 
    children: React.ReactNode
 }

function RTKProvider({children}: AuxProps) {
  return (
    <Provider store={store}>
        {children}
    </Provider>
  )
}

export default RTKProvider