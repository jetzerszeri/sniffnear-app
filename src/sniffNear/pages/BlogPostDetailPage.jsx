import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchSniffNearApi } from '../../hooks';
import { NavBar, PostDetails } from '../components';
import { Loader } from '../../ui';

export const BlogPostDetailPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error, getData } = useFetchSniffNearApi();
    const [ post, setPost ] = useState({});

    useEffect(() => {
        getData(`blog/${id}`);
    }, [getData, id]);

    useEffect(() => {
        if (data) {
            setPost(data);
        } else if (error) {
            navigate(-1, { replace: true });
        }
    }, [data, error, navigate]);
    
    return (
    <>
        <NavBar title={ post.title } />

        {
            post.title && <PostDetails post={ post } />
        }

        {
            isLoading && <Loader />
        }
    </>
    )
}
