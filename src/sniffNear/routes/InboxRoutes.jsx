import React from 'react';
import { PrivateRoutes } from '../../router/PrivateRoutes';
import { Route, Routes } from 'react-router-dom';
import { ChatPage, InboxPage } from '../pages';

export const InboxRoutes = () => {
  return (
    <PrivateRoutes>
        <Routes>
            <Route path="/" element={ <InboxPage /> } />
            <Route path="/chat" element={ <ChatPage /> } />



            <Route path="/*" element={ <InboxPage /> } />
        </Routes>
    </PrivateRoutes>
  )
}
