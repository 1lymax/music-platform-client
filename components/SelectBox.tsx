import {FC} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

interface SelectBoxProps {
    options: {
        _id: string;
        name: string
    }[];
    setValue: (value:any) => void;
    label: string
}


const SelectBox: FC<SelectBoxProps>= ({options, setValue, label}) => {


    return (
        <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={options}
            clearOnEscape
            onChange={(value:any) => setValue(value._id)}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label={label}/>}
        />
    )
}


export default SelectBox