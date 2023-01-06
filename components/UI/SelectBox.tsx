import {FC} from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import {IArtist} from "../../types/artist";
import {IAlbum} from "../../types/album";

interface SelectBoxProps {
    options: IArtist[] | IAlbum[];
    setValue: (value:any) => void;
    label: string
}


const SelectBox: FC<SelectBoxProps> = ({options, setValue, label}) => {
    return (
        <Autocomplete
            sx={{width: '100%'}}
            options={options}
            clearOnEscape
            onChange={(event, value:any) => setValue(value)}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value)=> option._id === value._id}
            renderInput={(params) => <TextField {...params} label={label}/>}
        />
    )
}


export default SelectBox