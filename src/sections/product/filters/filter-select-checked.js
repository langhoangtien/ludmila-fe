import { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import { Select, MenuItem, Typography, FormControl } from '@mui/material';

// ----------------------------------------------------------------------

export default function FilterSelectChecked({ options, name, ...other }) {
  const [checked, setChecked] = useState([]);
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();

  const onChange = (value) => {
    setChecked(() => {
      const params = new URLSearchParams(searchParams);
      if (value.length === 0) params.delete(name);
      else params.set(name, value.map((item) => item._id).toString());
      replace(`${pathname}?${params.toString()}`);

      return value;
    });
  };
  // setIsFetching(true);

  return (
    <FormControl fullWidth hiddenLabel>
      <Select
        multiple
        fullWidth
        displayEmpty
        value={checked}
        onChange={(e) => onChange(e.target.value)}
        renderValue={(selected) => {
          if (!selected.length) {
            return (
              <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                All option
              </Typography>
            );
          }
          return (
            <Typography variant="subtitle2" component="span">
              {selected.map((item) => item.name).join(', ')}
            </Typography>
          );
        }}
      >
        {options.map((option) => (
          <MenuItem key={option._id} value={option}>
            <Checkbox
              size="small"
              checked={checked.map((item) => item._id).includes(option._id)}
              sx={{
                [`&.${checkboxClasses.root}`]: {
                  p: 0,
                  mr: 1,
                },
              }}
            />
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

FilterSelectChecked.propTypes = {
  name: string,
  options: PropTypes.array,
};
