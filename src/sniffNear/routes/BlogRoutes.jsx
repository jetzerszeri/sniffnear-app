import { Route, Routes } from 'react-router-dom';
import { BlogNewPostPage, BlogPage, BlogPostDetailPage, BlogPostEditPage } from '../pages';
import { PrivateRoutes } from '../../router/PrivateRoutes';

export const BlogRoutes = () => {
    return (
        <>
        <Routes>
            <Route path="/" element={ <BlogPage /> } />
            <Route path="/new" element={ <BlogNewPostPage />} />
            <Route path="/*" element={ <BlogPage /> } />
            <Route path="/:id" element={ <BlogPostDetailPage /> } />
            <Route path="/:id/edit" element={ 
                <PrivateRoutes>
                    <BlogPostEditPage /> 
                </PrivateRoutes>
            } />
        </Routes>
        
        </>
    )
}
