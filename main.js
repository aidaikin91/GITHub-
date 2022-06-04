
const input = document.querySelector('.input')
const btn = document.querySelector('.btn')
const output = document.createElement('div')
const mainCard = document.createElement('div')
mainCard.classList = 'mainCard'
document.body.append(output)

const API = 'https://api.github.com/users/';

const getUser = async() => {
    const url = API+input.value
    const req = await fetch (url)
    const res = await req.json()
    console.log(res);
    renderUser(res)
}

const renderUser = (el) => {
    let cardOne = document.createElement('div')
    
    let cardTwo = document.createElement('div')
    let cardThree = document.createElement('div')

    let userName = document.createElement('h3')
    userName.innerHTML = el.login
    let avatar = document.createElement('img')
    avatar.style.cssText=`
    width: 200px;
    height: 200px;
    border-radius: 5px;
    border: solid white;
    `
    avatar.src = el.avatar_url

    let repository = document.createElement('button')
    repository.innerHTML = el.public_repos + ' Repositories '
    repository.style.cssText = `
    height: 20px;
    width: 150px;
    `
    let followers = document.createElement('button')
    followers.innerHTML = el.followers + ' Followers '
    let following  = document.createElement('button')
    following.innerHTML = el.following + ' Following '

    cardThree.append(followers, following)
    cardThree.classList = 'cardThree'
    cardOne.append(avatar, userName, cardThree)
    cardOne.classList = 'cardOne'
    // cardOne.style.cssText=`
    // margin-right:120px;
    // `
    cardTwo.append(repository, mainCard)
    cardTwo.style.cssText=`
    display:flex;
    flex-direction:column;
    margin-left: 50px;
    margin-top: 10px;
    `
    output.append(cardOne, cardTwo)
    output.style.cssText=`
    display:flex;`

    followers.addEventListener('click', ()=>{
        getFollowers()
        mainCard.innerHTML=''
    })

    following.addEventListener('click',()=>{
        getFollowing()
        mainCard.innerHTML=''
    })
    repository.addEventListener('click',()=>{
        getRepository()
        mainCard.innerHTML=''
    })

}

btn.addEventListener('click',() => {
    getUser()
    output.innerHTML=''
    mainCard.innerHTML=''
})

const API_followers = 'https://api.github.com/users/';
const getFollowers = async() => {
  const value = input.value
  const req1 = await fetch(API_followers + value + '/followers')
  const res1 = await req1.json()
  console.log(res1);  
  renderFollowers(res1)
}

const renderFollowers = (el) => {
    el.map((el) => {
        let userCard = document.createElement('div')
        userCard.classList.add('userCard')
        let followerAvatar = document.createElement('img')
        followerAvatar.style.cssText=`
        border: solid;
        border-radius:15px;
        `
        followerAvatar.src = el.avatar_url
        followerAvatar.style.cssText=`
        height:80px;
        `
        let followerLogin = document.createElement('h3')
        followerLogin.innerHTML = el.login

        userCard.append(followerAvatar, followerLogin)
        mainCard.append(userCard)

        userCard.addEventListener('click', () =>{
        input.value = el.login
            getUser()
        output.innerHTML=''
        mainCard.innerHTML=''
        })
    })
}

const API_following = "https://api.github.com/users/";
const getFollowing = async() => {
    const value = input.value
    const req2 = await fetch (API_following + value + '/following')
    const res2 = await req2.json()
    console.log(res2);
    renderFollowing(res2)
}

const renderFollowing = (el) => {
    el.map((el) =>{
        let userCard = document.createElement('div')
        userCard.classList.add('userCard')
        let followingAvatar = document.createElement('img')
        followingAvatar.style.cssText=`
        border:solid;
        border-radius: 15px;
        `
        followingAvatar.src = el.avatar_url
        followingAvatar.style.cssText=`
        height:80px
        `
        let followingLogin = document.createElement('h3')
        followingLogin.innerHTML = el.login
        userCard.append(followingAvatar, followingLogin)
        mainCard.append(userCard)
        
        userCard.addEventListener('click',() => {
            input.value = el.login
            getUser()
            output.innerHTML=''
            mainCard.innerHTML=''
        })
    })
}

const API_repository = "https://api.github.com/users/";
const getRepository = async() => {
    const value = input.value
    const req3 = await fetch (API_repository + value + '/repos')
    const res3 = await req3.json()
    console.log(res3);
    renderRepository(res3)
}

const renderRepository = (el) => {
    el.map((el) => {
        let userCard = document.createElement('div')
        userCard.classList = 'userCard'

        let fullName = document.createElement('h4')
        fullName.innerHTML = ' * ' + el.full_name
    
        let language = document.createElement('h4')
        language.innerHTML = el.language

        userCard.append(fullName, language)
        userCard.style.cssText=`
        width: 700px;
        display: flex;
        flex-direction: column;
        `
        mainCard.append(userCard)

        userCard.addEventListener('click',() => {
            input.value=el.login
            getUser()
            output.innerHTML=''
            mainCard.innerHTML=''
        })
    })
}