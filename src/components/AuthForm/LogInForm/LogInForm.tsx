import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import s from "../AuthForm.module.css";
import {Button, Dialog, DialogContent, Link, TextField, Typography} from "@mui/material";
import {IAuthForm} from "../AuthForm";
import {SignInModal} from "../SignInForm/SignInModal";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useActions} from "../../../hooks/useAction";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export const LogInForm: React.FC = () => {
    const isModalOpen = useTypedSelector((state) => state.auth["isModalOpen"])
    const error = useTypedSelector((state) => state.auth["error"])
    const {setIsModalOpen, logIn} = useActions();
    const {handleSubmit, control, setError} = useForm<IAuthForm>({
        mode: 'onChange'
    });
    const navigate = useNavigate();
    const {errors} = useFormState({
        control
    })
    const onSubmit: SubmitHandler<IAuthForm> = (formData) => {
        logIn(formData.username, formData.password);
        if (!error) {
            navigate('/main')
        }
    };
    useEffect(() => {
        if (error) {
            setError("password", {
                type: 'server',
                message: error
            })
        }
    })
    return (
        <div className={s.authForm}>
            <Typography className={s.pageTitle} variant="h4" component="div">
                Short link app
            </Typography>
            <Typography variant="subtitle1" component="div"
                        gutterBottom={false} className={s.authFormSubtitle}>
                To get access log in or
                <div><Link margin={"normal"} onClick={() => {
                    setIsModalOpen(true)
                }}
                           component="button" variant="body2"
                           color="#1769aa">
                    sign in</Link></div>
            </Typography>
            <Dialog open={isModalOpen}
                    onClose={() => {
                        setIsModalOpen(false)
                    }}>

                <DialogContent>
                    <SignInModal/>
                </DialogContent>
            </Dialog>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    rules={{required: 'Required field'}}
                    name={"username"}
                    render={(field) => (
                        <TextField
                            label="Username"
                            size="small"
                            margin="normal"
                            className={s.authFormInput}
                            fullWidth={true}
                            onChange={(e) => field.field.onChange(e)}
                            value={field.field.value}
                            error={!!errors.username?.message || !!error}
                            helperText={errors.username?.message || !!error}
                        />
                    )}
                />
                <Controller
                    control={control}
                    rules={{required: 'Required field'}}
                    name={"password"}
                    render={(field) => (
                        <TextField
                            label="Password"
                            type="password"
                            size="small"
                            margin="normal"
                            className={s.authFormInput}
                            fullWidth={true}
                            onChange={(e) => field.field.onChange(e)}
                            value={field.field.value}
                            error={!!errors.password?.message}
                            helperText={errors.password?.message}
                        />
                    )}
                />
                <Button type="submit"
                        variant="contained"
                        fullWidth={true}
                        disableElevation={true}
                        sx={{
                            marginTop: 2
                        }}>
                    Log in
                </Button>
            </form>
        </div>
    )
}