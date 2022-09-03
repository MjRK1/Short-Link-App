import {Controller, SubmitHandler, useForm, useFormState} from "react-hook-form";
import s from "./SignInModal.module.css";
import {Button, TextField, Typography} from "@mui/material";
import {IAuthForm} from "../AuthForm";
import {setIsModalOpen} from "../../../store/action-creators/AuthAC";
import {useActions} from "../../../hooks/useAction";
import {useEffect} from "react";
import {useTypedSelector} from "../../../hooks/useTypedSelector";


export const SignInModal: React.FC = () => {
    const {setIsModalOpen, signIn} = useActions();
    const error = useTypedSelector((state) => state.auth["error"])
    const {handleSubmit, control, setError} = useForm<IAuthForm>({
        mode: 'onChange'
    });
    const {errors} = useFormState({
        control
    })
    const onSubmit: SubmitHandler<IAuthForm> = (formData) => {
        signIn(formData.username, formData.password)
        if (!error) {
            setIsModalOpen(false);
        }
    };
    useEffect(() => {
        setError('username', {
            type: 'server',
            message: error
        })
    })
    return (
        <div className={s.SignInForm}>
            <Typography className={s.pageTitle} variant="h4" component="div">
                Sign in
            </Typography>
            <Typography variant="subtitle1" component="div"
                        gutterBottom={true} className={s.authFormSubtitle}>
                Create account
            </Typography>
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
                            fullWidth={true}
                            onChange={(e) => field.field.onChange(e)}
                            value={field.field.value}
                            error={!!errors.username?.message}
                            helperText={errors.username?.message}
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
                    Sign in
                </Button>
            </form>
        </div>
    )
}
