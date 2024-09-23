import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ThumbnailSlider from '@/components/Thumnail';
import Header from '@/components/Header';
import '../style/Pages/ProductDetail.css';
import StarRating from '@/components/StartRatting';

const ProductDetail = () => {
    const { productId } = useParams(); // Get productId from URL
    const [product, setProduct] = useState(null);
    const [shop, setShop] = useState(null);
    const [error, setError] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [value, setValue] = useState(1); // Initialize value

    const handleChange = (e) => {
        const newValue = parseInt(e.target.value);
        if (newValue >= 1 && newValue <= (selectedColorData ? selectedColorData.Quality : 0)) {
            setValue(newValue);
        }
    };

    const handleIncrement = () => {
        if (value < (selectedColorData ? selectedColorData.Quality : 0)) {
            setValue(value + 1);
        }
    };

    const handleDecrement = () => {
        if (value > 1) {
            setValue(value - 1);
        }
    };

    useEffect(() => {
        if (!productId) {
            setError('Invalid product ID');
            return;
        }

        console.log('Fetching data for productId:', productId);
        fetch(`http://localhost:3000/Shops`)
            .then((response) => response.json())
            .then((data) => {
                const shop = data.find((shop) => shop.Product.find((prod) => prod['id-item'] === parseInt(productId)));
                if (shop) {
                    const foundProduct = shop.Product.find((prod) => prod['id-item'] === parseInt(productId));
                    setProduct(foundProduct);
                    setShop(shop);
                    if (foundProduct.colors && foundProduct.colors[0]) {
                        setSelectedColor(Object.keys(foundProduct.colors[0])[0]);
                    }
                } else {
                    setError('Product not found');
                }
            })
            .catch((error) => setError('Error fetching data: ' + error.message));
    }, [productId]);

    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const handleAddToCart = () => {
        if (selectedColor && value) {
            console.log(`Added to cart: ${selectedColor}, Quantity: ${value}`);
            // Implement add to cart logic here
        } else {
            console.log('Please select a color and quantity.');
        }
    };

    const handleBuyNow = () => {
        if (selectedColor && value) {
            console.log(`Buying now: ${selectedColor}, Quantity: ${value}`);
            // Implement buy now logic here
        } else {
            console.log('Please select a color and quantity.');
        }
    };

    if (error) {
        return <div>{error}</div>;
    }

    if (!product || !shop) {
        return <div>Loading...</div>;
    }

    const selectedColorData = product.colors && product.colors[0] ? product.colors[0][selectedColor] : null;

    return (
        <>
            <Header />
            <div className="pt-3 Product-Detail">
                <div className="container p-0">
                    <div className="pt-3 Product-Container">
                        <div className="row">
                            <div className="col-5 Thumnail">
                                <ThumbnailSlider images={product['image-products']} />
                            </div>
                            <div className="col-7">
                                <div className="name-product">
                                    <h1>{product['titleproducts']}</h1>
                                </div>
                                <div className="row Evaluate-shop">
                                    <div className="col">
                                        <StarRating rating={shop.rating} />
                                    </div>
                                    <div className="col evaluate">
                                        <p>{shop.evaluate} Đánh Giá</p>
                                    </div>
                                    <div className="col sold">
                                        <p>{shop.sold} Đã Bán</p>
                                    </div>
                                </div>
                                <div>
                                    {selectedColorData && (
                                        <div className="row Price-Product">
                                            <div className="col-4 original">
                                                <p>{selectedColorData.price.original} VNĐ</p>
                                            </div>
                                            <div className="col discounted">
                                                <p>{selectedColorData.price.discounted} VNĐ</p>
                                            </div>
                                        </div>
                                    )}
                                    <div className="row Deals">
                                        {shop.Deals.map((deal, index) => (
                                            <div key={index} className="col m-1 deal-item">
                                                {deal}
                                            </div>
                                        ))}
                                    </div>
                                    Màu Sắc
                                    <div className="row gx-3 color-product">
                                        {product.colors &&
                                            product.colors[0] &&
                                            Object.entries(product.colors[0]).map(([color, { price }]) => (
                                                <button
                                                    className={`col-3 m-2 color-choice ${color === selectedColor ? 'selected' : ''}`}
                                                    key={color}
                                                    onClick={() => handleColorClick(color)}
                                                >
                                                    <h3>{color}</h3>
                                                </button>
                                            ))}
                                    </div>
                                    <div className="number-input">
                                        Số Lượng
                                        <div className="p-3 row">
                                            <div className="col input-number-product">
                                                <button className="btn decrement" onClick={handleDecrement}>
                                                    -
                                                </button>
                                                <input
                                                    type="number"
                                                    value={value}
                                                    onChange={handleChange}
                                                    className="input"
                                                    min="1"
                                                />
                                                <button className="btn increment" onClick={handleIncrement}>
                                                    +
                                                </button>
                                            </div>
                                            <div className="col number-quality">
                                                {selectedColorData && (
                                                    <p>{selectedColorData.Quality} Sản phẩm có sẵn</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-3 add-buy">
                                        <div className="row">
                                            <div className="col m-1 add">
                                                <button onClick={handleAddToCart}>Thêm Vào Giỏ Hàng</button>
                                            </div>
                                            <div className="col m-1 buy">
                                                <button onClick={handleBuyNow}>Mua Ngay</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 Infor-Shop-Container">
                        <div className="row py-4">
                            <div className="col-3">
                                <div className="row ISC-left">
                                    <div className="col-4 p-0 Logo">
                                        <a href="">
                                            <img
                                                src="https://down-vn.img.susercontent.com/file/62160f74aa5cffa160b2062658d2be75@resize_w80_nl.webp"
                                                alt=""
                                            />
                                        </a>
                                    </div>
                                    <div className="col p-0 name-shops">
                                        <div className="row">
                                            <div className="col-12 shop-name">{shop.name}</div>
                                            <div className="col12">Online 3 Giờ Trước</div>
                                            <div className="col-6 massage-shop">
                                                <button type="button" class="btn">
                                                    Nhắn Tin
                                                </button>
                                            </div>
                                            <div className="col-6 go-shop">
                                                <button type="button" class="btn">
                                                    Xem
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="ISC-right">
                                    <div className="row">
                                        <div className="col-4 rating-shop">
                                            <p>
                                                <span className="pe-2">Đánh giá:</span>
                                                <span>
                                                    <StarRating rating={shop.rating} />
                                                </span>
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            <p>
                                                Đã Đánh Giá:<span>{shop.evaluate}</span>
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            Đã Bán Được:<span> {shop.sold}</span>
                                        </div>
                                        <div className="col-4">
                                            <p>
                                                <span className="pe-2">Số lượng sản phẩm:</span>
                                                <span>{shop.Product.length}</span>{' '}
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            <p>
                                                <span className="pe-2">Người theo dõi:</span>
                                                <span>{shop.follower}</span>
                                            </p>
                                        </div>
                                        <div className="col-4">
                                            <p>
                                                <span className="pe-2">Tham gia từ:</span>
                                                <span>{shop.join}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
