import React, {useState} from "react";

export const useInput = (initialState: any, label:string='') => {
    const [value, setValue] = useState(initialState)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    return {
        componentProps: { value, onChange, label },
        setValue
    }
}