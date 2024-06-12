const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user) {
        this.userProfile.innerHTML = `<div class="info">
                                <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                <div class="data">
                                    <h1>${user.name ?? 'Não possui nome cadastrado 😢'} </h1>
                                    <p>${user.bio ?? 'Não possui bio cadastrada 😢'} </p>
                                    <p>🤳${user.followers} Seguidores</p>
                                    <p>🤝 ${user.following} Seguindo</p>
                                </div>
                            </div>`

        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href ="${repo.html_url}" target="_blank">${repo.name}<br>
                                                                       <div class="datas">
                                                                          <p>🍴 ${repo.forks}</P>
                                                                          <p>⭐ ${repo.stargazers_count}</P>
                                                                          <p>👀 ${repo.watchers}</P>
                                                                          <p>📖 ${repo.language}</P>
                                                                       </div>
                                                                    </a>
                                                                </li>
                                                                `)

        if (user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <div class="itens">
                                                    <ul>${repositoriesItens}</ul>
                                                </div>
                                           </div>`
        }

        this.userProfile.innerHTML += `
        <div class="events-section">
            <h2>Eventos</h2>
        </div>`

        user.events.forEach(event => {
            const eventName = event.repo.name

            if (event.payload) {
                if (event.payload.commits) {
                    event.payload.commits.forEach(msg => {
                        const commitMSG = msg.message

                        this.userProfile.innerHTML += `
                                         <span class="activityListClass">
                                             <ul>
                                                 <li>
                                                     <p><strong>${eventName}</strong> - ${commitMSG}</p>
                                                 </li>
                                             </ul>
                                         </span>`
                    })
                }
            }
        })

        user.events.forEach(create => {
            const createEvent = create.repo.name
            const text = 'Sem mensagem de commit'

            if (create.payload.description) {
                this.userProfile.innerHTML += `
                                         <span class="activityListClass">
                                             <ul>
                                                 <li>
                                                     <p><strong>${createEvent}</strong> - ${text}</p>
                                                 </li>
                                             </ul>
                                         </span>`
            }
        })
    },
    renderNotFound() {
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }

}

export { screen }