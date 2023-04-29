import { AppShell, Footer } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import AppFooter from "common/AppFooter";
import Header from 'common/Header';
import SessionTimeout from '../features/logout/SessionTimeout';

export default function MainFrame() {
  return (
    <AppShell
      padding={0}
      header={<Header />}
      footer={
          <Footer height={80} p="xs">
              {<AppFooter />}
          </Footer>
      }
      styles={(theme) => ({
        header: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
        main: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      })}
    >
      <SessionTimeout/>
      <Outlet />
    </AppShell>
  );
}
