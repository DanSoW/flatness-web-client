import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import UserProfile from 'src/components/Main/UserProfile';
import ImageList from 'src/components/Main/ImageList';
import VideoList from 'src/components/Main/VideoList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const Main = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 'max-content' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Профиль пользователя" {...a11yProps(0)} />
        <Tab label="Видео" {...a11yProps(1)} />
        <Tab label="Изображения" {...a11yProps(2)} />
        <Tab label="Таблицы" {...a11yProps(3)} />
        <Tab label="Текст" {...a11yProps(4)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserProfile />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <VideoList />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ImageList />
      </TabPanel>
      <TabPanel value={value} index={3}>
        Таблицы
      </TabPanel>
      <TabPanel value={value} index={4}>
        Текст
      </TabPanel>
    </Box>
  );
}

export default React.memo(Main);
