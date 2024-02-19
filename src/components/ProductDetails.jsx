import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`);
            setProduct(response.data);
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    // Define NextArrow and PrevArrow components
    const NextArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="slick-arrow right-arrow" onClick={onClick}>
                <i className="fas fa-chevron-right"></i>
            </div>
        );
    };

    const PrevArrow = (props) => {
        const { onClick } = props;
        return (
            <div className="slick-arrow left-arrow" onClick={onClick}>
                <i className="fas fa-chevron-left"></i>
            </div>
        );
    };

    // Slider settings
    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        style: { marginBottom: '20px' } // Adding margin below the slider
    };

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
            <h2 className={"text-2xl font-bold"} style={{ marginBottom: '10px' }}>Product Details</h2>
            <div style={{ marginBottom: '10px', border: '1px solid #ccc', borderRadius: '5px', padding: '10px' }}>
                <h3 className={"text-blue-800 text-xl font-bold"} style={{ marginBottom: '4px' }}>{product.title}</h3>
                <Slider {...sliderSettings}>
                    {product.images.map((image, index) => (
                        <div key={index}>
                            <img src={image} className={"h-96"} alt={product.title} style={{ width: '100%' }} />
                        </div>
                    ))}
                </Slider>
                <p><strong>Description:</strong> {product.description}</p>
                <p><strong>Price:</strong> {product.price}$</p>
                <p><strong>Brand:</strong> {product.brand}</p>
                <p><strong>Category:</strong> {product.category}</p>
                <p><strong>Discount Percentage:</strong> {product.discountPercentage}</p>
                <p><strong>Ratings:</strong> {product.rating}</p>
                {/* You can display more product details here */}
            </div>
        </div>
    );
};

export default ProductDetails;



