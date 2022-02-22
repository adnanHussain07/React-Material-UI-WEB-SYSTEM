import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import InvitesTable from './InvitesTable';

export default function MyComputerContent() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return <InvitesTable />;
}
