import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const PopularDishes = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
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
    } catch (error) {
      console.error("Yeni yemek eklenirken hata oluştu:", error);
      setError("Yeni yemek eklenemedi.");
    }
  };

  return (
    <div className="popular-dishes">
      <h1>Popüler Yemekler</h1>
      {error && <p className="error-message">{error}</p>}

      <div>
        {menuItems.length > 0 ? (
          <ul>
            {menuItems.map((item) => (
              <li key={item.id}>
                <h3>{item.name}</h3>
                <p>
                  <strong>Açıklama:</strong> {item.description}
                </p>
                <p>
                  <strong>Fiyat:</strong> {item.price} ₺
                </p>
                <p>
                  <strong>Etiketler:</strong>{" "}
                  {item.tags?.join(", ") || "Yok"}
                </p>
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{ marginRight: "10px" }}
                >
                  Sil
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Yemekler bulunmamaktadır.</p>
        )}
      </div>

      <div style={{ marginTop: "30px" }}>
        <h2>Yeni Yemek Ekle</h2>
        <form onSubmit={handleAddDish}>
          <div>
            <label>Yemek Adı:</label>
            <input
              type="text"
              value={newDish.name}
              onChange={(e) =>
                setNewDish({ ...newDish, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label>Açıklama:</label>
            <input
              type="text"
              value={newDish.description}
              onChange={(e) =>
                setNewDish({ ...newDish, description: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label>Fiyat (₺):</label>
            <input
              type="number"
              value={newDish.price}
              onChange={(e) =>
                setNewDish({ ...newDish, price: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label>Etiketler (virgülle ayırın):</label>
            <input
              type="text"
              value={newDish.tags}
              onChange={(e) =>
                setNewDish({ ...newDish, tags: e.target.value })
              }
            />
          </div>

          <button type="submit" style={{ marginTop: "10px" }}>
            Ekle
          </button>
        </form>
      </div>

      <button
        onClick={() => navigate("/ownerProfile")}
        style={{ marginTop: "20px" }}
      >
        Profil
      </button>
    </div>
  );
};

export default PopularDishes;