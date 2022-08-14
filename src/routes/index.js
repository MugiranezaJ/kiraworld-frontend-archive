import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MoneyTransferForm from '../components/MoneyTransfer'
import Login from '../components/views/Login'
import Register from '../components/views/Register'
// const history = createBrowserHistory()
export default function AppRoutes(){

    return(
        <BrowserRouter /*history={history}*/>
            <Routes>
                <Route path="/" element={<MoneyTransferForm />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </BrowserRouter>
    )
}