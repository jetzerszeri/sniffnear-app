import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { BlogNewPostPage, BlogPage } from '../pages';

export const BlogRoutes = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={ <BlogPage /> } />
            <Route path="/new" element={ <BlogNewPostPage /> } />
            <Route path="/*" element={ <BlogPage /> } />
            {/* <Route path="/:id" element={ <AlertDetailPage /> } />
            <Route path="/:id/edit" element={ <AlertsEditPage /> } /> */}
        </Routes>
        
        </>
    )
}
