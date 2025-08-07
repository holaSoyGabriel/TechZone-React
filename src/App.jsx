/** @format */

import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/NavBar/NavBar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import Cart from "./components/Cart/Cart";
import CheckoutForm from "./components/Checkout/CheckoutForm";

const Layout = () => {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");

    const showSearchBar =
        location.pathname === "/products" ||
        location.pathname.startsWith("/products/");

    return (
        <>
            <Navbar
                showSearchBar={showSearchBar}
                onSearch={showSearchBar ? setSearchQuery : undefined}
            />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/products"
                    element={<Products setSearchQuery={searchQuery} />}
                />
                <Route
                    path="/products/:categoryId"
                    element={<Products setSearchQuery={searchQuery} />}
                />
                <Route path="/product/:id" element={<ItemDetailContainer />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<CheckoutForm />} />
                <Route
                    path="*"
                    element={
                        <h2 style={{ textAlign: "center", marginTop: "2rem" }}>
                            404 - Page Not Found
                        </h2>
                    }
                />
            </Routes>
        </>
    );
};

const App = () => {
    return (
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    );
};

export default App;
