

const BASE_URL = "http://localhost:4000/api"; 


export const getGames = async () => {
  try {
    const res = await fetch(`${BASE_URL}/games`);
    if (!res.ok) throw new Error("Error al obtener juegos");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};

export const getGameById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/games/${id}`);
    if (!res.ok) throw new Error("Juego no encontrado");
    return await res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getUserLibrary = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/library`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Error al obtener biblioteca");
    return await res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
};


export const getUserStats = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Error al obtener estadísticas");
    return await res.json();
  } catch (err) {
    console.error(err);
    return {
      completedGames: 0,
      hoursPlayed: 0,
      averageRating: 0,
      categories: [],
    };
  }
};


export const loginUser = async (email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error("Credenciales inválidas");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};


export const registerUser = async (name, email, password) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (!res.ok) throw new Error("Error al registrar usuario");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
