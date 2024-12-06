// Components imports
import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import PlayerTeamSearch from '@/components/dashboard/PlayerTeamSearch';

export const metadata = {
  title: 'Find Players and Teams | eGamio',
  description: 'Search and connect with players and teams in the gaming community. Find your perfect match for competitive gaming.',
  keywords: 'gaming, esports, find players, team recruitment, gaming community',
  openGraph: {
    title: 'Find Players and Teams | eGamio',
    description: 'Search and connect with players and teams in the gaming community',
    type: 'website',
  }
};

const FindPage = () => {

  return (
    <>
      <ResponsiveContainer className="mt-32 mb-8 !text-background border-white rounded-lg backdrop-blur-sm !text-foreground">
        <div className="border-b-[1px]">
          {/* Tab buttons for larger screens */}
          <div className="flex min-w-[300px] md:min-w-0 justify-start items-center border-b-[1px]">
            <p
              className={`!mt-0 px-auto h-[54px] w-1/4 min-w-[125px] flex justify-center items-center cursor-pointer bg-highlight text-white`}
            >
              Find
            </p>
          </div>
        </div>
        <div className="mt-4 bg-background-light rounded-md shadow-md">
          <PlayerTeamSearch></PlayerTeamSearch>
        </div>
      </ResponsiveContainer>
    </>
  );
};

export default FindPage;
