export default function renderPlayerCard(url) {

    const ul = document.getElementById('players');
    
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let players = data.players;
            
            players.map(function(p) {
                const stats = p.stats;
                console.log(p);

                // Create elements
                const card = document.createElement('div'),
                      name = document.createElement('h2'),
                      position = document.createElement('h3'),
                      goalsPerMatch = document.createElement('p'),
                      passesPerMinute = document.createElement('p'),
                      select = document.createElement('select'),
                      option = document.createElement('option');

                // Apply attributes to created elements
                card.setAttribute('class', 'card card--player-stats');
                select.setAttribute('name', 'players');
                select.setAttribute('id', 'select_players')

                // Create HTML for relevant piece of data
                function createMarkUp(arr, id, tag, label) {
                    const filteredResults = arr.filter(obj => {
                        return obj.name === id
                    })
                    const el = document.createElement(tag);
                    if (filteredResults.length > 0) {
                        el.appendChild(document.createTextNode(`${label} ${filteredResults[0]['value']}`));
                    } else {
                        el.appendChild(document.createTextNode(`${label} 0`));
                    }
                    return el;
                }

                // Check data exists in feed
                function checkData(arr, id) {
                    const filteredResults = arr.filter(obj => {
                        return obj.name === id
                    })
                    return filteredResults.length > 0 ? true : false;
                }

                // Values to be used in arithemtical operation; check to see they exist
                const goalsExist = checkData(stats, 'goals'),
                      appearancesExist = checkData(stats, 'appearances'),
                      forwardPassesExist = checkData(stats, 'fwd_pass'),
                      backwardPassesExist = checkData(stats, 'backward_pass'),
                      minutesPlayedExist = checkData(stats, 'mins_played');

                // Goals per match should only be calculated if both goals and appearances are present
                if (goalsExist && appearancesExist) {
                    const goalsPerMatchTextNode = document.createTextNode(`Goals per match ${(p.stats.find(p => p.name === 'goals').value / p.stats.find(p => p.name === 'appearances').value).toFixed(2)}`);
                    goalsPerMatch.appendChild(goalsPerMatchTextNode)
                }

                // Passes can be either forward or back; at least one has to be present and a minutes played value
                if ((forwardPassesExist || backwardPassesExist) && minutesPlayedExist) {
                    let totalPasses = 0;
                    
                    forwardPassesExist ? totalPasses += p.stats.find(p => p.name === 'fwd_pass').value : null;
                    backwardPassesExist ? totalPasses += p.stats.find(p => p.name === 'backward_pass').value : null;

                    const passesPerMinuteTextNode = document.createTextNode(`Passes per minute ${(totalPasses / p.stats.find(p => p.name === 'mins_played').value).toFixed(2)}`);
                    passesPerMinute.appendChild(passesPerMinuteTextNode);
                }

                // Convert single-letter positions into full word
                let positionValue;
                switch(p.player.info.position) {
                    case 'D':
                        positionValue = 'Defender';
                        break;
                    case 'M':
                        positionValue = 'Midfielder';
                        break;
                    case 'F':
                        positionValue = 'Forward';
                        break;
                    default:
                        positionValue = 'Goalkeeper';
                  }

                // Create text nodes
                let nameTextNode = document.createTextNode(`${p.player.name.first} ${p.player.name.last}`),
                    positionTextNode = document.createTextNode(`${positionValue}`);
                
                
                const appearances =  createMarkUp(stats, 'appearances', 'p', 'Appearances'),
                      assists = createMarkUp(stats, 'goal_assist', 'p', 'Assists'),
                      goals = createMarkUp(stats, 'goals', 'p', 'Goals')

                // Append text nodes
                name.appendChild(nameTextNode);
                position.appendChild(positionTextNode);

                card.append(...[name, position, appearances, goals, assists, goalsPerMatch, passesPerMinute])

                ul.appendChild(...[card]);
                
            })

    })
    .catch(function(error) {
        console.log(error);
    });

}
