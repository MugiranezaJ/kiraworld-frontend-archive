import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { CustomAppBar } from '../components/AppBar'
import MoneyTransferForm from '../components/MoneyTransfer'
import { Footer } from '../components/views/Footer'
import Login from '../components/views/Login'
import TransferBox from '../components/views/MoneyTransfer'
import Register from '../components/views/Register'
// const history = createBrowserHistory()
export default function AppRoutes(){

    return(
        <BrowserRouter /*history={history}*/>
            <CustomAppBar/>
            <div style={{ 'height': '100%'/*, 'paddingTop': 40*/}}>
                <Routes>
                    <Route path="/send_money" element={<TransferBox/>} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </div>
            <Footer/>
        </BrowserRouter>
    )
}