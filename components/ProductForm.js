import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm ({
    _id,
    title:existingTitle, 
    description:existingDescription, 
    price:existingPrice
}){    
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    console.log({_id});

    async function saveProduct(e){
        e.preventDefault();
        const data = {title, description, price};
        if(_id){
            // update
            await axios.put("/api/products", {...data, _id});
        } else {
            // create
            await axios.post("/api/products", data);
        }
        setGoToProducts(true);        
    }

    if(goToProducts){
        router.push("/products")
    }

    return (
        <div>
            <form onSubmit = {saveProduct}>

                <label>Product name</label>
                <input 
                    type="text" 
                    placeholder="Product name" 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}/>

                <label>Description</label>
                <textarea 
                    value={description} 
                    placeholder="Description" 
                    onChange={e => setDescription(e.target.value)}></textarea>

                <label>Price</label>
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={price} 
                    onChange={e => setPrice(e.target.value)}/>

                <button type="submit" className="btn-primary">Save</button>
            </form>
        </div>
    )
}