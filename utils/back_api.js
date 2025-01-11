// Example usage in components:

// In your login component:
import { authAPI } from '@/services/api/axiosSetup';

const LoginComponent = () => {
  const handleLogin = async (credentials) => {
    try {
      const response = await authAPI.login(credentials);
      // Handle successful login
    } catch (error) {
      // Handle error
    }
  };
  // ...
};

// In your profile component:
import { userAPI } from '@/services/api/axiosSetup';

const ProfileComponent = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userAPI.getProfile();
        setProfile(response.data);
      } catch (error) {
        // Handle error
      }
    };

    fetchProfile();
  }, []);
  // ...
};

// In your games component:
import { gameAPI } from '@/services/api/axiosSetup';

const GamesComponent = () => {
  const [games, setGames] = useState([]);

  const loadGames = async () => {
    try {
      const response = await gameAPI.getGames();
      setGames(response.data);
    } catch (error) {
      // Handle error
    }
  };

  const handleCreateGame = async (gameData) => {
    try {
      const response = await gameAPI.createGame(gameData);
      // Handle successful game creation
    } catch (error) {
      // Handle error
    }
  };
  // ...
};

// In your tournament component:
import { tournamentAPI } from '@/services/api/axiosSetup';

const TournamentComponent = () => {
  const handleJoinTournament = async (tournamentId) => {
    try {
      await tournamentAPI.joinTournament(tournamentId);
      // Handle successful join
    } catch (error) {
      // Handle error
    }
  };
  // ...
};



import { gameAPI, handleApiError } from '@/services/api/axiosSetup';

const GameComponent = () => {
  const fetchGame = async (gameId) => {
    try {
      const response = await gameAPI.getGameDetails(gameId);
      return response.data;
    } catch (error) {
      const errorInfo = handleApiError(error);
      // Handle specific error types
      switch (errorInfo.type) {
        case 'AUTH_ERROR':
          // Handle authentication error
          break;
        case 'NOT_FOUND':
          // Handle not found error
          break;
        default:
          // Handle other errors
          console.error(errorInfo.message);
      }
    }
  };
};
