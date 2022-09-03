import React, {useEffect} from 'react'
import {Box, Button} from "@mui/material";
import {LinkShorter} from "./LinkShorter";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {ILink, ILinks} from "../../store/types/main";
import {fetchLinks} from "../../store/action-creators/mainPageAC";
import {useActions} from "../../hooks/useAction";

export const MainPage: React.FC = () => {
    const links: ILinks = useTypedSelector((state) => state.mainPage["links"])
    const {access_token, token_type} = useTypedSelector((state) => state.auth["authData"])
    const order = useTypedSelector((state) => state.mainPage["order"])
    const {fetchLinks} = useActions()
    useEffect(() => {
        fetchLinks(order, access_token, token_type)
    }, [])

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 70},
        {field: 'short', headerName: 'Short link', width: 130},
        {field: 'target', headerName: 'Target link', width: 540},
        {
            field: 'counter',
            headerName: 'Counter',
            type: 'number',
            width: 90,
        }
    ];
    const rows: any = links.map((link: ILink) => {
            return {
                id: link.id,
                short: link.short,
                target: link.target,
                counter: link.counter
            }
        }
    )
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',

        }}>
            <LinkShorter/>
            <div style={{marginBottom: '1rem'}}></div>
            <div style={{height: 400, width: '90%'}}>
                <DataGrid
                    sx={
                        {marginLeft: '15rem'}
                    }
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                />
            </div>
            <Button variant="outlined" sx={{
                width: '20rem',
                marginTop: '2rem',
                alignSelf: 'center'
            }} onClick={() => fetchLinks(order, access_token, token_type)}>Update</Button>
        </Box>
    )
}