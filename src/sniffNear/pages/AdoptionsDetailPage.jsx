import { useParams } from 'react-router-dom';
import { AdoptionPetProfile, NavBar } from '../components';
import { Link, useNavigate } from "react-router-dom";
import React, {useEffect, useState} from "react";
// import {BottomNav} from "../BottomNav";
import { setDefaults, geocode, RequestType, } from "react-geocode";
import { useFetchSniffNearApi } from '../../hooks';
import { Loader } from '../../ui';
// import { getCurrentUserId } from "../../js/functions";

export const AdoptionsDetailPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading, error, getData } = useFetchSniffNearApi();


    useEffect(() => {
      getData(`adoption/${id}`);
  }, [ getData, id ]);


    useEffect(() => {
      data && console.log(data);
    }, [data])
    



    const [showModal, setShowModal] = useState(false)



   
    // const handleDeleteConfirm =()=>{
    //   onDeleteClick(adoption._id);
    //   setShowModal(false)
    // }
    // const handleCancel = () => {
    //   setShowModal(false);
    //   navigate('/adoption');
    // };

    return (
    <>
        <NavBar title='Detalle de mascota' />

        {
          data && 
          <AdoptionPetProfile pet={data} />

        }




        {/* <main>
             {showModal && (
      <div className="myModal">
          <div className="headerModal">
            <h1>¿Estás seguro que deseas eliminar esta adopción?</h1>
            <i class="bi bi-x" onClick={handleCancel}></i>
          </div>
          <div className="bodyModal">
          <button onClick={handleCancel}>
          Cancelar
          </button>
          <button onClick={handleDeleteConfirm} className="buttonDelete">
          Sí, ELIMINAR
          </button>
          </div>
      </div>
    )}
       <li>
        <img src={adoption.img} alt={adoption.type}/>
        <p>Color: {adoption.color1}, tamaño: {adoption.size}</p>
        <Link to={`/adoption-detail?adoptionId=${adoption._id}`}>
          <button className="viewAlert">Ver adopción</button>
        </Link>
        
        {showButtons && (
         <div className="buttonsAlert">
         <button className="buttonDelete" onClick={() => setShowModal(true)}>
           <i className="bi bi-trash"/>
         </button>
       
         <Link to={`/edit-adoption?adoptionId=${adoption._id}`}>
         <button className="btn">
           <i className="bi bi-pencil"/>
         </button>
         </Link>
       </div>
        )}
    </li>
        </main> */}

      {
          isLoading && <Loader />
      }

    
    </>
    )
}
