import { AuthService } from "./auth.service";

interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
  metadata: {
    totalGames: number;
    totalPlayers: number;
  };
}

export interface DashboardStat {
  playerId: number;
  playerName: string;
  team: string;
  opponent: string;
  isAway: boolean;
  category: string;
  threshold: number;
  hitRate: number;
  confidenceScore: number;
}

interface DashboardQueryParams {
  page?: number;
  size?: number;
  timeFrame?: string;
  category?: string;
  threshold?: string;
  sortBy?: string;
  sortDir?: "asc" | "desc";
}

interface RecentGame {
  gameDate: string;
  opponent: string;
  isAway: boolean;
  statValue: number;
  hitThreshold: boolean;
}

export interface PlayerDetailData {
  playerId: number;
  playerName: string;
  team: string;
  hitRate: number;
  confidenceScore: number;
  gamesPlayed: number;
  average: number;
  isHighConfidence: boolean;
  recentGames: RecentGame[];
}

export class StatsService {
  private static API_URL = "http://localhost:8080/api";

  static async getDashboardStats(
    params: DashboardQueryParams
  ): Promise<ApiResponse<DashboardStat[]>> {
    try {
      const queryParams = new URLSearchParams({
        timeFrame: params.timeFrame || "L10",
        categoryStr: params.category || "POINTS",
        threshold: params.threshold?.replace("+", "") || "10",
        ...(params.sortBy && { sortBy: params.sortBy.toLowerCase() }),
        ...(params.sortDir && { sortDir: params.sortDir.toLowerCase() }),
      });

      const url = `${this.API_URL}/dashboard/stats?${queryParams}`;
      const headers = {
        ...AuthService.getAuthHeader(),
        "Content-Type": "application/json",
      };

      console.log("Making request with headers:", headers);
      console.log("Auth token:", localStorage.getItem("token"));

      const response = await fetch(url, { headers });

      if (!response.ok) {
        console.log("Response not OK:", {
          status: response.status,
          statusText: response.statusText,
        });

        if (response.status === 401) {
          const errorBody = await response.text();
          console.log("401 Response body:", errorBody);
          throw new Error("Your session has expired. Please log in again.");
        }
        if (response.status === 403) {
          throw new Error("You don't have permission to access this data.");
        }
        if (response.status === 404) {
          throw new Error("No data found for the selected filters.");
        }
        if (response.status >= 500) {
          throw new Error("Server error. Please try again later.");
        }

        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch dashboard stats");
      }

      return response.json();
    } catch (error) {
      console.error("Error in getDashboardStats:", error);
      throw error;
    }
  }

  static async getPlayerStats(
    playerId: number,
    params: {
      timePeriod: string;
      category: string;
      threshold: string;
    }
  ): Promise<ApiResponse<PlayerDetailData>> {
    try {
      const queryParams = new URLSearchParams({
        timePeriod: params.timePeriod,
        category: params.category,
        threshold: params.threshold.replace("+", ""),
      });

      const url = `${this.API_URL}/players/${playerId}/stats?${queryParams}`;
      
      const headers = AuthService.getAuthHeader();
      
      console.log("Making player stats request:", {
        url,
        headers,
        hasToken: !!localStorage.getItem("token")
      });

      const response = await fetch(url, { 
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        method: 'GET'
      });

      if (!response.ok) {
        console.log("Response not OK:", {
          status: response.status,
          statusText: response.statusText,
        });

        if (response.status === 401) {
          const errorBody = await response.text();
          console.log("401 Response body:", errorBody);
          throw new Error("Your session has expired. Please log in again.");
        }
        if (response.status === 403) {
          throw new Error("You don't have permission to access this data.");
        }
        if (response.status === 404) {
          throw new Error("No data found for the selected filters.");
        }
        if (response.status >= 500) {
          throw new Error("Server error. Please try again later.");
        }

        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to fetch player stats");
      }

      return response.json();
    } catch (error) {
      console.error("Error in getPlayerStats:", error);
      throw error;
    }
  }

  // Helper method to format stat line
  static formatStatLine(category: string, threshold: number): string {
    return `${category} ${threshold}+`;
  }

  // Helper method to calculate overview stats
  static calculateOverviewStats(stats: DashboardStat[]) {
    return {
      totalStats: stats.length,
      highHitRates: stats.filter((stat) => stat.hitRate >= 80).length,
      highConfidence: stats.filter((stat) => stat.confidenceScore >= 80).length,
    };
  }
}
