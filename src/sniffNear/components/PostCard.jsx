import { UserCard } from './UserCard';
import { Link, useNavigate } from 'react-router-dom';

export const PostCard = ( { data = {} } ) => {

    const { title, content, creator, category, created, img, _id } = data;
    const navigate = useNavigate();
    // console.log(data);
    return (
    <li className='postCard'>

        { creator && <UserCard user={creator} createdAt={created} />}
        <div className='preview'>
            <img src={img ? img : '/img/noImgPlaceholder.svg'} alt={title} onClick={() => {navigate(`/blog/${_id}`)}}/>
            <div onClick={() => {navigate(`/blog/${_id}`)}}>
                <p>{category}</p>
                <h2 className='cap'>{title}</h2>
                <div>
                    <p className='cap'>{content}</p>
                    <Link to={`/blog/${_id}`} className='link'>Ver más</Link>
                </div>
            </div>
        </div>


    </li>
    )
}
