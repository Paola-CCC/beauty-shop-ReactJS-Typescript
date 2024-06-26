import React, { useEffect, useRef, useState } from 'react'
import './UsersDetails.scss';
import authService from '../../services/authService';
import { UserDatas } from '../../types/user.type';
import { useAppDispatch } from '../../redux/hooks';
import { updateUserInfos } from '../../redux/auth/authSlice';


const UsersDetails = () => {

   const [ userData,setUserData] = useState<  UserDatas >({} as UserDatas);
   const datasUserFetched = useRef<boolean>(false)
   const dispatch = useAppDispatch();

   useEffect(() => {

      // Récupère données utilisateur par le userId dans le localStorage
      const getUser = async () => {
         try {
            const userStorage = localStorage.getItem("userToken");      
            if (userStorage) {
               let userDataStored = JSON.parse(userStorage);
               const response = await authService.getCurrentUserById(userDataStored.id);
               dispatch(updateUserInfos(response.data));
               setUserData(response.data);
            }

         } catch (error) {
            console.error("Error " , error);
         }
      }

      if( datasUserFetched.current === false && Object.keys(userData).length === 0){
         getUser()
         datasUserFetched.current = true ;
      }

   },[userData ,dispatch])
   
  return (
    <>

        <h3 className="details"> Données personnelles </h3>
        <div className='details'>
          <ul className='block'>
            <li>
               <h4>Prénom NOM</h4>
               <span>  { (userData?.firstname) + ' '  + (userData?.lastname)?.toUpperCase()}   </span>
            </li>

            <li>
               <h4>Pseudo</h4>
               <span>{userData?.pseudo}  </span>
            </li>
            <li>
               <h4>Votre adresse e-mail</h4>
               <span>{userData?.email}  </span>
            </li>
            <li>
               <h4>Anniversaire</h4>
               <span>{userData?.birthday}  </span>
            </li>
            <li>
               <h4>Votre mot de passe</h4>
               <p> *********</p>
            </li>
          </ul>
        </div>
        {/* <div className='btn-update-zone'>
            <button onClick={handleUpdateData}>
               <i className="fa-solid fa-pen-to-square"></i>
                Modifier
            </button>
        </div> */}

    </>  )
}

export default UsersDetails;