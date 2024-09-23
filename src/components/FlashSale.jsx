import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import '../style/components/FlashSale.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Time from './Time';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons';

const FlashSale = () => {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchShops = async () => {
            try {
                const response = await axios.get('http://localhost:3000/Shops');
                setShops(response.data);
                setLoading(false);
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchShops();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="container mt-5 Flash-sale">
            <div className="title-deal">
                <div className="row ps-3 title-deal-container">
                    <div className="col text-FlashSale">
                        <h4>Flash Sale</h4>
                    </div>
                    <div className="col text-FlashSale">
                        <Time initialTime={12000} />{' '}
                    </div>
                </div>
            </div>
            <Slider {...settings}>
                {shops.flatMap((shop) =>
                    shop.Product.filter((product) => product.badge === 'Sale').map((product) => (
                        <div key={product['id-item']} className="px-3 product-card">
                            <div className="badge">
                                {product.badge && <span className="product-badge">{product.badge}</span>}
                            </div>
                            <div className="product-tumb">
                                <a href={`/product/${product['id-item']}`}>
                                    <img src={product['image-products'][0]} alt={product.titleproducts} />
                                </a>
                            </div>
                            <div className="product-details">
                                <div className="product-catagory">{product.category}</div>
                                <a href={`/product/${product['id-item']}`}>
                                    <h4>{product.titleproducts}</h4>
                                </a>
                                <p>{product.describe}</p>
                            </div>
                            <div className="product-bottom-details">
                                <div className="row product-bottom-details-content">
                                    <div className="col product-price">
                                        {product.colors?.[0] && (
                                            <span className="price">
                                                {Object.values(product.colors[0])[0].price.discounted}
                                            </span>
                                        )}
                                    </div>
                                    <div className="col product-links">
                                        <div className="">
                                            <a href="#">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </div>
                                        <div className="">
                                            <a href="#">
                                                <FontAwesomeIcon icon={faCartShopping} />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )),
                )}
            </Slider>
        </div>
    );
};

export default FlashSale;
