import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import { Client, Account } from "appwrite";


const client = new Client();


client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65d1937adfa127da1a15');

const account = new Account(client);

const ProductListing = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(5);
    const [sortBy, setSortBy] = useState('title');
    const [searchTerm, setSearchTerm] = useState('');
    const [legitProducts, setLegitProducts] = useState([]);

    useEffect(() => {
        const promise = account.get();
        promise.then(function (response) {
            console.log(response); // Success
        }, function (error) {
            navigate("/")
        });
    });

    useEffect(() => {
        fetchProducts().then(r =>
            console.log('Products fetched successfully')
        );
    }, []);

    useEffect(() => {
        console.log(products, sortBy);
        let sortedProducts = [...products]; // Create a copy of products array
        if (sortBy === 'title') {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'price') {
            sortedProducts.sort((a, b) => a.price - b.price);
        }
        setProducts(sortedProducts);
    }, [sortBy])

    // const logoutUser = () => {
    //     const promise = account.deleteSessions();
    //     promise.then(function (response) {
    //         console.log(response); // Session deleted
    //         navigate("/");
    //     }, function (error) {
    //         console.log("oops")
    //         console.log(error); // Failure
    //     });
    // }
    const fetchProducts = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/products`);
            setProducts(response.data.products);
            setLegitProducts(response.data.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleChange = event => {
        const { value } = event.target;
        setSearchTerm(value);
        setProducts(prevProducts => {
            return legitProducts.filter(product => {
                return product.title.toLowerCase().includes(value.toLowerCase());
            });
        });
    };

    // const clearSearch = () => {
    //     setSearchTerm('');
    //     setProducts(legitProducts);
    // };

    // Logic to paginate products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    // Change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div style={{fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto'}}>
            <div className={"flex justify-between"}>
                <h2 style={{color: '#000', marginBottom: '30px'}} className={"font-bold text-2xl"}>Product Listing</h2>
                <div>
                    <label htmlFor="sortBy">Sort By :</label>
                    <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="title">Title</option>
                        <option value="price">Price</option>
                    </select>
                </div>
            </div>
            <div>
                <input className={"p-1"} type="text" placeholder="Search by title ..." value={searchTerm} onChange={handleChange}
                       style={{marginBottom: '10px'}}/>

                {/*<button onClick={clearSearch} style={{*/}
                {/*    padding: '5px 10px',*/}
                {/*    borderRadius: '5px',*/}
                {/*    border: 'none',*/}
                {/*    background: '#000',*/}
                {/*    color: '#fff',*/}
                {/*    cursor: 'pointer'*/}
                {/*}}>*/}
                {/*    Clear Search*/}
                {/*</button>*/}

                {currentProducts.map(product => (
                    <Link key={product.id} to={`/product/${product.id}`}
                          style={{textDecoration: 'none', color: '#000'}}>
                        <div style={{
                            marginBottom: '20px',
                            border: '1px solid #ccc',
                            borderRadius: '5px',
                            padding: '10px',
                            cursor: 'pointer'
                        }}>
                            <h3 style={{marginBottom: '10px'}} className={"font-bold text-lg"}>{product.title}</h3>
                            <p>{product.description}</p>
                            <p className={"mt-1 text-blue-800"}>Price: {product.price}$</p>
                        </div>
                    </Link>
                ))}
            </div>
            <div className={"flex justify-between"}>
                <div style={{textAlign: 'center'}}>
                    {[...Array(Math.ceil(products.length / productsPerPage)).keys()].map(number => (
                        <button key={number + 1} style={{
                            margin: '0 5px',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            border: 'none',
                            background: currentPage === number + 1 ? '#6495ED' : '#000',
                            color: currentPage === number + 1 ? '#fff' : '#fff',
                            cursor: 'pointer'
                        }} onClick={() => paginate(number + 1)}>
                            {number + 1}
                        </button>
                    ))}
                </div>
                {/*<div className={""}>*/}
                {/*    <button onClick={logoutUser} className={"bg-red-600 text-white w-24 h-10 rounded-lg"}>*/}
                {/*        Logout*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>

        </div>
    );
};

export default ProductListing;

