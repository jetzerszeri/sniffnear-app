import React from 'react';

export const PostCard = ( {data} ) => {

    const { title, content, creator, category, created, img, _id } = data;

    console.log(data);
    return (
    <li className='postCard'>
        <h2>{title}</h2>

    </li>
    )
}
