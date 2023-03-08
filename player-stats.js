export default function renderPlayerCard(url) {

    const ul = document.getElementById('players');
    
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let players = data.players;
            
            players.map(function(p) {
                console.log(p.stats);

                // Create elements
                const li = document.createElement('li'),
                    name = document.createElement('h2'),
                    position = document.createElement('h3'),
                    appearances = document.createElement('p'),
                    goals = document.createElement('p'),
                    assists = document.createElement('p'),
                    goalsPerMatch = document.createElement('p'),
                    passesPerMinute = document.createElement('p');

                // Assists check
                let assistsTextNode;
                const assistsResult = p.stats.filter(obj => {
                    return obj.name === 'goal_assist'
                })
                if (assistsResult.length > 0) {
                    assistsTextNode = document.createTextNode(assistsResult[0]['value']);
                    assists.appendChild(assistsTextNode);
                }

                // Calculate values
                let passesTotalValue = p.stats.find(p => p.name === 'fwd_pass').value + p.stats.find(p => p.name === 'backward_pass').value,
                    minutesPlayedValue =  p.stats.find(p => p.name === 'mins_played').value,
                    passesPerMinuteValue = (passesTotalValue / minutesPlayedValue).toFixed(2),
                    goalsValue = p.stats.find(p => p.name === 'goals').value,
                    appearancesValue = p.stats.find(p => p.name === 'appearances').value,
                    goalsPerMatchValue = (goalsValue / appearancesValue).toFixed(2);

                // Create text nodes
                let nameTextNode = document.createTextNode(`${p.player.name.first} ${p.player.name.last}`),
                    positionTextNode = document.createTextNode(`${p.player.info.position}`),
                    appearancesTextNode = document.createTextNode(`${appearancesValue}`),
                    goalsTextNode = document.createTextNode(`${goalsValue}`),
                    goalsPerMatchTextNode = document.createTextNode(goalsPerMatchValue),
                    passesPerMinuteTextNode = document.createTextNode(passesPerMinuteValue);

                // Append text nodes
                name.appendChild(nameTextNode);
                position.appendChild(positionTextNode);
                appearances.appendChild(appearancesTextNode);
                goals.appendChild(goalsTextNode);
                goalsPerMatch.appendChild(goalsPerMatchTextNode);
                passesPerMinute.appendChild(passesPerMinuteTextNode);

                // Append created elements
                li.appendChild(name);
                li.appendChild(position);
                li.appendChild(appearances);
                li.appendChild(goals);
                li.appendChild(assists);
                li.appendChild(goalsPerMatch);
                li.appendChild(passesPerMinute)

                ul.appendChild(li);

                
            })

    })
    .catch(function(error) {
        console.log(error);
    });

    ul.appendChild(list);

}
