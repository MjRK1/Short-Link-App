import React from 'react';
import {MainPage} from "./components/MainPage/MainPage";
import {Route, Routes, Navigate} from 'react-router-dom'
import s from './App.module.css'
import {AuthForm} from "./components/AuthForm/AuthForm";
import {useTypedSelector} from "./hooks/useTypedSelector";
function App() {
    const state = useTypedSelector((state) => state)
    return (
        <div className={s.appWrapper}>
            <Routes>
                <Route path={'/'} element={<Navigate to={'/auth'}/>}/>
                <Route path={'/auth'} element={<AuthForm/>}/>
                <Route path={'/main'} element={<MainPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
