import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './Home.css';
import './UserReservations.css';
import './PopularDishes.css';  // New CSS file for modal styling

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button 
          className="modal-close-btn"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const PopularDishes = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const restaurantId = sessionStorage.getItem("ownerId");
  const navigate = useNavigate();

  const [newDish, setNewDish] = useState({
    name: "",
    description: "",
    price: "",
    tags: "",
  });

  useEffect(() => {
    if (!restaurantId) {
      setError("Restoran ID eksik!");
      return;
    }

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/${restaurantId}/menu-items`);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Popüler yemekler alınırken hata oluştu:", error);
        setError("Popüler yemekler yüklenemedi");
      }
    };

    fetchMenuItems();
  }, [restaurantId]);

  const handleDelete = async (dishId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/restaurants/menu-items/${dishId}`);
      setMenuItems(menuItems.filter((item) => item.id !== dishId));
    } catch (error) {
      console.error("Yemek silinirken hata oluştu:", error);
      setError("Yemek silinemedi.");
    }
  };

  const handleAddDish = async (e) => {
    e.preventDefault();
    const { name, description, price, tags } = newDish;

    if (!name || !description || !price) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/restaurants/${restaurantId}/menu-items`,
        {
          name,
          description,
          price: parseFloat(price),
          tags: tags ? tags.split(",").map((tag) => tag.trim()) : [], 
        }
      );

      setMenuItems([...menuItems, response.data]);
      setNewDish({ name: "", description: "", price: "", tags: "" });
      setError(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Yeni yemek eklenirken hata oluştu:", error);
      setError("Yeni yemek eklenemedi.");
    }
  };

  // Navigation handlers
  const handleProfileRedirect = () => navigate('/ownerProfile');
  const handleReservationsRedirect = () => navigate('/owner-reservations');
  const handlePasswordChange = () => navigate('/owner-change-password');

  return (
    <div className="page-container">
      <div className="header">
        <div className="header-content">
        </div>
      </div>

      <div style={{ display: 'flex' }}>
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-menu">
            <button className="sidebar-item" onClick={handleProfileRedirect}>
              Restoran Profil
            </button>
            <button className="sidebar-item" onClick={handleReservationsRedirect}>
              Rezervasyonlar
            </button>
            <button className="sidebar-item sidebar-item-active">
              Popüler Yemekler
            </button>
            <button className="sidebar-item" onClick={handlePasswordChange}>
              Şifre Değiştir
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          <div className="popular-dishes">
            <h1>Popüler Yemekler</h1>
            
            {/* Add Dish Button */}
            <button 
              className="add-dish-btn"
              onClick={() => setIsModalOpen(true)}
            >
              Yemek Ekle
            </button>

            {/* Modal for Adding Dish */}
            <Modal 
              isOpen={isModalOpen} 
              onClose={() => {
                setIsModalOpen(false);
                setError(null);
              }}
            >
              <form onSubmit={handleAddDish} className="login-form modal-form">
                <h2>Yeni Yemek Ekle</h2>
                
                {error && <p className="error-message">{error}</p>}
                
                <div className="input-group">
                  <label>Yemek Adı</label>
                  <input
                    type="text"
                    value={newDish.name}
                    onChange={(e) => setNewDish({ ...newDish, name: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Açıklama</label>
                  <input
                    type="text"
                    value={newDish.description}
                    onChange={(e) => setNewDish({ ...newDish, description: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Fiyat (₺)</label>
                  <input
                    type="number"
                    value={newDish.price}
                    onChange={(e) => setNewDish({ ...newDish, price: e.target.value })}
                    required
                  />
                </div>

                <div className="input-group">
                  <label>Etiketler (virgülle ayırın)</label>
                  <input
                    type="text"
                    value={newDish.tags}
                    onChange={(e) => setNewDish({ ...newDish, tags: e.target.value })}
                  />
                </div>

                <button type="submit">Yemek Ekle</button>
              </form>
            </Modal>

            {/* Menu Items List */}
            <div className="menu-items-section">
              <h2>Mevcut Yemekler</h2>
              {menuItems.length > 0 ? (
                <ul>
                  {menuItems.map((item) => (
                    <li key={item.id}>
                      <div>
                        <h3>{item.name}</h3>
                        <p><strong>Açıklama:</strong> {item.description}</p>
                        <p><strong>Fiyat:</strong> {item.price} ₺</p>
                        <p><strong>Etiketler:</strong> {item.tags?.join(", ") || "Yok"}</p>
                      </div>
                      <button onClick={() => handleDelete(item.id)}>Sil</button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Yemekler bulunmamaktadır.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularDishes;