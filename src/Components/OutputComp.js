import React, { useContext } from 'react'
import classes from './OutputComp.module.css'
import { FunctionContext, ProductsContext } from './Context';

function OutputComp() {

    const medicines = useContext(ProductsContext);
    const addToCart = useContext(FunctionContext);

    return (
        <div>
            <h2>Available Medicines</h2>
            <div className={classes.output}>
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th className={classes.th}>Medicine</th>
                            <th className={classes.th}>Description</th>
                            <th className={classes.th}>Price</th>
                            <th className={classes.th}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            medicines.map((i) => {
                                return (
                                    <tr>
                                        <td className={classes.th}>{i.name}</td>
                                        <td className={classes.th}>{i.description}</td>
                                        <td className={classes.th}>{i.price}</td>
                                        <td className={classes.th}><button onClick={() => addToCart(i.id)}>Add To Cart</button></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default OutputComp