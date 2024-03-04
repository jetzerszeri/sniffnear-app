import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BlogPage } from '../pages';

export const BlogRoutes = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={ <BlogPage /> } />
            {/* <Route path="/new" element={ <AlertsAddPage /> } /> */}
            <Route path="/*" element={ <BlogPage /> } />
            {/* <Route path="/:id" element={ <AlertDetailPage /> } />
            <Route path="/:id/edit" element={ <AlertsEditPage /> } /> */}
        </Routes>
        
        </>
    )
}
