

import React from 'react';
import { MutatingDots } from 'react-loader-spinner'
import '../App.css';
function Spiner({ loading }) {
    if (loading) {
        return (
            <div className='spiner'>

                <MutatingDots
                    height="100"
                    width="100"
                    color="#ff9900"
                    secondaryColor='#ff9900'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                />
            </div>)
    }
    return (<div />)
}
export default Spiner;