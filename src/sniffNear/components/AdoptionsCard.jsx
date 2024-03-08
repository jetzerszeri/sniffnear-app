import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AdoptionIcon } from "../../ui";

export const AdoptionCard = ({adoption,   onDeleteClick , onEditClick , showButtons}) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false)
 
  const handleDeleteConfirm =()=>{
    onDeleteClick(adoption._id);
    setShowModal(false)
  }
  const handleCancel = () => {
    setShowModal(false);
    navigate('/adoption');
  };

  return (
    <> 
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
    <li className="alertCard">
      <div className="h">
        <AdoptionIcon />
        <div>
          <h2>Mascota en adopción</h2>
          {/* <p><i className="bi bi-geo-alt"></i> A 5km de tu ubicación</p> */}
        </div>

      </div>


      <div>
        <img src={adoption.img} alt={adoption.type}/>

        <div>
          <div>
            <p>Color: {adoption.color1}, tamaño: {adoption.size}</p>
            <p>{adoption.content}</p>
          </div>

          <div className="actions">
            <Link to={`/adoptions/${adoption._id}`} className="btn">
              Ver detalles
            </Link> 
          </div>

        </div>
      </div>





        
        {/* {showButtons && (
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
        )} */}
    </li>
    </>

    
  )
}
