import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart, faCartShopping, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import '../style//components/Header.css';

const Header = () => {
    return (
        <>
            <header>
                <div className="header-content-top">
                    <div className="content">
                        <span>
                            <FontAwesomeIcon icon={faPhone} /> 1900 6079
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faEnvelope} />
                            Zimara@email.com
                        </span>
                    </div>
                </div>

                <div className="header-content-mid-bottom">
                    <div className="container">
                        <div className="row container-header">
                            <div className="col-2">
                                <strong className="logo">
                                    <a href="/">
                                        <img src="/images/logo_3.png" alt="" />
                                    </a>
                                </strong>
                            </div>

                            <div className="col-7">
                                <label className="open-search" htmlFor="open-search">
                                    <i className="fas fa-search" />
                                    <input className="input-open-search" id="open-search" type="checkbox" name="menu" />
                                    <div className="search">
                                        <button className="button-search">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                        <input type="text" placeholder="Tìm Kiếm" className="input-search" />
                                    </div>
                                </label>
                            </div>
                            {/* // search */}
                            <div className="col-3">
                                <nav className="nav-content">
                                    {/* nav */}
                                    <ul className="nav-content-list">
                                        <li className="nav-content-item account-login">
                                            <label
                                                className="open-menu-login-account"
                                                htmlFor="open-menu-login-account"
                                            >
                                                <input
                                                    className="input-menu"
                                                    id="open-menu-login-account"
                                                    type="checkbox"
                                                    name="menu"
                                                />
                                                <i className="fas fa-user-circle" />
                                                <span className="login-text">
                                                    <strong>Catuss</strong>
                                                </span>{' '}
                                                <span className="item-arrow" />
                                                {/* submenu */}
                                                <ul className="login-list">
                                                    <li className="login-list-item">
                                                        <a href="">Thông Tin</a>
                                                    </li>
                                                    <li className="login-list-item">
                                                        <a href="/mastershop/11">Đăng Nhập Bán Hàng</a>
                                                    </li>
                                                    <li className="login-list-item">
                                                        <a href="">Đăng Xuất</a>
                                                    </li>
                                                </ul>
                                            </label>
                                        </li>
                                        <li className="nav-content-item">
                                            <a className="nav-content-link" href="">
                                                <FontAwesomeIcon icon={faHeart} />
                                            </a>
                                        </li>
                                        <li className="nav-content-item">
                                            <a className="nav-content-link" href="">
                                                <FontAwesomeIcon icon={faCartShopping} />
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                    {/* nav navigation commerce */}
                    <div className="nav-container">
                        <div className="container">
                            <nav className="all-category-nav">
                                <label className="open-menu-all" htmlFor="open-menu-all">
                                    <input
                                        className="input-menu-all"
                                        id="open-menu-all"
                                        type="checkbox"
                                        name="menu-open"
                                    />
                                    <span className="all-navigator">
                                        <i className="fas fa-bars" /> <span>Danh Mục Sản Phẩm</span>{' '}
                                        <i className="fas fa-angle-down" />
                                        <i className="fas fa-angle-up" />
                                    </span>
                                    <ul className="all-category-list">
                                        <li className="all-category-list-item">
                                            <a href="" className="all-category-list-link">
                                                Điện Thoại
                                                <i className="fas fa-angle-right" />
                                            </a>
                                            <div className="category-second-list">
                                                <ul className="category-second-list-ul">
                                                    <li className="category-second-item">
                                                        <a href="">Iphone 10</a>
                                                    </li>
                                                    <li className="category-second-item">
                                                        <a href="">Galaxy Note 10</a>
                                                    </li>
                                                    <li className="category-second-item">
                                                        <a href="">Motorola One </a>
                                                    </li>
                                                    <li className="category-second-item">
                                                        <a href="">Galaxy A80 </a>
                                                    </li>
                                                    <li className="category-second-item">
                                                        <a href="">Galaxy M </a>
                                                    </li>
                                                    <li className="category-second-item">
                                                        <a href="">Huaway P30 </a>
                                                    </li>
                                                </ul>
                                                <div className="img-product-menu">
                                                    <img src="https://i.ibb.co/Vvndkmy/banner.jpg" />
                                                </div>
                                            </div>
                                        </li>
                                        <li className="all-category-list-item">
                                            <a href="" className="all-category-list-link">
                                                Thời Trang <i className="fas fa-angle-right" />
                                            </a>
                                        </li>
                                        <li className="all-category-list-item">
                                            <a href="" className="all-category-list-link">
                                                Đồ Chơi
                                                <i className="fas fa-angle-right" />
                                            </a>
                                        </li>
                                        <li className="all-category-list-item">
                                            <a href="" className="all-category-list-link">
                                                Computing
                                                <i className="fas fa-angle-right" />
                                            </a>
                                        </li>
                                        <li className="all-category-list-item">
                                            <a href="" className="all-category-list-link">
                                                Games
                                                <i className="fas fa-angle-right" />
                                            </a>
                                        </li>
                                        <li className="all-category-list-item">
                                            <a href="" className="all-category-list-link">
                                                Automotive
                                                <i className="fas fa-angle-right" />
                                            </a>
                                        </li>
                                    </ul>
                                </label>
                            </nav>
                            <nav className="featured-category">
                                <ul className="nav-row">
                                    <li className="nav-row-list">
                                        <a href="" className="nav-row-list-link">
                                            Điện Tử
                                        </a>
                                    </li>
                                    <li className="nav-row-list">
                                        <a href="" className="nav-row-list-link">
                                            Thời Trang Nữ
                                        </a>
                                    </li>
                                    <li className="nav-row-list">
                                        <a href="" className="nav-row-list-link">
                                            Thời Trang Nam
                                        </a>
                                    </li>
                                    <li className="nav-row-list">
                                        <a href="" className="nav-row-list-link">
                                            Sắc Đẹp
                                        </a>
                                    </li>
                                    <li className="nav-row-list">
                                        <a href="" className="nav-row-list-link">
                                            Sức Khỏe
                                        </a>
                                    </li>
                                    <li className="nav-row-list">
                                        <a href="" className="nav-row-list-link">
                                            Đồng Hồ
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;
