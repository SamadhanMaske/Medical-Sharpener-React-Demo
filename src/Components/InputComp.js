import React, { useEffect } from 'react'
import { useState } from 'react'
import { FunctionContext, ProductsContext } from './Context';
import OutputComp from './OutputComp';

// getting the values of local storage
const getDatafromLS = () => {
    const data = localStorage.getItem('medicineList');
    if (data) {
        return JSON.parse(data);
    }
    else {
        return []
    }
}

function InputComp() {
    const [medicine, setMedicine] = useState({ name: '', description: '', price: '' });
    const [medicines, setMedicines] = useState(getDatafromLS());

    const handleChange = (event) => {
        setMedicine({ ...medicine, [event.target.name]: event.target.value })
    }

    const addMedicine = (event) => {
        event.preventDefault();
        if (medicine.name === '' || medicine.description === '' || medicine.price === '') {
            alert("Please enter all details");
            return;
        } else {
            const newMedicine = { id: new Date().getTime().toString(), ...medicine };
            setMedicines([...medicines, newMedicine]);
            setMedicine({ name: '', description: '', price: '' });
        }
        
    }

    const deleteMedicine = (id) => {
        const updatedOrders = medicines.filter(o => o.id !== id);
        setMedicines(updatedOrders);
    }

    useEffect(() => {
        localStorage.setItem("medicineList", JSON.stringify(medicines));
    }, [medicines])

    return (
        <div>
            <div>
                <label>Medicine name :  </label><input type="text" name="name" value={medicine.name} onChange={handleChange} />
                <label>Description :  </label><input type="text" name="description" value={medicine.description} onChange={handleChange} />
                <label>Price :  </label><input type="text" name="price" value={medicine.price} onChange={handleChange} />
                <button onClick={addMedicine} type='submit'>Add</button>
            </div>
            
            <ProductsContext.Provider value={medicines} >
                <FunctionContext.Provider value={deleteMedicine}>
                    <h1>Medicines List</h1>
                    {medicines.length < 1 && <h4>You have no medicine</h4>}
                    {medicines.length > 0 && <OutputComp/>}
                </FunctionContext.Provider>
            </ProductsContext.Provider>
        </div>
    )
}

export default InputComp