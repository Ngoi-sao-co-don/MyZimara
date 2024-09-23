import React, { useEffect, useState } from 'react';
import '../style/Pages/productlist.css';
import Header from '../components/Header';
import axios from 'axios';
import Sidebar from '../components/sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchAllProducts = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await axios.get('http://localhost:3000/Shops');
                const data = response.data;
                console.log('Dữ liệu đã lấy:', data);

                if (!Array.isArray(data)) {
                    throw new Error('Định dạng dữ liệu không hợp lệ: Dữ liệu không phải là mảng');
                }

                const allProducts = data.flatMap((shop) => shop.Product || []);

                if (allProducts.length === 0) {
                    throw new Error('Không có sản phẩm nào để hiển thị');
                }

                setProducts(allProducts);
            } catch (error) {
                setError(error.message || 'Lỗi khi lấy dữ liệu sản phẩm.');
            } finally {
                setLoading(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('http://localhost:3000/categories');
                setCategories(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy danh mục:', error);
            }
        };

        fetchAllProducts();
        fetchCategories();
    }, []);

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;

    if (products.length === 0) return <p>Không có sản phẩm để hiển thị</p>;

    return (
        <>
            <Header />
            <div className="product-list">
                <div className="container">
                    <div className="row product-grid">
                        <div className="col-3">
                            <Sidebar categories={categories} />
                        </div>
                        <div className="col-9">
                            <div className="row">
                                {products.map((product) => (
                                    <div className="col-3" key={product['id-item']}>
                                        <div className="wsk-cp-product">
                                            <div className="wsk-cp-img">
                                                <a href={`/product/${product['id-item']}`}>
                                                    <img
                                                        src={product['image-products'][0]}
                                                        alt={product.titleproducts}
                                                    />
                                                </a>
                                            </div>
                                            <div className="wsk-cp-text">
                                                <div className="category">
                                                    <span>Category</span>
                                                </div>
                                                <div className="title-product">
                                                    <h3>{product.titleproducts}</h3>
                                                </div>

                                                <div className="description-prod">
                                                    <p>{product.describe}</p>
                                                </div>
                                                <div className="card-footer">
                                                    <div className="wcf-left">
                                                        <span className="price">
                                                            {product.colors[0] && (
                                                                <div>
                                                                    <p>
                                                                        Giá Tiền:{' '}
                                                                        {
                                                                            Object.values(product.colors[0])[0].price
                                                                                .discounted
                                                                        }
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </span>
                                                    </div>
                                                    <div className="wcf-right">
                                                        <a href="#" className="buy-btn">
                                                            <a href="#">
                                                                <FontAwesomeIcon icon={faCartShopping} />
                                                            </a>
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductList;
