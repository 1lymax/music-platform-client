import {FC, useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import {getEntityById} from "../../../helpers/getEntityById";

interface SelectBoxProps {
    options: any[];
    label: string;
    defaultValue?: any;
    multiple?: boolean;
    onChange: (value: any) => void;
}


const SelectTemplate: FC<SelectBoxProps> = ({ options, onChange, label, defaultValue = null, multiple }) => {
    const [value, setValue] = useState<any>(null);


    useEffect(() => {
        const isEmptyArray = Array.isArray(defaultValue) && defaultValue.length === 0;
        if (defaultValue && !isEmptyArray) {
            setValue(defaultValue);
        }
    }, [defaultValue]);

    return (
        <Autocomplete
            fullWidth
            clearOnEscape
            multiple={multiple}
            value={value}
            options={options}
            defaultValue={defaultValue ? defaultValue : null}
            onChange={(event, value: any) => {
                setValue(value);
                onChange(value);
            }}
            getOptionLabel={(option) => option.name ? option.name : ""}
            isOptionEqualToValue={(option, value) => {
                if (Array.isArray(value)) {
                    console.log(Boolean(getEntityById(option._id, value)));
                    return Boolean(getEntityById(option._id, value));
                }
                return option._id === value._id;
            }}
            renderInput={(params) => <TextField {...params} label={label}/>}
        />
    );
};


export default SelectTemplate;