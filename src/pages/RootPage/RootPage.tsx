import React, { FC } from 'react';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { Header } from '../../components/Header/Header';
import ToolBar from '../../components/ToolBar/ToolBar';

export const RootPage: FC = () => {
  // const socket = io(process.env.REACT_APP_BASE_URL);

  // async function handlePolicy(event: Event) {
  //   event.stopPropagation();
  //
  //   dispatch(logOutThunk());
  //
  //   window.removeEventListener('click', handlePolicy, { capture: true });
  // }

  // useEffect(() => {
  //   socket.on('comment', (res: {userId: string, itemId: number}) => {
  //     if (user.id === res.userId) {
  //       console.log(res);
  //     //   getUntouchedComments(userId);
  //     //   getAllComments(res.itemId);
  //     }
  //   });
  //
  //   socket.on('block', (res: {userId: string}) => {
  //     if (user.id === res.userId) {
  //       console.log(res);
  //     //   logWarning('Your account has been blocked');
  //     //   window.addEventListener('click', handlePolicy, {
  //     //     capture: true,
  //     //     once: true,
  //     //   });
  //     }
  //   });
  //
  //   socket.on('unblock', (res: {userId: string}) => {
  //     if (user.id === res.userId) {
  //       console.log(res);
  //
  //       // logSuccess('Your account has been unblocked');
  //       //
  //       // window.removeEventListener('click', handlePolicy, { capture: true });
  //     }
  //   });
  // }, []);

  return (
    <>
      <Header />
      <Container sx={{ flex: 1, paddingTop: '3.2rem' }}>
        <Outlet />
      </Container>
      <ToolBar />
    </>
  );
};
