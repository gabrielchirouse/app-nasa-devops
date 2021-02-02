import React, {useEffect, useState} from "react";
import { useSelector } from "react-redux";
import {useDispatch} from "react-redux";
import {queryIndex, selectNasaFavoris, selectNasaInfos, stateQuery} from "./nasaSlice";
import Pagination from "react-js-pagination";
import {NasaInfo} from "./NasaInfo";

export const NasaList = () => {
    const photos = useSelector(selectNasaInfos)
    let favoris = useSelector(selectNasaFavoris);
    const dispatch = useDispatch()
    const state = useSelector(stateQuery)
    const [count, setCount] = useState(1)
    useEffect(() => {
        if (state === "idle"){
            dispatch(
                queryIndex(count)
            )
        }
    })
    const handlePageChange = (page) => {
        dispatch(
            queryIndex(page)
        )
        setCount(page)
    }
    const listRender = (
        <div className={"d-flex overflow-auto"}>
            {
                photos.map(photo => {
                    const isFavoris = favoris.map(item => item.id === photo.id).includes(true)
                    return <NasaInfo photo={photo} isFavoris={isFavoris} key={photo.id}/>
                } )
            }
        </div>
    )

    return(
        <div className={"col-12 mt-3"}>
            <div className={"d-flex justify-content-center mt-3"}>
                <Pagination
                    itemClass="page-item "
                    linkClass="page-link"
                    hideFirstLastPages
                    prevPageText='prev'
                    nextPageText='next'
                    activePage={count}
                    itemsCountPerPage={25}
                    totalItemsCount={3000}
                    pageRangeDisplayed={5}
                    onChange={handlePageChange.bind(this)}
                />
            </div>
            {listRender}
        </div>

    )
}
