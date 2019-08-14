import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeConfig } from '../../api/rest';

export default function DeleteButton({name}) {

    async function handleDelete() {
        await removeConfig(name)
    }

    return (
        <>
            <IconButton color="inherit" onClick={handleDelete} aria-label="close">
                <DeleteIcon />
            </IconButton>
        </>
    );
}
