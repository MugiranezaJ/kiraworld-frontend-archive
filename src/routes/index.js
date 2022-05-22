import {BrowserRouter, Routes, Route} from 'react-router-dom'
import MoneyTransferForm from '../components/MoneyTransfer'
// const history = createBrowserHistory()
export default function AppRoutes(){

    return(
        <BrowserRouter /*history={history}*/>
            <Routes>
                <Route path="/" element={<MoneyTransferForm />} />
            </Routes>
        </BrowserRouter>
    )
}