import { useContext } from "react"
import { ContextType } from "./types"
import productContext from "./productContext"

export const useProductContext = () => {
    const context: ContextType = useContext(productContext);

    if(!context) {
        throw new Error("useProductContext must be used within an ProductProvider");
    }

    return context;
}