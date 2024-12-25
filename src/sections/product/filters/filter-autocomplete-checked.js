import PropTypes from 'prop-types';

import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

export default function FilterAutocompleteChecked({ options, checked, setChecked, name }) {
  const onChange = (value) => {
    setChecked(value);
  };
  return (
    <Autocomplete
      multiple
      limitTags={2}
      disableCloseOnSelect
      options={options}
      getOptionLabel={(option) => option.name}
      value={checked}
      onChange={(event, value) => onChange(value)}
      slotProps={{
        paper: {
          sx: {
            [`& .${autocompleteClasses.listbox}`]: {
              [`& .${autocompleteClasses.option}`]: {
                [`& .${checkboxClasses.root}`]: {
                  p: 0,
                  mr: 1,
                },
              },
            },
          },
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          hiddenLabel={!checked.length}
          placeholder="Tất cả danh mục"
          InputProps={{
            ...params.InputProps,
            autoComplete: 'search',
          }}
        />
      )}
      renderOption={(props, option, { selected }) => (
        <li {...props} key={option._id}>
          <Checkbox key={option._id} size="small" disableRipple checked={selected} />
          {option.name}
        </li>
      )}
      renderTags={(selected, getTagProps) =>
        selected.map((option, index) => (
          <Chip
            {...getTagProps({ index })}
            key={option._id}
            label={option.name}
            size="small"
            color="info"
            variant="soft"
          />
        ))
      }
    />
  );
}

FilterAutocompleteChecked.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  checked: PropTypes.array,
  setChecked: PropTypes.func,
};
