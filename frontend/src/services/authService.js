import {
  getDb,
  getUserByEmail,
  mockDelay,
  saveDb,
  setCurrentUser,
} from "./mockData";

function publicUser(user) {
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
}

export async function registerUser(userData) {
  const db = getDb();
  const email = userData.email.trim().toLowerCase();

  if (db.users.some((user) => user.email.toLowerCase() === email)) {
    throw new Error("An account with this email already exists");
  }

  const user = {
    id: db.counters.user++,
    name: userData.name.trim(),
    email,
    password: userData.password,
    role: userData.role || "candidate",
  };

  db.users.push(user);
  saveDb(db);
  return mockDelay({ message: "Registration successful" });
}

export async function loginUser(email, password) {
  const user = getUserByEmail(email.trim());

  if (!user || user.password !== password) {
    throw new Error(
      "Invalid email or password. Try candidate@example.com / candidate123 or hr@example.com / hr12345"
    );
  }

  const safeUser = publicUser(user);
  setCurrentUser(safeUser);
  return mockDelay({
    access_token: `mock-token-${user.id}`,
    token_type: "bearer",
    user: safeUser,
  });
}

export async function getCurrentUser() {
  const raw = localStorage.getItem("mock_current_user");
  if (!raw) return null;

  try {
    return mockDelay(JSON.parse(raw), 50);
  } catch {
    setCurrentUser(null);
    return null;
  }
}

export function logoutUser() {
  setCurrentUser(null);
}
