import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { serverHost } from '../../api/config';

export default function DeleteButton({name, configList, setConfigList}) {

    async function handleDelete() {
        const resultResponse = await fetch(`${serverHost}/remove-config`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: name})
        });

        const result = resultResponse.json()

        // console.log(result)
        const configListResponse = await fetch(`${serverHost}/list-config`);
        const configListData = await configListResponse.json();
        setConfigList(configListData.configList);
    }

    return (
        <>
            <IconButton color="inherit" onClick={handleDelete} aria-label="close">
                <DeleteIcon />
            </IconButton>
        </>
    );
}
