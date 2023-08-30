import React from 'react'

const Payments = () => {
    return (
        <div>
            <iframe
                src='https://dashboard.razorpay.com/app/dashboard'
                allowFullScreen
                className='ifram'
                title='razorpay'
                width={'100%'}
            // height={''}

            >

            </iframe>
        </div>
    )
}

export default Payments
