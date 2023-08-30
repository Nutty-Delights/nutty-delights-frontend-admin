import { Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import CategoryIcon from '@mui/icons-material/Category';
import AllInboxIcon from '@mui/icons-material/AllInbox';
import SensorsIcon from '@mui/icons-material/Sensors';
import OrderIcon from '@mui/icons-material/ShoppingBag';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const actions = [
    {
      "name": "Orders",
      "link": 'orders',
      "icon": <OrderIcon sx={{ color: 'orange', fontSize: '20px' }} />
    },
    {
      "name": "Categories",
      "link": 'categories',
      "icon": <CategoryIcon sx={{ color: 'orange', fontSize: '20px' }} />
    },
    {
      "name": "Products",
      "link": 'products',
      "icon": <AllInboxIcon sx={{ color: 'orange', fontSize: '20px' }} />
    },
    // {
    //   "name": "Payments",
    //   "link": 'payments',
    //   "icon": <CurrencyRupeeIcon sx={{ color: 'orange', fontSize: '20px' }} />
    // },
    {
      "name": "APIs",
      "link": 'apis',
      "icon": <SensorsIcon sx={{ color: 'orange', fontSize: '20px' }} />
    },
  ]

  const location = useLocation().pathname;
  return (
    <div style={{ background: '#000000c5' }}>
      <div className='admin-panel' style={{ padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography sx={{ fontSize: '24px', color: 'orange', fontWeight: 'bold' }}>Nutty Delights : Admin Panel </Typography>
        <Typography sx={{ fontSize: '24px', color: 'orange', fontWeight: 'bold' }}>{location === '/' ? "Home" : location}</Typography>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

          <div className='actions' style={{ display: 'flex', flexWrap: 'wrap', gap: "10px" }}>

            {
              actions.map((ele, i) => (
                <NavLink style={{ textDecoration: 'none', paddingBlock: '10px', marginRight: '10px', color: 'orange', display: 'flex', alignItems: 'center' }} key={i} to={ele.link}>
                  {/* <Paper sx={{ height: '60px', width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}> */}
                  {ele.icon}
                  <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: 'orange', marginLeft: '5px' }} >{ele.name}</Typography>
                  {/* </Paper> */}
                </NavLink>
              ))

            }


          </div>
        </div>

      </div>
      {/* <Divider></Divider> */}
      <div style={{ paddingInline: '30px', paddingBlock: '10px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <Outlet></Outlet>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  )
}

export default App;
