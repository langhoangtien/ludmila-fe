import PropTypes, { string } from 'prop-types';

import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// ----------------------------------------------------------------------

export default function FilterChecked({ options, checked, setChecked, name, ...other }) {
  const onChange = (value, id) => {
    setChecked(value ? [...checked, id] : checked.filter((item) => item !== id));
  };
  // setIsFetching(true);

  return (
    <Stack {...other}>
      {options.map((option) => (
        <FormControlLabel
          key={option._id}
          control={
            <Checkbox
              size="small"
              value={option._id}
              checked={checked.includes(option._id)}
              onChange={(e) => onChange(e.target.checked, option._id)}
            />
          }
          label={option.name}
        />
      ))}
    </Stack>
  );
}

FilterChecked.propTypes = {
  name: string,
  options: PropTypes.array,
  _id: string,
  checked: PropTypes.array,
  setChecked: PropTypes.func,
};
