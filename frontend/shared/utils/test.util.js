
import "@testing-library/jest-dom";
import { fireEvent, render as rtlRender, screen } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import {Provider} from 'react-redux';
import authReducer from '../../features/auth/authSlice';
import { ThemeProvider } from '@emotion/react';

import {theme} from './theme'
function reducer(ui,{
    preloadedState,
    store = configureStore({reducer:{auth:authReducer}},preloadedState),
    renderOptions
}={}
){
    function Wrapper({children}){
        return (
            <Provider store = {store}>
            <ThemeProvider theme={theme}>
              {children}
            </ThemeProvider>
          </Provider>
        )
    }
    return rtlRender(ui,{wrapper:Wrapper,...renderOptions})
}

export * from '@testing-library/react';
export {reducer}

