import { Route, Routes } from 'react-router-dom';
import { BlogNewPostPage, BlogPage, BlogPostDetailPage } from '../pages';

export const BlogRoutes = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={ <BlogPage /> } />
            <Route path="/new" element={ <BlogNewPostPage /> } />
            <Route path="/*" element={ <BlogPage /> } />
            <Route path="/:id" element={ <BlogPostDetailPage /> } />
            <Route path="/:id/edit" element={ <BlogPostDetailPage /> } />
        </Routes>
        
        </>
    )
}
