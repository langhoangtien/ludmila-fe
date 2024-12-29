import Link from 'next/link';
import * as React from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import TextMaxLine from 'src/components/text-max-line';

export default function BrandViewItem({ name, path, description, image }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={image} title="green iguana" />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }} line={3}>
          {description}
        </TextMaxLine>
      </CardContent>
      <CardActions>
        <Link href={path} passHref legacyBehavior>
          <Button size="small">Xem sản phẩm</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

BrandViewItem.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
