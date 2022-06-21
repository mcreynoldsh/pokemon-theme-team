number = Math.floor(Math.random() * 899)

// axios.get("https://pokeapi.co/api/v2/pokemon/").then((response)=>{
//     //if this runs, promise is resolving
//     console.log(response.data.results[0])
//     // console.log(response.data.types[0].type.name)
//     return response.data.types[0].type
// }).then((typeData)=>{
//     console.log(typeData)
// }).catch((error)=>{
//     //this is promise rejecting
//     console.log("no good: " + error)
// })

const getMon = async () => {
    //inside async you can use await keyword
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/' + number)
    const typeUrl = response.data.types[0].type.url
    const typeResponse = await axios.get(typeUrl)
    const pokes = []
    pokes.push(response)
    while(pokes.length < 6){
        potPoke = await axios.get('https://pokeapi.co/api/v2/pokemon/' + typeResponse.data.pokemon[Math.floor(Math.random() * typeResponse.data.pokemon.length)].pokemon.name)
        if (potPoke.data.sprites.front_default != null){
            pokes.push(potPoke)
        }
    }
    console.log(pokes)
    console.log(pokes[0].data.sprites.front_default)
    replaceImages(pokes);
}


function replaceImages(pokes){
    let images = document.body.getElementsByTagName("img");
    console.log(images)
    for (let i = images.length-1; i>=0; i--){
        let image = images[i];
        if (image) {
            let pokeImage = document.createElement("img");
            pokeImage.setAttribute("src",pokes[i].data.sprites.front_default)
            image.parentNode.replaceChild(pokeImage, image);
        }    
    }
}