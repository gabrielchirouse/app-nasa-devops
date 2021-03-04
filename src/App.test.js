import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import {NasaCaroussel} from "./features/nasa/Caroussel/NasaCaroussel";
import * as IconSolid from "@fortawesome/fontawesome-free-solid";
import {NasaFavoris} from "./features/nasa/Favoris/NasaFavoris";
import {NasaHistorique} from "./features/nasa/Historique/NasaHistorique";
import {NasaInfo} from "./features/nasa/Info/NasaInfo";
import {NasaList} from "./features/nasa/List/NasaList";
import {NasaNavBar} from "./features/nasa/NavBar/NasaNavBar";
import {NasaSearch} from "./features/nasa/Search/NasaSearch";

describe('Test du caroussel', () => {

    test('Vérification que Next est présent', async () => {
        render(
            <Provider store={store}>
                <NasaCaroussel/>
            </Provider>
        );
        const message = await screen.findByText(/Next/);
        expect(message).toBeInTheDocument();
    })
})

describe('Test des Favoris', () => {

    test('Vérification que le placeholder affiche bien camera ou rover..', async () => {
        render(
            <Provider store={store}>
                <NasaFavoris/>
            </Provider>
        );
        const message = await screen.findByPlaceholderText(/camera ou rover../);
        expect(message).toBeInTheDocument();
    })
})

describe('Test des Historique', () => {

    test('Vérification que le titre Historique est présent', async () => {
        render(
            <Provider store={store}>
                <NasaHistorique/>
            </Provider>
        );
        const message = await screen.findByText(/Historique/);
        expect(message).toBeInTheDocument();
    })
})

describe('Test des Info', () => {

    test('Vérification que le mot Rover est présent', async () => {
        render(
            <Provider store={store}>
                <NasaInfo/>
            </Provider>
        );
        const message = await screen.findByText(/Rover/);
        expect(message).toBeInTheDocument();
    })
})

describe('Test des List', () => {

    test('Vérification que bouton previous est present', async () => {
        render(
            <Provider store={store}>
                <NasaList/>
            </Provider>
        );
        const message = await screen.findByText(/prev/);
        expect(message).toBeInTheDocument();
    })
})

describe('Test des NavBar', () => {

    test('Vérification Le bouton Home est present', async () => {
        render(
            <Provider store={store}>
                <NasaNavBar/>
            </Provider>
        );
        const message = await screen.findByText(/Home/);
        expect(message).toBeInTheDocument();
    })
})


describe('Test des Search', () => {

    test('Vérification Le selecteur affichie bien Curiosity', async () => {
        render(
            <Provider store={store}>
                <NasaSearch/>
            </Provider>
        );
        const message = await screen.findByText(/Curiosity/);
        expect(message).toBeInTheDocument();
    })
})

