import { checkDataExists, createMarkUpFromFeed, createMarkUpFromValues, positionAssign } from '../util.js';

export default function renderPlayerCard(url) {

    const playersListContainer = document.getElementById('players__list');
    
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let players = data.players,
                cards = [],
                options = [],
                optionElements;

            // One select element needed; create before data map
            const select = document.createElement('select');
            select.setAttribute('name', 'players');
            select.setAttribute('id', 'select_players');
            
            players.map(function(p) {
                const stats = p.stats;

                // Create elements
                const card = document.createElement('div'),
                      name = document.createElement('h2'),
                      position = document.createElement('h3'),
                      goalsPerMatch = document.createElement('p'),
                      passesPerMinute = document.createElement('p'),
                      imgPlayer = document.createElement('img'),
                      imgLogoClub = document.createElement('div'),
                      imgLogoClubWrap = document.createElement('div'),
                      imgContainer = document.createElement('div'),
                      contentContainer = document.createElement('div'),
                      contentContainerIntro = document.createElement('div'),
                      contentContainerStats = document.createElement('div'),
                      option = document.createElement('option');

                // Create option elements for player select
                option.setAttribute('value', `${p.player.id}`);
                option.appendChild(document.createTextNode(`${p.player.name.first} ${p.player.name.last}`));
                options.push(option);
                
                // Apply attributes to created elements
                card.setAttribute('class', 'player-stat__container');
                card.setAttribute('id', `player__${p.player.id}`);
                imgPlayer.setAttribute('src', `./assets/images/players/p${p.player.id}.png`);
                imgPlayer.setAttribute('alt', `${p.player.name.first} ${p.player.name.last}`);
                imgLogoClub.setAttribute('class', `logo__club`);
                imgLogoClub.setAttribute('id', `club_${p.player.currentTeam.id}`);
                imgLogoClubWrap.classList.add('wrap--logo__club');
                imgContainer.classList.add('player-stat__img');
                contentContainer.classList.add('player-stat__content');
                contentContainerIntro.classList.add('player-stat__content__intro');
                contentContainerStats.classList.add('player-stat__content__stats');

                // Push all cards to an array; this is needed later to show the first player card on page load
                cards.push(card);

                // Values to be used in arithemtical operation; check to see they exist
                const goalsExist = checkDataExists(stats, 'goals'),
                      appearancesExist = checkDataExists(stats, 'appearances'),
                      forwardPassesExist = checkDataExists(stats, 'fwd_pass'),
                      backwardPassesExist = checkDataExists(stats, 'backward_pass'),
                      minutesPlayedExist = checkDataExists(stats, 'mins_played');

                // Goals per match should only be calculated if both goals and appearances are present
                if (goalsExist && appearancesExist) {
                    createMarkUpFromValues(goalsPerMatch, 'Goals per match', `${(p.stats.find(p => p.name === 'goals').value / p.stats.find(p => p.name === 'appearances').value).toFixed(2)}`)
                }

                // Passes can be either forward or back; at least one has to be present and a minutes played value
                if ((forwardPassesExist || backwardPassesExist) && minutesPlayedExist) {
                    let totalPasses = 0;
                    
                    forwardPassesExist ? totalPasses += p.stats.find(p => p.name === 'fwd_pass').value : null;
                    backwardPassesExist ? totalPasses += p.stats.find(p => p.name === 'backward_pass').value : null;
                    createMarkUpFromValues(passesPerMinute, 'Passes per minute', `${(totalPasses / p.stats.find(p => p.name === 'mins_played').value).toFixed(2)}`);
                }

                // Convert single-letter positions into full word
                let positionValue = positionAssign(p.player.info.position)

                // Create text nodes
                let nameTextNode = document.createTextNode(`${p.player.name.first} ${p.player.name.last}`),
                    positionTextNode = document.createTextNode(`${positionValue}`);
                
                // Create elements where data is directly accessible from API
                const appearances =  createMarkUpFromFeed(stats, 'appearances', 'p', 'Appearances'),
                      assists = createMarkUpFromFeed(stats, 'goal_assist', 'p', 'Assists'),
                      goals = createMarkUpFromFeed(stats, 'goals', 'p', 'Goals')

                // Append text nodes and elements
                name.appendChild(nameTextNode);
                position.appendChild(positionTextNode);
                imgLogoClubWrap.appendChild(imgLogoClub);
                imgContainer.append(...[imgPlayer, imgLogoClubWrap]);
                contentContainerStats.append(...[appearances, goals, assists, goalsPerMatch, passesPerMinute])
                contentContainerIntro.append(...[name, position])
                contentContainer.append(...[contentContainerIntro, contentContainerStats]);
                card.append(...[imgContainer, contentContainer]);
                playersListContainer.append(card);
                
            })

            // Append option elements to select
            const selectEl = document.getElementById('players__select');
            for (const option of options) {
                optionElements += selectEl.append(option);
            }
            selectEl.append(optionElements);

            // Make first card visible by default
            cards[0].classList.add('show');

    })
    .catch(function(error) {
        console.log(error);
    });

}
