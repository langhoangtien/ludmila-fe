import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import Stack from '@mui/material/Stack';
import { alpha } from '@mui/material/styles';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel, { formControlLabelClasses } from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CheckoutPaymentMethod({ options, name }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup
          {...field}
          sx={{
            rowGap: 2.5,
            columnGap: 2,
            display: 'grid',
            gridTemplateColumns: { xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' },
          }}
        >
          {options.map((option) => (
            <OptionItem
              key={option.value}
              option={option}
              selected={field.value === option.value}
            />
          ))}
        </RadioGroup>
      )}
    />
  );
}

CheckoutPaymentMethod.propTypes = {
  options: PropTypes.array,
  name: PropTypes.string,
};

// ----------------------------------------------------------------------

function OptionItem({ option, selected }) {
  const { value, label, description, disabled, icon } = option;

  const renderLabel = (
    <Stack flexGrow={1} spacing={0.5} sx={{ width: 1 }}>
      <Stack direction="row" alignItems="center">
        <Box component="span" sx={{ typography: 'subtitle2', flexGrow: 1 }}>
          {label}
        </Box>

        <Iconify icon={icon} width={24} />
      </Stack>

      <Box component="span" sx={{ typography: 'caption', color: 'text.secondary' }}>
        {description}
      </Box>
    </Stack>
  );

  return (
    <FormControlLabel
      value={value}
      control={
        <Radio
          disabled={disabled}
          disableRipple
          checkedIcon={<Iconify icon="fluent:checkmark-circle-20-regular" />}
          sx={{ mx: 1 }}
        />
      }
      label={renderLabel}
      sx={{
        m: 0,
        py: 3,
        pr: 2,
        borderRadius: 1,
        border: (theme) => `solid 1px ${alpha(theme.palette.grey[500], 0.24)}`,
        ...(selected && {
          boxShadow: (theme) => `0 0 0 1px ${theme.palette.text.primary}`,
        }),
        [`& .${formControlLabelClasses.label}`]: {
          width: 1,
        },
      }}
    />
  );
}

OptionItem.propTypes = {
  option: PropTypes.shape({
    description: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.string,
    icon: PropTypes.string,
    disabled: PropTypes.bool,
  }),
  selected: PropTypes.bool,
};
