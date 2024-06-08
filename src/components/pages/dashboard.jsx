import { useDispatch } from "react-redux";
import {logout} from '../slices/authSlice'

const Dashboard = () => {
    const dispatch = useDispatch()

    const handleLogOut = async () => {
        await dispatch(logout())
    }
    return (
    <div>
       <h1>Dashboard</h1> 
       <button onClick={handleLogOut}>Logout</button>
    </div>
    
    );   
   }
   
   export default Dashboard;