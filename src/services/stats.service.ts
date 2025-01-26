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
