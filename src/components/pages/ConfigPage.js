import React from 'react';
import NavBar from '../navigation/NavBar';
import ConfigGrid from '../objects/ConfigGrid';
import Add from '../buttons/Add';

export default function ConfigPage() {
    return (
        <>
            <NavBar />
            <ConfigGrid />
            <Add />
        </>
    );
}