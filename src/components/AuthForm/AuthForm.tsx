import {LogInForm} from "./LogInForm/LogInForm";

export interface IAuthForm {
    username: string,
    password: string
}

export const AuthForm: React.FC = () => {
    return (
        <>
            <LogInForm/>
        </>
    )
}