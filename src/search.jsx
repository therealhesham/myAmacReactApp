import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox({data}) {
    
    const datas = [...data]
    // console.log(datas)
    return (
        <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={datas.map((option) => option.items)}
        renderInput={(params) => (
          <TextField oى={e=>console.log(e.target.value)}
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
