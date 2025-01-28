interface AuthResponse {
  token: string;
  email: string;
  role: "USER" | "ADMIN";
  firstName: string;
  lastName: string;
}

interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
}

interface LoginData {
  email: string;
  password: string;
}

export class AuthService {
  private static API_URL = "http://localhost:8080/api";

  static async register({
    confirmPassword,
    ...registerData
  }: RegisterData): Promise<AuthResponse> {
    console.log("Sending registration data:", registerData);

    const response = await fetch(`${this.API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: registerData.email,
        password: registerData.password,
        confirmPassword: confirmPassword,
        firstName: registerData.firstName,
        lastName: registerData.lastName,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Registration failed:", errorData);
      throw new Error(
        errorData.message || `Registration failed: ${response.status}`
      );
    }

    const authData = await response.json();
    localStorage.setItem("token", authData.token);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        firstName: authData.firstName,
        lastName: authData.lastName,
        email: authData.email,
        role: authData.role,
      })
    );
    return authData;
  }

  static async login(data: LoginData): Promise<AuthResponse> {
    const response = await fetch(`${this.API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const authData = await response.json();
    console.log("Login response:", {
      token: authData.token ? "Token exists" : "No token",
      firstName: authData.firstName,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem(
      "userInfo",
      JSON.stringify({
        firstName: authData.firstName,
        lastName: authData.lastName,
        email: authData.email,
        role: authData.role,
      })
    );

    // Log what was stored
    console.log("Stored token:", localStorage.getItem("token"));

    return authData;
  }

  static logout(): void {
    localStorage.clear();
  }

  static isAuthenticated(): boolean {
    return !!localStorage.getItem("token");
  }

  static getAuthHeader() {
    const token = localStorage.getItem("token");
    console.log(
      "Getting auth header with token:",
      token ? "exists" : "missing"
    );
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}
