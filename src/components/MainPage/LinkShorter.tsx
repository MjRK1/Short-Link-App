import {useTypedSelector} from "../../hooks/useTypedSelector";
import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import {ILinkForm} from "../../store/types/main";
import React, {useEffect, useState} from "react";
import {useClipboard} from "use-clipboard-copy";
import {useActions} from "../../hooks/useAction";
import {useNavigate} from "react-router-dom";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import s from "./MainPage.module.css";
import SendIcon from "@mui/icons-material/Send";

export const LinkShorter: React.FC = () => {
    const {access_token, token_type} = useTypedSelector((state) => state.auth["authData"])
    const shortLink = useTypedSelector((state) => state.mainPage["shortLink"])
    let error = useTypedSelector((state) => state.mainPage["error"])
    const {handleSubmit, control, setError, clearErrors} = useForm<ILinkForm>({
        mode: 'all'
    })
    const [status, setStatus] = useState(false)
    const clipboard = useClipboard()
    const {getShortLink} = useActions();
    const {errors} = useFormState({control})
    const copyHandler = React.useCallback(() => {
        clipboard.copy(shortLink)
        setStatus(true)
        const timer = setTimeout(() => {
            setStatus(false)
        }, 2000);
        return () => clearTimeout(timer);
    }, [clipboard.copy, shortLink])
    const onSubmit: SubmitHandler<ILinkForm> = (formData) => {
        getShortLink(formData.target, access_token, token_type)

    }
    const navigate = useNavigate()
    const notAuthNavigate = () => {
        navigate('/auth')
    }
    useEffect(() => {
        if (error) {
            setError("target", {
                type: 'server',
                message: error
            })
        }
    },[errors, error])
    return (
        <Box>
            <Stack direction="column"
                   justifyContent="center"
                   alignItems="center"
                   spacing={2}>
                <Box sx={{
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                    marginTop: '1rem',
                }}>
                    <Typography sx={{textTransform: 'uppercase'}} variant="h3" component="div">
                        Short link app
                    </Typography>
                </Box>
                <Box sx={{
                    width: '40%'
                }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Box sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'baseline'

                        }}>
                            <Controller
                                control={control}
                                name={"target"}
                                render={(field) => (
                                    <TextField
                                        label="Your link"
                                        variant="outlined"
                                        size="small"
                                        className={s.linkField}
                                        fullWidth={true}
                                        onChange={(e) => field.field.onChange(e)}
                                        value={field.field.value}
                                        error={!!errors.target?.message}
                                        helperText={errors.target?.message}
                                    />
                                )}/>
                            <Button type="submit" variant="contained" endIcon={<SendIcon/>}>
                                Send
                            </Button>
                        </Box>
                    </form>
                </Box>
                {!!shortLink && <Box>
                    <Button sx={{width: "20rem"}} variant={"outlined"} color="success"
                            onClick={copyHandler}>{shortLink}</Button>
                    {status && <Typography sx={{
                        textAlign:'center',
                        color: '#44bb4a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1rem'
                    }} variant="subtitle1" component="div">Copied</Typography>}
                </Box>}
                {errors.target?.message == 'Not authenticated' && <Button variant="contained" color="warning" onClick={notAuthNavigate}>
                    Authorize
                </Button>}
            </Stack>
        </Box>
    )
}