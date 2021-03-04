import React, {useEffect} from "react";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
import {
    queryIndex,
    selectNasaFavoris,
    selectNasaQuery,
    selectNasaResults,
} from "../Slice/nasaSlice";
import Pagination from "react-js-pagination";
import {NasaInfo} from "../Info/NasaInfo";

export const NasaList = () => {

    // ---- récupération des photos, des favoris, du dispatch et des paramètres de la dernière requête
    const photos = useSelector(selectNasaResults);
    let favoris = useSelector(selectNasaFavoris);
    const query = useSelector(selectNasaQuery);
    const dispatch = useDispatch();
    // ----

    // ---- appelle pour remplir une première fois la liste
    useEffect(() => {
        dispatch(
            queryIndex(query)
        );
    }, [dispatch, query]);
    // ----

    // ---- appel de la nouvelle liste avec la nouvelle query
    const handlePageChange = (page) => {
        const updateQuery = {
            camera: query.camera,
            rover: query.rover,
            page:page
        };
        dispatch(
            queryIndex(updateQuery)
        );
    };
    // ----

    const listRender = (
        <div className={"d-flex overflow-auto mb-5"}>
            {
                photos.map(photo => {
                    const isFavoris = favoris.map(item => item.id === photo.id).includes(true)
                    return <NasaInfo photo={photo} isFavoris={isFavoris} key={photo.id}/>
                } )
            }
        </div>
    );

    return(
        <div className={"col-12 mt-3"}>
            <div className={"d-flex justify-content-center mt-3"}>
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link bg-dark text-white"
                    hideFirstLastPages
                    prevPageText='prev'
                    nextPageText='next'
                    activePage={query.page}
                    itemsCountPerPage={photos.length}
                    totalItemsCount={3000}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange.bind(this)}
                />
            </div>
            {listRender}
        </div>

    )
}
