import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReservationForm from '../components/ReservationForm.js';
import './Restaurant.css';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Restaurant = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isUpdatingFavorite, setIsUpdatingFavorite] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const commentsPerPage = 1;

  const userId = sessionStorage.getItem('userId');

  const handleReservation = async (reservationData) => {
    try {
      if (!userId) {
        navigate('/login', { state: { from: `/restaurant/${id}` } });
        return;
      }
  
      const restaurantId = Number(id);
	  const reservationStartTime = `${reservationData.date}T${reservationData.time}:00`;
	  const reservationEndTime = new Date(reservationStartTime);
      reservationEndTime.setHours(reservationEndTime.getHours() + 1);
  
      const ReservationsResponse = await axios.get(
        `${API_BASE_URL}/api/reservations/user/${userId}?date=${reservationData.date}`
      );
      const Reservations = ReservationsResponse.data;
		const sameRestaurantReservation = Reservations.find((res) => {
			const existingStartTime = new Date(res.reservationStartTime);
			const existingEndTime = new Date(res.reservationEndTime);
			return (
				res.restaurant.id === restaurantId &&
					existingStartTime < reservationEndTime &&
					existingEndTime > reservationStartTime
			);
		});
      if (sameRestaurantReservation) {
        alert('Aynı restoranda aynı gün için zaten bir rezervasyonunuz var.');
        return;
      }
		
      const otherRestaurantReservation = Reservations.find((res) => {
        const existingStartTime = new Date(res.reservationStartTime);
        const existingEndTime = new Date(res.reservationEndTime);
        return (
          res.restaurant.id !== restaurantId &&
          existingStartTime < reservationEndTime &&
          existingEndTime > reservationStartTime
        );
      });
      if (otherRestaurantReservation) {
        alert('Başka bir restoranda aynı gün için zaten bir rezervasyonunuz var.');
        return;
      }

      const reservationPayload = {
        restaurantId,
        userId: Number(userId),
        numberOfPeople: Number(reservationData.guests),
        reservationStartTime,
        allergy: reservationData.hasAllergies ? reservationData.allergens : null,
        tag: reservationData.selectedTag || null,
      };
 
      const response = await axios.post(`${API_BASE_URL}/api/reservations`, reservationPayload);
      if (response.status === 201) {
        alert('Rezervasyonunuz başarıyla oluşturuldu!');
      }
    } catch (error) {
      console.error('Rezervasyon oluşturulurken hata:', error.response ? error.response.data : error.message);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };
  

  const toggleFavorite = async () => {
    try {
      setIsUpdatingFavorite(true);

      const favoritePayload = {
        userId: Number(userId),
        restaurantId: Number(id),
      };

      if (isFavorite) {
        const response = await axios.delete(`${API_BASE_URL}/api/favorites/${userId}/${id}`);
        if (response.status === 200) {
          setIsFavorite(false);
          alert('Favorilerden kaldırıldı!');
        }
      } else {
        const response = await axios.post(`${API_BASE_URL}/api/favorites`, favoritePayload);
        if (response.status === 201) {
          setIsFavorite(true);
          alert('Favorilere eklendi!');
        }
      }
    } catch (error) {
      console.error('Favori durumu güncellenirken hata:', error.response ? error.response.data : error.message);
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsUpdatingFavorite(false);
    }
  };

  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/${id}`);
        const fetchedRestaurant = response.data;

        const availableSlots = getAvailableTimeSlots(fetchedRestaurant.operatingHours);

          setRestaurant(fetchedRestaurant);
		  console.log("fetched the restaurant\n");
		  console.log(fetchedRestaurant.logo);
		  console.log(fetchedRestaurant.logoPhoto);
		  console.log(fetchedRestaurant.photos);
        setAvailableTimeSlots(availableSlots);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Restoran verileri alınamadı.');
      } finally {
        setLoading(false);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/restaurants/${id}/menu-items`);
        setMenuItems(response.data);
      } catch (error) {
        console.error("Popüler yemekler alınırken hata oluştu:", error);
        setError("Popüler yemekler yüklenemedi");
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/comments/restaurant/${id}`);
        setComments(response.data);
      } catch (error) {
        console.error("Yorumlar yüklenirken hata oluştu:", error);
        setError('Yorumlar yüklenemedi');
      }
    };

    const fetchFavorites = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/favorites/${userId}`);
        const favoriteRestaurantIds = response.data.map((favorite) => favorite.restaurant.id);
        setIsFavorite(favoriteRestaurantIds.includes(Number(id)));
      } catch (error) {
        console.error('Favoriler alınamadı:', error.response ? error.response.data.message : error.message);
      }
    };

    const checkLoginStatus = () => {
      setIsLoggedIn(!!userId);
    };

    checkLoginStatus();
    fetchMenuItems();
    fetchRestaurantData();
    fetchComments();
    if (userId) {
      fetchFavorites();
    }
  }, [id, userId]);

  const getAvailableTimeSlots = (operatingHours) => {
    const slots = [];
    if (operatingHours) {
      const [startTime, endTime] = operatingHours.split('-');
      let currentTime = parseInt(startTime.split(':')[0], 10);
      const endHour = parseInt(endTime.split(':')[0], 10);

      while (currentTime < endHour) {
        const startHour = `${currentTime < 10 ? '0' : ''}${currentTime}:00`;
        slots.push(startHour);
        currentTime += 1;
      }
    }
    return slots;
  };

  // Pagination Logic
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getMenuItemColor = (index) => {
    const colors = [
      'bg-blue-50',
      'bg-green-50',
      'bg-yellow-50',
      'bg-pink-50',
      'bg-purple-50',
      'bg-orange-50',
      'bg-teal-50',
      'bg-indigo-50'
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center">Yükleniyor...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header Section with Logo */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
          {restaurant.logoPhotoPath && (
              <div className="restaurant-logo-container">
                <img 
                  src={restaurant.logoPhotoPath} 
                  alt={`${restaurant.name} logo`}
                  className="restaurant-logo"
                />
              </div>
            )}
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <h1 className="text-3xl font-bold">{restaurant.name}</h1>
                {isLoggedIn && (
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    onClick={toggleFavorite}
                    disabled={isUpdatingFavorite}
                  >
                    {isFavorite ? '⭐ Favorilerden Kaldır' : '☆ Favorilere Ekle'}
                  </button>
                )}
              </div>
              <div className="space-y-2">
                <p><strong>Adres:</strong> {restaurant.address}</p>
                <p><strong>Etiketler:</strong> {restaurant.tags?.join(', ')}</p>
                <p><strong>Çalışma Saatleri:</strong> {restaurant.operatingHours}</p>
                <p>
                  <strong>Web Sitesi:</strong>{' '}
                  <a href={restaurant.websiteLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                    {restaurant.websiteLink}
                  </a>
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Photos Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">Fotoğraflar</h2>
          {restaurant.photoPaths && restaurant.photoPaths.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {restaurant.photoPaths.map((photo, index) => (
                <img key={index} src={photo} alt={`Restaurant fotoğrafı ${index + 1}`} className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform" />
              ))}
            </div>
          ) : (
            <p>Fotoğraflar bulunmamaktadır</p>
          )}
        </div>

        {/* Popular Dishes Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold mb-4">Popüler Yemekler</h2>
          {error && <p className="text-red-600 mb-4">{error}</p>}
          {menuItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {menuItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className={`${getMenuItemColor(index)} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100`}
                >
                  <div className="flex flex-col h-full">
                    <h3 className="text-xl font-semibold mb-3">{item.name}</h3>
                    <div className="flex-1 space-y-2">
                      <p className="text-gray-700"><strong>Açıklama:</strong> {item.description}</p>
                      <p className="text-gray-700"><strong>Fiyat:</strong> {item.price} ₺</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.tags?.map((tag, tagIndex) => (
                          <span 
                            key={tagIndex}
                            className="inline-block px-2 py-1 bg-white rounded-full text-sm text-gray-600 border border-gray-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Yemekler bulunmamaktadır.</p>
          )}
        </div>

{/* Comments Section */}
<div className="bg-white rounded-lg shadow-sm p-6">
  <h2 className="text-2xl font-bold mb-6 text-gray-800">Yorumlar</h2>
  {currentComments.length > 0 ? (
    <div className="space-y-4">
      <div className="p-8 border border-gray-100 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-sm">
        <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-2xl font-bold text-white">
              {currentComments[0].user?.name?.charAt(0).toUpperCase() || '?'}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-800">
              {currentComments[0].user?.name || 'Bilinmeyen Kullanıcı'}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(currentComments[0].createdAt).toLocaleDateString('tr-TR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center mb-1">
              {[...Array(5)].map((_, index) => (
                <span key={index} className="text-yellow-400 text-xl">
                  {index < currentComments[0].rating ? '★' : '☆'}
                </span>
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">
              {currentComments[0].rating}/5 Puan
            </span>
          </div>
        </div>
        <div className="space-y-3">
          <p className="text-gray-700 leading-relaxed text-lg pl-4 border-l-4 border-blue-100 italic">
            "{currentComments[0].comment}"
          </p>
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center py-8">
      <p className="text-gray-500 text-lg">Henüz yorum bulunmamaktadır.</p>
    </div>
  )}

  {/* Updated Pagination Controls */}
  {comments.length > 0 && (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button 
        onClick={handlePreviousPage} 
        disabled={currentPage === 1}
        className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-600 transition-colors flex items-center gap-2"
      >
        ← Önceki Yorum
      </button>
      
      <span className="text-gray-700 font-medium margin:10px">
        {currentPage} / {totalPages}
      </span>
      
      <button 
        onClick={handleNextPage} 
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-red-500 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-red-600 transition-colors flex items-center gap-2"
      >
        Sonraki Yorum →
      </button>
    </div>
  )}
</div>

        {/* Reservation Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <ReservationForm
            onSubmit={handleReservation}
            availableTimeSlots={availableTimeSlots || []}
            maxGuests={restaurant.maxGuests}
            terms={restaurant.additionalCondition}
            reservationTags={[
              restaurant.birthdayParty && 'Doğum Günü',
              restaurant.anniversary && 'Yıldönümü',
              restaurant.jobMeeting && 'İş Yemeği',
              restaurant.proposal && 'Evlilik Teklifi',
            ].filter(Boolean)}
          />
        </div>
      </div>
    </div>
  );
};

export default Restaurant;


