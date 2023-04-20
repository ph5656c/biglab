import React, { useState, useEffect } from 'react';

import axios from 'axios';

const Piedata = () => {

    const [piedata, setPiedata] = useState([]);



    useEffect(() => {
        axios.get('http://127.0.0.1:3702/order/productpie')
            .then(response => {
                setPiedata(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return piedata;
}
export default Piedata;