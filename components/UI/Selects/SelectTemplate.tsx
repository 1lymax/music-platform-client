import {FC, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface SelectBoxProps {
    options: any[];
    onChange: (value: any) => void;
    label: string;
    defaultValue?: any;
}


const SelectTemplate: FC<SelectBoxProps> = ({ options, onChange, label, defaultValue=null }) => {
    const [value, setValue] = useState(null);

    useEffect(() => {
        setValue(defaultValue)
    }, [defaultValue]);

    return (
        <Autocomplete
            fullWidth
            clearOnEscape
            value={value}
            options={options}
            defaultValue={defaultValue ? defaultValue : null}
            onChange={(event, value: any) => {
                setValue(value);
                onChange(value);
            }}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option._id === value._id}
            renderInput={(params) => <TextField {...params} label={label}/>}
        />
    );
};


export default SelectTemplate;