import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import '../style/Pages/admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faUser, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import LineChartAdmin from '../components/Chart/Chartlineadmin';
import RevenueBarChart from '../components/Chart/RevenueBarChart';
import TotalRevenueChart from '../components/Chart/totalRevenueChart';

const AdminPage = () => {
    const [shops, setShops] = useState([]);
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [activeSidebar, setActiveSidebar] = useState('overview');
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalSoldProducts, setTotalSoldProducts] = useState(0);
    const [monthlyRevenue, setMonthlyRevenue] = useState({
        lastMonth: 0,
        twoMonthsAgo: 0,
        threeMonthsAgo: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [shopsResponse, usersResponse, categoriesResponse] = await Promise.all([
                    fetch('http://localhost:3000/Shops'),
                    fetch('http://localhost:3000/Users'),
                    fetch('http://localhost:3000/categories'),
                ]);

                const shopsData = await shopsResponse.json();
                const usersData = await usersResponse.json();
                const categoriesData = await categoriesResponse.json();

                setShops(shopsData);
                setUsers(usersData);
                setCategories(categoriesData);

                const revenue = calculateTotalRevenue(shopsData);
                setTotalRevenue(revenue);
                const productCount = calculateTotalProducts(shopsData);
                setTotalProducts(productCount);
                const soldProductCount = calculateTotalSoldProducts(shopsData);
                setTotalSoldProducts(soldProductCount);
                setTotalUsers(usersData.length);
                setMonthlyRevenue(calculateMonthlyRevenue(shopsData));
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const calculateTotalRevenue = (shopsData) => {
        return shopsData.reduce((acc, shop) => acc + calculateShopRevenue(shop), 0);
    };

    const calculateTotalProducts = (shopsData) => {
        return shopsData.reduce((count, shop) => count + (shop.Product ? shop.Product.length : 0), 0);
    };

    const calculateTotalSoldProducts = (shopsData) => {
        return shopsData.reduce((totalSold, shop) => {
            return (
                totalSold +
                shop.Product.reduce((shopSoldAcc, product) => {
                    return (
                        shopSoldAcc +
                        product.colors.reduce((colorAcc, colorDetails) => {
                            return (
                                colorAcc +
                                Object.values(colorDetails).reduce((detailsAcc, details) => {
                                    return detailsAcc + parseInt(details.sold.replace(/\./g, ''), 10);
                                }, 0)
                            );
                        }, 0)
                    );
                }, 0)
            );
        }, 0);
    };
    const calculateShopTotalRevenue = (shop) => {
        return shop.Product.reduce((total, product) => {
            return (
                total +
                product.colors.reduce((colorTotal, colorDetails) => {
                    return (
                        colorTotal +
                        Object.entries(colorDetails).reduce((colorAcc, [color, details]) => {
                            const discountedPrice = parseFloat(details.price.discounted.replace(/[\.,]/g, ''));
                            const sold = parseInt(details.sold.replace(/\./g, ''), 10);
                            const returns = parseInt(details.return.replace(/\./g, ''), 10);
                            return colorAcc + discountedPrice * (sold - returns);
                        }, 0)
                    );
                }, 0)
            );
        }, 0);
    };

    const calculateShopRevenue = (shop) => {
        return shop.Product.reduce((shopAcc, product) => {
            return (
                shopAcc +
                product.colors.reduce((productAcc, colorDetails) => {
                    return (
                        productAcc +
                        Object.entries(colorDetails).reduce((colorAcc, [color, details]) => {
                            const discountedPrice = parseFloat(details.price.discounted.replace(/[\.,]/g, ''));
                            const sold = parseInt(details.sold.replace(/\./g, ''), 10);
                            const returns = parseInt(details.return.replace(/\./g, ''), 10);
                            return colorAcc + discountedPrice * (sold - returns);
                        }, 0)
                    );
                }, 0)
            );
        }, 0);
    };

    const calculateMonthlyRevenue = (shopsData) => {
        return shopsData.reduce(
            (acc, shop) => {
                acc.lastMonth += parseFloat(shop.revenue[0]["lastmonth'srevenue"].replace(/\./g, '')) || 0;
                acc.twoMonthsAgo += parseFloat(shop.revenue[0].revenue2monthsago.replace(/\./g, '')) || 0;
                acc.threeMonthsAgo += parseFloat(shop.revenue[0].revenue3monthsago.replace(/\./g, '')) || 0;
                return acc;
            },
            { lastMonth: 0, twoMonthsAgo: 0, threeMonthsAgo: 0 },
        );
    };

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebar" className="col-md-3 col-lg-2 d-md-block bg-light sidebar">
                        <div className="position-sticky">
                            <ul className="nav flex-column">
                                {['overview', 'Shops', 'users', 'categories'].map((item) => (
                                    <li className="nav-item" key={item}>
                                        <button
                                            className={`nav-link ${activeSidebar === item ? 'active' : ''}`}
                                            onClick={() => setActiveSidebar(item)}
                                            aria-current={activeSidebar === item ? 'page' : undefined}
                                        >
                                            {item === 'overview' && 'Tổng quan'}
                                            {item === 'Shops' && 'Cửa Hàng'}
                                            {item === 'users' && 'Người Dùng'}
                                            {item === 'categories' && 'Danh Mục'}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </nav>
                    <main className="col-md-9 ms-sm-auto col-lg-10">
                        {activeSidebar === 'overview' && (
                            <div className="page-title">
                                <div className="row">
                                    <div className="col m-2 cardadmin">
                                        <div className="icon-container">
                                            <FontAwesomeIcon icon={faBox} className="icon" />
                                        </div>
                                        <div className="info">
                                            <div className="count">{totalProducts}</div>
                                            <div className="description">
                                                <p>Sản Phẩm Có Mặt Trên Cửa Hàng</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col m-2 cardadmin">
                                        <div className="icon-container">
                                            <FontAwesomeIcon icon={faUser} className="icon" />
                                        </div>
                                        <div className="info">
                                            <div className="count">{totalUsers}</div>
                                            <div className="description">
                                                <p>Số Lượng Người Dùng</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-5 m-2 cardadmin">
                                        <div className="icon-container">
                                            <FontAwesomeIcon icon={faDollarSign} className="icon" />
                                        </div>
                                        <div className="info">
                                            <div className="count">
                                                {totalRevenue.toLocaleString()} VNĐ /{' '}
                                                {totalSoldProducts.toLocaleString()} Sản Phẩm
                                            </div>
                                            <div className="description">
                                                <p>Tổng Doanh Thu / Sản Phẩm Đã Bán</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <LineChartAdmin products={shops.flatMap((shop) => shop.Product)} />

                                <div className="row">
                                    <div className="col">
                                        <RevenueBarChart
                                            lastMonth={monthlyRevenue.lastMonth}
                                            twoMonthsAgo={monthlyRevenue.twoMonthsAgo}
                                            threeMonthsAgo={monthlyRevenue.threeMonthsAgo}
                                        />
                                    </div>
                                    <div className="col">
                                        <TotalRevenueChart totalRevenue={totalRevenue} />
                                    </div>
                                </div>
                                <div className="total-revenue">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Thời Gian</th>
                                                <th>Doanh Thu (VNĐ)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Tháng Trước</td>
                                                <td>{monthlyRevenue.lastMonth.toLocaleString()} VNĐ</td>
                                            </tr>
                                            <tr>
                                                <td>Hai Tháng Trước</td>
                                                <td>{monthlyRevenue.twoMonthsAgo.toLocaleString()} VNĐ</td>
                                            </tr>
                                            <tr>
                                                <td>Ba Tháng Trước</td>
                                                <td>{monthlyRevenue.threeMonthsAgo.toLocaleString()} VNĐ</td>
                                            </tr>
                                            <tr>
                                                <td>Doanh Thu Tháng Này</td>
                                                <td>{totalRevenue.toLocaleString()} VNĐ</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                        {activeSidebar === 'Shops' && (
                            <div className="page-title">
                                <h2>Danh Sách Cửa Hàng</h2>
                                <table className="shop-table">
                                    <thead>
                                        <tr>
                                            <th>ID Cửa Hàng</th>
                                            <th>Tên Cửa Hàng</th>
                                            <th>Số Lượng Sản Phẩm</th>
                                            <th>Tổng Doanh Thu Tháng Này (VNĐ)</th>
                                            <th>Doanh Thu Tháng Trước (VNĐ)</th>
                                            <th>Doanh Thu Hai Tháng Trước (VNĐ)</th>
                                            <th>Doanh Thu Ba Tháng Trước (VNĐ)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {shops.map((shop) => (
                                            <tr key={shop.idshop}>
                                                <td>{shop.idshop}</td>
                                                <td>
                                                    <Link to={`/mastershop/${shop.idshop}`} className="shop-link">
                                                        {shop.name}
                                                    </Link>
                                                </td>
                                                <td>{shop.Product ? shop.Product.length : 0}</td>
                                                <td>{calculateShopTotalRevenue(shop).toLocaleString()} VNĐ</td>
                                                <td>
                                                    {parseFloat(
                                                        shop.revenue[0]["lastmonth'srevenue"].replace(/\./g, ''),
                                                    ).toLocaleString()}{' '}
                                                    VNĐ
                                                </td>
                                                <td>
                                                    {parseFloat(
                                                        shop.revenue[0].revenue2monthsago.replace(/\./g, ''),
                                                    ).toLocaleString()}{' '}
                                                    VNĐ
                                                </td>
                                                <td>
                                                    {parseFloat(
                                                        shop.revenue[0].revenue3monthsago.replace(/\./g, ''),
                                                    ).toLocaleString()}{' '}
                                                    VNĐ
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeSidebar === 'users' && (
                            <div className="page-title">
                                <table className="user-table">
                                    <thead>
                                        <tr>
                                            <th>Hình Ảnh</th>
                                            <th>Tên Người Dùng</th>
                                            <th>Email</th>
                                            <th>Điện Thoại</th>
                                            <th>Địa Chỉ</th>
                                            <th>Truy Cập</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.userid}>
                                                <td>
                                                    <img
                                                        src={user.imageuser}
                                                        alt={user.username}
                                                        className="user-image"
                                                    />
                                                </td>
                                                <td>{user.username}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phonenumber}</td>
                                                <td>
                                                    {user.address}, {user.ward}, {user.city}
                                                </td>
                                                <td>
                                                    <td>
                                                        <Link to={`/user/${user.userid}`} className="user-link">
                                                            Xem Chi Tiết
                                                        </Link>
                                                    </td>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {activeSidebar === 'categories' && (
                            <div className="page-title">
                                <table className="category-table">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Tên Danh Mục</th>
                                            <th>Danh Mục Con</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {categories.map((category) => (
                                            <tr key={category.id}>
                                                <td>{category.id}</td>
                                                <td>{category.name}</td>
                                                <td>
                                                    <div className="row">
                                                        {category.subcategories.map((subcategory) => (
                                                            <div className="col-2" key={subcategory.id}>
                                                                {subcategory.name}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
};

export default AdminPage;
