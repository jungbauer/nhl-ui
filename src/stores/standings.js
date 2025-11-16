import useFetch from "@/utils/useFetch.js";

export const useStandingsStore = defineStore("standings", () => {
  const standings = ref([]);
  const standingsUrl = `${import.meta.env.VITE_API_URL}/nhl/standings`;
  const [startFetch] = useFetch(standingsUrl);

  async function refreshStandings() {
    const teamsData = await startFetch();
    standings.value = teamsData.standings.map(function(elem) {
      return {
        teamName: elem.teamName.default,
        teamLogo: elem.teamLogo,
        points: elem.points,
        wins: elem.wins,
        losses: elem.losses,
        otLosses: elem.otLosses,
        gamesPlayed: elem.gamesPlayed,
        conference: elem.conferenceName,
        division: elem.divisionName,
        teamAbbrev: elem.teamAbbrev.default,
        conferenceSequence: elem.conferenceSequence,
        divisionSequence: elem.divisionSequence,
        wildcardSequence: elem.wildcardSequence,
        streakCode: elem.streakCode,
        streakCount: elem.streakCount,
      };
    });
  }

  return { standings, refreshStandings };
});
