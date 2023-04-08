import TextField from "@mui/material/TextField";
import React, {useEffect, useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {isEmptyArray} from "../../../helpers/isEmptyArray";
import {getEntityById} from "../../../helpers/getEntityById";

interface Props {
    options: any[];
    label: string;
    defaultValue?: any;
    multiple?: boolean;
    onChange: (value: any) => void;
}


const SelectTemplate = (props: Props) => {
    const { options, onChange, label, defaultValue = null, multiple } = props;
    const [value, setValue] = useState<any>(multiple ? [] : null);

    useEffect(() => {
        if (defaultValue && !isEmptyArray(defaultValue)) {
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
            getOptionLabel={(option) => option.name ? option.name : option}
            isOptionEqualToValue={(option, value) => {
                if (typeof option === "string")
                    return option === value;
                if (Array.isArray(value)) {
                    return Boolean(getEntityById(option._id, value));
                }
                return option._id === value._id;
            }}
            renderInput={(params) => <TextField {...params} label={label}/>}
        />
    );
}


export default SelectTemplate;