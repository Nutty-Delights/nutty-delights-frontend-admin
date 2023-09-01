import { Box, Card } from '@mui/material'
import { AgGridReact } from 'ag-grid-react'
import React, { memo, useEffect, useMemo, useRef, useState } from 'react'
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-balham.css'; // Optional theme CSS
import { useDispatch, useSelector } from 'react-redux';
import { cancelOrdersHandler, deliveredOrdersHandler, getAllOrders, getAllOrdersHandler, getOrderError, getOrderLoading, shippingOrdersHandler } from '../Redux/slices/orders';



const NameCellRenderer = memo((params) => {
    // const renderCountRef = useRef(1);
    // console.log("cell Params ", params)
    return (
        <h4 style={{ fontWeight: 'normal' }} className="my-renderer">
            {params.data.user.firstName + " " + params.data.user.lastName}
            {/* {'A'} */}
        </h4>
    );
});
const MobileCellRenderer = memo((params) => {
    // const renderCountRef = useRef(1);
    // console.log("cell Params ", params)
    return (
        <span className="my-renderer">
            {params.data.user.mobileNumber}
            {/* {'A'} */}
        </span>
    );
});
const EmailCellRenderer = memo((params) => {
    // const renderCountRef = useRef(1);
    // console.log("cell Params ", params)
    return (
        <span className="my-renderer">
            {params.data.user.email}
            {/* {'A'} */}
        </span>
    );
});
const Address = memo((params) => {
    // const renderCountRef = useRef(1);
    // console.log("address", params);
    const user = params.data.shippingAddress;
    const address = user.firstName + " " + user.lastName + ", " + user.houseNo + ", " + user.addressLine;

    // console.log(params)
    return (
        <div style={{ display: 'block' }}>
            <h4 style={{ wordBreak: 'break-word', fontWeight: "normal" }} className="my-renderer">
                {address}
            </h4>

        </div>
    );
});
const Address2 = memo((params) => {
    // const renderCountRef = useRef(1);
    // console.log("address", params);
    const user = params.data.shippingAddress;
    const address = user.pinCode + ", " + user.state;


    // console.log(params)
    return (
        <div style={{ display: 'block' }}>
            <h4 style={{ wordBreak: 'break-word' }} className="my-renderer">
                {address}
            </h4>

        </div>
    );
});
const Date = memo((params) => {
    // const renderCountRef = useRef(1);
    // console.log("Date", params);
    const order = params.data;
    var d = new window.Date(order.createdAt).toISOString().split('T')[0];
    var dt = new window.Date(order.createdAt).toLocaleTimeString();

    // console.log();
    // const orderDate = new Date(order?.createdAt).toISOString().split('T')[0]



    // console.log(params)
    return (
        <div style={{ display: 'block' }}>
            <h4 style={{ wordBreak: 'break-word' }} className="my-renderer">
                {/* {orderDate} */}
                {d + ", " + dt}
            </h4>

        </div>
    );
});
const OrderItems = memo((params) => {
    // const renderCountRef = useRef(1);
    // console.log("Date", params);
    const order = params.data;


    // const orderDate = new Date(order?.createdAt).toISOString().split('T')[0]



    // console.log(params)
    return (
        <ol>
            {
                order?.orderItems.map((item, i) => (
                    <li >
                        <h4 style={{ marginBlock: '0px', fontWeight: 'normal', color: '#ffffc2' }}>{item.product.productName + " | " + item.variant.weight + " X " + item.quantity}</h4>

                    </li>
                ))
            }
        </ol >
    );
});
const PaymentDetails = memo((params) => {
    // const renderCountRef = useRef(1);
    // console.log("Date", params);
    const order = params.data;

    // const orderDate = new Date(order?.createdAt).toISOString().split('T')[0]



    // console.log(params)
    return (
        <ul>
            <li><h4 style={{ marginBlock: '0px', fontWeight: 'normal' }}>Id : {order.paymentDetails.paymentId}</h4></li>
            <li ><h4 style={{ marginBlock: '0px', color: order.paymentDetails.status === "COMPLETED" ? "#8dff12" : 'red' }}>Status: {order.paymentDetails.status}</h4></li>
            <li><h4 style={{ marginBlock: '0px', fontWeight: 'normal' }}>Method: {order.paymentDetails.paymentMethod}</h4></li>
        </ul>
    );
});

const Orders = () => {




    const dispatch = useDispatch();
    const [date, setDate] = useState(new window.Date().toLocaleTimeString());
    const orders = useSelector(getAllOrders);
    // console.log(orders);
    const gridRef = useRef(); // Optional - for accessing Grid's API

    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row



    // Each Column Definition results in one Column.
    const [columnDefs, setColumnDefs] = useState([
        { field: 'orderId', filter: true, 'width': 100, 'suppressSizeToFit': true },
        {
            field: 'user',
            filter: true,
            'width': 100,
            'suppressSizeToFit': true,

            // cellRenderer: CellRenderer,
            children: [
                {
                    field: 'Name',
                    'width': 100,
                    'suppressSizeToFit': true,
                    cellRenderer: NameCellRenderer
                },
                {
                    field: 'Mobile',
                    'width': 100,
                    'suppressSizeToFit': true,
                    cellRenderer: MobileCellRenderer,
                    columnGroupShow: 'open',
                },
                {
                    field: 'Email',
                    'width': 100,
                    'suppressSizeToFit': true,
                    cellRenderer: EmailCellRenderer,
                    columnGroupShow: 'open',
                },
                // { field: 'City', 'width': 100, 'suppressSizeToFit': true, }

            ]
        },
        {
            field: 'orderDate',
            filter: true,
            cellRenderer: Date,
            'width': 100,
            'suppressSizeToFit': true,
            sort: 'desc',
            // sortingOrder: ['desc'],
            sortable: true




        },
        {
            field: 'shippingAddress',
            cellStyle: { 'wrap-text': true },
            children: [
                {
                    field: 'details',
                    'width': 200,
                    'suppressSizeToFit': true,
                    cellRenderer: Address
                },
                {
                    field: 'details 2',
                    'width': 100,
                    'suppressSizeToFit': true,
                    columnGroupShow: 'open',
                    cellRenderer: Address2
                },

                // { field: 'City', 'width': 100, 'suppressSizeToFit': true, }

            ]

        },
        {
            field: 'totalPrice', 'width': 100, 'suppressSizeToFit': true, cellStyle: () => {
                return { color: '#8dff12', padding: '20px', fontWeight: 'bold' }
            }
        },
        {
            field: 'totalItems', 'width': 80, 'suppressSizeToFit': true, cellStyle: () => {
                return { color: 'orange', padding: '20px', fontWeight: 'bold' }
            }
        },
        { field: 'orderItems', flex: 1, width: 300, minWidth: 300, cellRenderer: OrderItems },
        { field: 'paymentDetails', minWidth: 300, 'suppressSizeToFit': true, cellRenderer: PaymentDetails, flex: 1 },
        {
            field: 'orderStatus', 'width': 130, 'suppressSizeToFit': true, cellStyle: (params) => {
                console.log("orderStatus", params);
                switch (params.value) {
                    case 'PLACED':
                        return { color: 'orange', fontWeight: 'bold', margin: '0px' };
                    case 'SHIPPED':
                        return { color: '#11d1d1', fontWeight: 'bold', margin: '0px' };
                    case 'DELIVERED':
                        return { color: '#8dff12', fontWeight: 'bold', margin: '0px' };
                    default:
                        return { color: 'red', fontWeight: 'bold', margin: '0px' }
                }
            },
            cellRenderer: (params) => {
                return <div>
                    <h4 style={{ margin: '0px' }}>{params.value}</h4>
                    {/* <h4 style={{ margin: '0px' }}>{"Update Status"}</h4> */}
                    <button style={{ marginBlock: '10px', background: 'transparent', border: 'none', padding: 0 }}>Update Status</button>

                    <select title='Status' onChange={(e) => { handleOrderAction(e, params.data.id) }}  >
                        <option value={'NONE'}>Select</option>
                        <option value={'PLACED'}>Placed</option>
                        <option value={'SHIPPED'}>Shipped</option>
                        <option value={'DELIVERED'}>Delivered</option>
                        <option value={'CANCELED'}>Canceled</option>
                        <option value={'PENDING'}>Pending</option>
                    </select>
                </div>
            }
        },




    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        resizable: true,
        wrapText: true,
        autoHeight: true,
        // maxWidth: '200px'
    }));

    const isLoading = useSelector(getOrderLoading);
    const isError = useSelector(getOrderError);

    const handleOrderAction = (e, orderId) => {
        console.log(e.target.value, orderId);
        switch (e.target.value) {
            case "SHIPPED":
                dispatch(shippingOrdersHandler(orderId));
                break;
            case "DELIVERED":
                dispatch(deliveredOrdersHandler(orderId));
                break;
            case "CANCELED":
                dispatch(cancelOrdersHandler(orderId));
                break;

            default:
                console.log("no action");
        }

    }

    const fetchOrders = async () => {
        dispatch(getAllOrdersHandler());
    }

    useEffect(() => {
        fetchOrders();
    }, [])
    useInterval(() => {
        // setCount(count + 1);
        fetchOrders();
        setDate(new window.Date().toLocaleTimeString());

    }, 1000 * 60);

    function useInterval(callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        });

        useEffect(() => {
            function tick() {
                savedCallback.current();
            }

            let id = setInterval(tick, delay);
            return () => clearInterval(id);
        }, [delay]);
    }
    return (
        <Box sx={{
            "&::-webkit-scrollbar": {
                width: 20
            },
            "&::-webkit-scrollbar-track": {
                backgroundColor: "orange"
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: "red",
                borderRadius: 2
            }
        }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <h5 style={{ marginBlock: '0px', marginBottom: '15px', color: 'white' }}>{"Real Time Order Tracking"}</h5>
                <h5 style={{ marginBlock: '0px', marginBottom: '15px', color: 'white' }}>{"Last Updated"} {date}</h5>
            </Box>
            <Card elevation={2}>
                < div className="ag-theme-balham-dark" style={{ height: '76vh', width: '100%', color: 'orange !important', }}>
                    <AgGridReact
                        enableRangeSelection

                        ref={gridRef} // Ref for accessing Grid's API

                        rowData={orders} // Row Data for Rows
                        columnSize="sizeToFit"
                        columnDefs={columnDefs} // Column Defs for Columns
                        defaultColDef={defaultColDef} // Default Column Properties
                        suppressRowClickSelection
                        suppressCellFocus
                        suppressLoadingOverlay={isLoading}
                        pagination={true}
                        paginationPageSize={10}
                        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                        rowSelection='multiple' // Options - allows click selection of rows

                    />
                </div>
            </Card>
        </Box >
    )
}

export default Orders
