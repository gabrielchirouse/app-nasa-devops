import React, {useEffect} from "react";
import {querySlider, selectNasaSlider} from "./nasaSlice";
import {useDispatch, useSelector} from "react-redux";

export const NasaCaroussel = () => {
    const photos = useSelector(selectNasaSlider)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(
            querySlider()
        )
    },[] )

    let first = true
    const renderedPhotos = photos.map(photo => {
        let className = "carousel-item"
        if (first) {
            className+= " active"
            first=!first
        }
        return (
            <div className={className} key={photo.id}>
                <img src={photo.img_src} className="d-block w-100" alt={photo.id}/>
            </div>
        )
    })
    return(
        <div className={"col-12 d-flex justify-content-center mt-3"}>
            <div className={"col-4"}>
                <div id="carousel" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                        {renderedPhotos}
                    </div>
                    <a className="carousel-control-prev" href="#carousel" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carousel" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
            </div>
        </div>
    )
}


