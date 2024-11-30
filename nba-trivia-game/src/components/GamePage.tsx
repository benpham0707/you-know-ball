import { useState, useEffect } from 'react';
import './GamePage.css';
import { Link } from 'react-router-dom';


// Corrected team logo imports
import atlantaHawks2007 from '../team-logos/Atlanta Hawks 2007.png';
import atlantaHawks2020 from '../team-logos/Atlanta Hawks 2020.png';
import atlantaHawks2000_2007 from '../team-logos/Atlanta_Hawks_2000_2007.webp';
import bostonCeltics1996 from '../team-logos/Boston Celtics 1996.png';
import brooklynNetsLogo from '../team-logos/Brooklyn Nets Logo.png';
import newJerseyNets2000 from '../team-logos/New_Jersey_Nets_2000.png';
import charlotteBobcats2004 from '../team-logos/Charlotte Bobcats 2004 Logo.png';
import charlotteHornets2014 from '../team-logos/Charlotte Hornets 2014.png';
import charlotteHornets2012 from '../team-logos/Charlotte Hornets 2012.webp';
import chicagoBullsMascot from '../team-logos/Chicago Bulls Mascot.png';
import clevelandCavaliers2003 from '../team-logos/Cleveland Cavaliers 2003.png';
import clevelandCavaliers2010 from '../team-logos/Cleveland Cavaliers 2010.png';
import clevelandCavaliers2017 from '../team-logos/Cleveland Cavaliers 2017 Logo.png';
import clevelandCavaliers2022 from '../team-logos/Cleveland Cavaliers 2022.webp';
import dallasMavericks2001 from '../team-logos/Dallas Mavericks 2001.png';
import denverNuggets2018 from '../team-logos/Denver Nuggets 2018 Logo.png';
import denverNuggetsLogo from '../team-logos/Denver Nuggets Logo.png';
import denverNuggets2008 from '../team-logos/Denver_Nuggets2008.png';
import detroitPistons2017 from '../team-logos/Detroit Pistons 2017.png';
import detroitPistonsLogo from '../team-logos/Detroit Pistons Logo.png';
import goldenStateWarriors1997 from '../team-logos/Golden State Warriors 1997.png';
import goldenStateWarriors2010 from '../team-logos/Golden State Warriors 2010.png';
import goldenStateWarriors2019 from '../team-logos/Golden State Warriors 2019.png';
import houstonRockets2003 from '../team-logos/Houston Rockets 2003.png';
import houstonRockets2019 from '../team-logos/Houston Rockets Icon 2019.png';
import indianaPacers2017 from '../team-logos/Indiana Pacers Logo 2017.png';
import indianaPacersLogo from '../team-logos/Indiana Pacers Logo.png';
import miamiHeat1999 from '../team-logos/Miami Heat Logo 1999.png';
import milwaukeeBucks2006 from '../team-logos/Milwaukee Bucks Logo 1993-2006.png';
import milwaukeeBucks2016 from '../team-logos/Milwaukee Bucks Logo 2016.png';
import milwaukeeBucksLogo from '../team-logos/Milwaukee Bucks Logo.png';
import minnesotaTimberwolves2017 from '../team-logos/Minnesota Timberwolves 2017.png';
import minnesotaTimberwolves2008 from '../team-logos/Minnesota Timberwolves Logo 1996-2008.webp';
import minnesotaTimberwolvesLogo from '../team-logos/Minnesota Timberwolves Logo.png';
import newOrleansHornets2002 from '../team-logos/New Orleans Hornets Logo 2002-2008.png';
import newOrleansPelicans2008 from '../team-logos/New Orleans Pelicans Logo 2008-2013.png';
import newOrleansPelicansLogo from '../team-logos/New Orleans Pelicans Logo.png';
import newYorkKnicks2011 from '../team-logos/New York Knicks 2011.png';
import oklahomaCityThunderLogo from '../team-logos/Oklahoma City Thunder Logo.png';
import orlandoMagic2000 from '../team-logos/Orlando Magic 2000.png';
import orlandoMagic2010 from '../team-logos/Orlando Magic 2010.png';
import philadelphia76ers2013 from '../team-logos/Philadelphia 76ers II.png';
import philadelphia76ers1997 from '../team-logos/Philadelphia 76ers Logo 1997-2009.png';
import phoenixSuns2013 from '../team-logos/Phoenix Suns 2013.png';
import phoenixSunsLogo from '../team-logos/Phoenix Suns Logo.png';
import portlandTrailBlazers2017 from '../team-logos/Portland Trail Blazers 2017 Logo.png';
import portlandTrailBlazersLogo from '../team-logos/Portland Trail Blazers Logo.png';
import sacramentoKings1994 from '../team-logos/Sacramento Kings 1994.png';
import sacramentoKings2016 from '../team-logos/Sacramento Kings 2016.png';
import sanAntonioSpurs2002 from '../team-logos/San Antonio Spurs Logo 2002.png';
import sanAntonioSpurs2017 from '../team-logos/San Antonio Spurs Logo 2017.png';
import seattleSuperSonics2001 from '../team-logos/Seattle SuperSonics 2001.png';
import torontoRaptors2015 from '../team-logos/Toronto Raptors 2015.png';
import torontoRaptors2020 from '../team-logos/Toronto Raptors 2020.png';
import torontoRaptors2008 from '../team-logos/Toronto Raptors Logo 1995-2008.png';
import utahJazz2016 from '../team-logos/Utah Jazz 2016.png';
import utahJazz2022 from '../team-logos/Utah Jazz 2022 Alternate.png';
import utahJazz2004 from '../team-logos/Utah Jazz Logo 2004-2010.png';
import utahJazzLogo from '../team-logos/Utah Jazz Logo.png';
import washingtonWizards2007 from '../team-logos/Washington Wizards Logo 2007-2011.png';
import washingtonWizards2015 from '../team-logos/Washington Wizards Logo 2015.png';
import washingtonWizardsLogo from '../team-logos/Washington Wizards Logo.png';
import ClippersOld from '../team-logos/Los Angeles Clippers Logo.png';
import ClippersNew from '../team-logos/Los Angeles Clippers 2015.webp';
import Lakers from '../team-logos/Los Angeles Lakers 2001.png';
import MemOld from '../team-logos/Memphis Grizzlies Logo.png';
import MemNew from '../team-logos/Memphis Grizzlies 2018.png';


// Define leaderboard entry interface
interface LeaderboardEntry {
    rank: number;
    name: string;
    stat: number;
    team: string;
}

interface Player {
    id: number;
    name: string;
    team: string;
}

const GamePage = () => {
    const [answers, setAnswers] = useState<LeaderboardEntry[]>([]);
    const [revealedAnswers, setRevealedAnswers] = useState<boolean[]>([]);
    const [userAnswer, setUserAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const [stat, setStat] = useState('');
    const [season, setSeason] = useState('');
    const [loading, setLoading] = useState(false);
    const [players, setPlayers] = useState<Player[]>([]); // Store all player data
    const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);

    // Define team logo map
    const teamLogoMap: Record<string, { start: number; end: number; logo: string }[]> = {
        ATL: [
            { start: 2000, end: 2007, logo: atlantaHawks2000_2007 },
            { start: 2008, end: 2015, logo: atlantaHawks2007 },
            { start: 2016, end: 2023, logo: atlantaHawks2020 },
        ],
        BOS: [{ start: 2000, end: 2023, logo: bostonCeltics1996 }],
        BKN: [
            { start: 2012, end: 2023, logo: brooklynNetsLogo },
        ],
        NJN: [
            { start: 2000, end: 2012, logo: newJerseyNets2000 },
        ],
        CHA: [
            { start: 2004, end: 2014, logo: charlotteBobcats2004 },
            { start: 2012, end: 2013, logo: charlotteHornets2012 },
            { start: 2014, end: 2023, logo: charlotteHornets2014 },
        ],
        CHI: [{ start: 2000, end: 2023, logo: chicagoBullsMascot }],
        CLE: [
            { start: 2003, end: 2009, logo: clevelandCavaliers2003 },
            { start: 2010, end: 2016, logo: clevelandCavaliers2010 },
            { start: 2017, end: 2021, logo: clevelandCavaliers2017 },
            { start: 2022, end: 2023, logo: clevelandCavaliers2022 },
        ],
        DAL: [{ start: 2001, end: 2023, logo: dallasMavericks2001 }],
        DEN: [
            { start: 2000, end: 2008, logo: denverNuggets2008 },
            { start: 2009, end: 2017, logo: denverNuggetsLogo },
            { start: 2018, end: 2023, logo: denverNuggets2018 },
        ],
        DET: [
            { start: 2000, end: 2016, logo: detroitPistonsLogo },
            { start: 2017, end: 2023, logo: detroitPistons2017 },
        ],
        GSW: [
            { start: 1997, end: 2009, logo: goldenStateWarriors1997 },
            { start: 2010, end: 2018, logo: goldenStateWarriors2010 },
            { start: 2019, end: 2023, logo: goldenStateWarriors2019 },
        ],
        HOU: [
            { start: 2003, end: 2018, logo: houstonRockets2003 },
            { start: 2019, end: 2023, logo: houstonRockets2019 },
        ],
        IND: [
            { start: 2000, end: 2016, logo: indianaPacersLogo },
            { start: 2017, end: 2023, logo: indianaPacers2017 },
        ],
        LAC: [
            { start: 2000, end: 2014, logo: ClippersOld },
            { start: 2015, end: 2023, logo: ClippersNew },
        ],
        LAL: [
            { start: 2000, end: 2023, logo: Lakers },
        ],
        MEM: [
            { start: 2000, end: 2017, logo: MemOld },
            { start: 2018, end: 2023, logo: MemNew },
        ],
        MIA: [
            { start: 1999, end: 2023, logo: miamiHeat1999 },
        ],
        MIL: [
            { start: 1993, end: 2006, logo: milwaukeeBucks2006 },
            { start: 2007, end: 2015, logo: milwaukeeBucksLogo },
            { start: 2016, end: 2023, logo: milwaukeeBucks2016 },
        ],
        MIN: [
            { start: 1996, end: 2008, logo: minnesotaTimberwolves2008 },
            { start: 2009, end: 2016, logo: minnesotaTimberwolvesLogo },
            { start: 2017, end: 2023, logo: minnesotaTimberwolves2017 },
        ],
        NOK: [
            { start: 2002, end: 2007, logo: newOrleansHornets2002 },
        ],
        NOH: [
            { start: 2007, end: 2013, logo: newOrleansPelicans2008 },
        ],
        NOP: [
            { start: 2013, end: 2023, logo: newOrleansPelicansLogo },
        ],
        NYK: [{ start: 2000, end: 2023, logo: newYorkKnicks2011 }],
        OKC: [{ start: 2000, end: 2023, logo: oklahomaCityThunderLogo }],
        ORL: [
            { start: 2000, end: 2009, logo: orlandoMagic2000 },
            { start: 2010, end: 2023, logo: orlandoMagic2010 },
        ],
        PHI: [
            { start: 1997, end: 2009, logo: philadelphia76ers1997 },
            { start: 2010, end: 2023, logo: philadelphia76ers2013 },
        ],
        PHX: [
            { start: 2000, end: 2012, logo: phoenixSunsLogo },
            { start: 2013, end: 2023, logo: phoenixSuns2013 },
        ],
        POR: [
            { start: 2000, end: 2016, logo: portlandTrailBlazersLogo },
            { start: 2017, end: 2023, logo: portlandTrailBlazers2017 },
        ],
        SAC: [
            { start: 1994, end: 2015, logo: sacramentoKings1994 },
            { start: 2016, end: 2023, logo: sacramentoKings2016 },
        ],
        SAS: [
            { start: 2002, end: 2016, logo: sanAntonioSpurs2002 },
            { start: 2017, end: 2023, logo: sanAntonioSpurs2017 },
        ],
        SEA: [{ start: 2000, end: 2008, logo: seattleSuperSonics2001 }],
        TOR: [
            { start: 1995, end: 2008, logo: torontoRaptors2008 },
            { start: 2009, end: 2019, logo: torontoRaptors2015 },
            { start: 2020, end: 2023, logo: torontoRaptors2020 },
        ],
        UTA: [
            { start: 2004, end: 2009, logo: utahJazz2004 },
            { start: 2010, end: 2015, logo: utahJazzLogo },
            { start: 2016, end: 2021, logo: utahJazz2016 },
            { start: 2022, end: 2023, logo: utahJazz2022 },
        ],
        WAS: [
            { start: 1997, end: 2010, logo: washingtonWizards2007 },
            { start: 2011, end: 2014, logo: washingtonWizardsLogo },
            { start: 2015, end: 2023, logo: washingtonWizards2015 },
        ],
    };


    // Utility function to get the logo path
    const getLogoPath = (team: string, season: string): string => {
        const year = parseInt(season.split('-')[0]);
        const teamLogos = teamLogoMap[team];
        if (!teamLogos) return ''; // Return empty string if no logos for the team

        const logoInfo = teamLogos.find(({ start, end }) => year >= start && year <= end);
        return logoInfo ? logoInfo.logo : ''; // Return the correct logo path or empty string
    };

    useEffect(() => {
        fetch('http://localhost:5001/api/players')
            .then((res) => res.json())
            .then((data) => setPlayers(data))
            .catch((error) => console.error('Error fetching players:', error));
    }, []);

    // Fetch new game data
    const fetchNewGameData = () => {
        setLoading(true);
        fetch('http://localhost:5001/api/league-leaders')
            .then((response) => response.json())
            .then((data) => {
                setAnswers(data.leaderboard);
                setRevealedAnswers(Array(data.leaderboard.length).fill(false));
                setStat(data.stat);
                setSeason(data.season);
                setUserAnswer('');
                setIncorrectAnswers(0);
                setIsGameOver(false);
                setLoading(false);
                setIsGameWon(false);
                setFilteredPlayers([]); // Clear recommendations
            })
            .catch((error) => {
                console.error('Error fetching new game data:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchNewGameData();
    }, []);

    useEffect(() => {
        if (!isGameOver && revealedAnswers.every((revealed) => revealed)) {
            setIsGameWon(true); // Mark the game as won
        }
    }, [revealedAnswers, isGameOver]);


    const handleInputChange = (value: string) => {
        setUserAnswer(value);

        if (value.trim() === '') {
            setFilteredPlayers([]); // Clear recommendations if input is empty
        } else {
            // Filter players whose names include the input text
            const filtered = players.filter((player) =>
                player.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredPlayers(filtered.slice(0, 5)); // Limit to top 5 matches
        }
    };


    const handleSubmit = () => {
        if (isGameOver || isGameWon) return;

        const foundIndex = answers.findIndex(
            (answer) => answer.name.toLowerCase() === userAnswer.toLowerCase()
        );

        if (foundIndex !== -1 && !revealedAnswers[foundIndex]) {
            // Correct answer
            const updatedRevealedAnswers = [...revealedAnswers];
            updatedRevealedAnswers[foundIndex] = true;
            setRevealedAnswers(updatedRevealedAnswers);

            // Check if the game is won after revealing this answer
            if (updatedRevealedAnswers.every((revealed) => revealed)) {
                setIsGameWon(true);
            }
        } else {
            // Incorrect answer
            setIncorrectAnswers((prev) => {
                const newCount = prev + 1;
                if (newCount >= 3) {
                    setIsGameOver(true); // End the game on 3 strikes
                }
                return newCount;
            });
        }
        setUserAnswer('');
        setFilteredPlayers([]);
    };


    const handleRevealAnswers = () => {
        setRevealedAnswers(Array(answers.length).fill(true));
    };

    return (
        <div className="game-container">
            <div className="back-to-home">
                <Link to="/" className="back-button">Back to Home</Link>
            </div>
            <h1>
                Who are the top 10 <span className="highlight">{stat}</span> per game leaders from
                the <span className="highlight">{season}</span> NBA Season?
            </h1>
            <div className="leaderboard-container">
                {answers.map((answer, index) => (
                    <div
                        key={index}
                        className={`leaderboard-item ${revealedAnswers[index] ? 'answered' : 'unanswered'
                            }`}
                    >
                        <div className="leaderboard-left">
                            <span className="rank">{index + 1}.</span>
                            <img
                                src={getLogoPath(answer.team, season)} // Always show logo
                                alt={`${answer.team} logo`}
                                className="team-logo"
                            />
                        </div>
                        <span className="player-name">
                            {revealedAnswers[index] ? answer.name : '-----'}
                        </span>
                        <span className="player-stat">
                            {revealedAnswers[index] ? answer.stat : '--'}
                        </span>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <div style={{ flex: 1, position: 'relative' }}>
                    <input
                        type="text"
                        placeholder={isGameOver ? 'Game Over' : 'Enter player name'}
                        value={userAnswer}
                        onChange={(e) => handleInputChange(e.target.value)}
                        disabled={loading || isGameOver || isGameWon}
                        style={{ width: '100%' }}
                    />
                    {filteredPlayers.length > 0 && (
                        <ul className="recommendation-list">
                            {filteredPlayers.map((player) => (
                                <li
                                    key={player.id}
                                    onClick={() => {
                                        setUserAnswer(player.name); // Autofill input
                                        setFilteredPlayers([]); // Clear recommendations
                                    }}
                                >
                                    {player.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    onClick={handleSubmit}
                    disabled={isGameOver || loading}
                    style={{ marginLeft: '15px' }} // Add margin between input and button
                >
                    Submit
                </button>
            </div>



            <div className="tracker-container">
                <span className="incorrect-tracker">
                    Incorrect Answers: {incorrectAnswers}/3
                </span>
                {isGameOver && !isGameWon && (
                    <button className="reveal-button" onClick={handleRevealAnswers}>
                        Reveal Answers
                    </button>
                )}
                {isGameWon && !isGameOver && (
                    <span className="win-message">🎉 You Win! 🎉</span>
                )}
                <button
                    className="new-game-button"
                    onClick={fetchNewGameData}
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'New Game'}
                </button>
            </div>

        </div>
    );
}


export default GamePage;
