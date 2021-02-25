import React, {useEffect, useState} from "react";
import ReactCardFlip from 'react-card-flip';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import * as IconRegular from "@fortawesome/free-regular-svg-icons";
import * as IconSolid from "@fortawesome/fontawesome-free-solid";
import {useDispatch, useSelector} from "react-redux";
import {nasaFavoris, selectNasaFavoris} from "./nasaSlice";


export const NasaInfo = (props) => {

    // ---- rcupération de la liste des favoris et du dispatch
    const favoris = useSelector(selectNasaFavoris);
    const dispatch = useDispatch();
    // ----

    // ---- ajout du mouvement de la carte pour les informations
    const [isFLip, setFlip] = useState(false);
    const handleFlip = () => {
        setFlip(!isFLip);
    };
    // ----

    // ---- ajoute de l'étoile si c'est un favoris
    const [icon, setIcon] = useState(IconRegular.faStar);
    const handleStar = (photo) => {
        let newFavoris = favoris.map(favoris => favoris);
        if (icon === IconSolid.faStar){
            setIcon(IconRegular.faStar);
            newFavoris = favoris.filter(favori => favori.id !== photo.id);
        }else{
            newFavoris.push(photo);
            setIcon(IconSolid.faStar);
        }
        dispatch(
            nasaFavoris({
                favoris:newFavoris
            })
        );
    };
    // ----

    // effectuer useEffect une seul fois grâce au []
    useEffect(() => {
        if (props.isFavoris !== true){
            setIcon(IconRegular.faStar);
        }else{
            setIcon(IconSolid.faStar);
        }
    },[]);
    // ----

    return(
        <div className="col-12 col-md-4 mt-3">
            <ReactCardFlip isFlipped={isFLip} flipDirection="vertical" containerStyle={{height:"100%"}}>
                <div className="card h-100">
                    <img onClick={()=> handleFlip()} src={props.photo?.img_src} className="card-img-top" alt={props.photo?.img_src}/>
                    <div className="card-body d-flex flex-column justify-content-end">
                        <div>
                            <h5 className="card-title">{props.photo?.camera.name}</h5>
                            <p>{props.photo?.camera.full_name}</p>
                            <div onClick={()=>handleStar(props.photo)}>
                                <FontAwesomeIcon icon={icon} className={"text-dark"}/>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card" onClick={()=> handleFlip()}>
                    <div className="card-body">
                        <h5 className="card-title">Rover {props.photo?.rover.name}</h5>
                        <p>landing date: {props.photo?.rover.landing_date}</p>
                        <p>launch date: {props.photo?.rover.launch_date}</p>

                    </div>
                </div>
            </ReactCardFlip>
        </div>
    )
}
