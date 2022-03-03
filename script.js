const input = document.querySelector('input');
const addButton = document.querySelector('button');
const citiesBoard = document.querySelector('.board');
const closePopupButton = document.querySelector('.closePopupButton');
const errorWindow = document.querySelector('.errorWindow');

const KEY_API = '&appid=cd78937615559cce5b2af9ace6041f1a';
const LINK_TO_API = 'api.openweathermap.org/data/2.5/weather?q=';
const UNITS_API = '&units=metric';

const KEY_API_IMG = "&key=AIzaSyDXwwrKDFdNWWkmX4KVYcfLDvVx_2D7uSw";
const PROXY_URL = "https://cors-anywhere.herokuapp.com/";
const placesRequestURL_start_firstQuery = "maps.googleapis.com/maps/api/place/findplacefromtext/json?input=";
const placesRequestURL_end_firstQuery = "&inputtype=textquery&fields=name,photos";

addButton.addEventListener("click", addCity);
closePopupButton.addEventListener("click", closeErrorWindow);
input.addEventListener("keyup", checkIsItEnter);

let arrayOfUncensoredWords = ['BEJZ', 'BEJ', 'YBEJZ' ,'ILABEJZ' ,'ĄIBEJZ' ,'ANABEJZ' ,'ALABEJZ' ,'AŁABEJZ'
,'LABEJZ' ,'ŁABEJZ' ,'CABEJZ' ,'ĆABEJZ' ,'YCĄJAWYRSEZ' ,'ĆAWYRSEZ'
,'YCĄJAWYRSAZ' ,'ĆAWYRSAZ' ,'MYNARSAZ' ,'ĆARSAZ' ,'YCĄJAZCINREIPAZ'
,'ĆAZCINREIPAZ' ,'ALODREIPAZ' ,'ĄLODREIPAZ' ,'ALILODREIPAZ'
,'AŁILODREIPAZ' ,'LILODREIPAZ' ,'ŁILODREIPAZ' ,'ILODREIPAZ'
,'CILODREIPAZ' ,'ĆILODREIPAZ' ,'YCAJALADREIPAZ' ,'YCĄJALADREIPAZ'
,'ILALADREIPAZ' ,'ALALADREIPAZ' ,'AŁALADREIPAZ' ,'EICJALADREIPAZ'
,'JALADREIPAZ' ,'ŁALADREIPAZ' ,'AJALADREIPAZ' ,'CALADREIPAZ'
,'ĆALADREIPAZ' ,'ALADREIPAZ' ,'ZSYZRPEIPAZ' ,'EICYZRPEIPAZ'
,'YMYZRPEIPAZ' ,'YZRPEIPAZ' ,'AZRPEIPAZ' ,'ĄZRPEIPAZ' ,'ALYZRPEIPAZ'
,'AŁYZRPEIPAZ' ,'LYZRPEIPAZ' ,'ŁYZRPEIPAZ' ,'YZRPEIPAZ' ,'CYZRPEIPAZ'
,'ĆYZRPEIPAZ' ,'EICSIBEJAZ' ,'EICŚIBEJAZ' ,'IMYTSIBEJAZ' ,'MYTSIBEJAZ'
,'ATSIBEJAZ' ,'HCYTSIBEJAZ' ,'YTSIBEJAZ' ,'ETSIBEJAZ' ,'IMYNABEJAZ'
,'MYNABEJAZ' ,'HCYNABEJAZ' ,'YNABEJAZ' ,'ENABEJAZ' ,'INABEJAZ'
,'ANABEJAZ' ,'ILABEJAZ' ,'ALAIBEJAZ' ,'AŁABEJAZ' ,'LAIBEJAZ' ,'ŁAIBEJAZ'
,'AIBEJAZ' ,'ĄIBEJAZ' ,'EIBEJAZ' ,'CABEJAZ' ,'ĆABEJAZ' ,'ALILODREIPYW'
,'AŁILODREIPYW' ,'LILODREIPYW' ,'ŁILODREIPYW' ,'ILILODREIPYW'
,'ALODREIPYW' ,'ĄLODREIPYW' ,'EICILODREIPYW' ,'YMILODREIPYW'
,'ILODREIPYW' ,'CILODREIPYW' ,'ĆILODREIPYW' ,'ĆALADREIPYW'
,'ALALADREIPYW' ,'AŁALADREIPYW' ,'LALADREIPYW' ,'ŁALADREIPYW'
,'JALADREIPYW' ,'ALADREIPYW' ,'CALADREIPYW' ,'ĆALADREIPYW'
,'LADREIPYW' ,'LYZRPEIPYW' ,'ŁYZRPEIPYW' ,'ALYZRPEIPYW' ,'AŁYZRPEIPYW'
,'YZRPEIPYW' ,'ALAZRPEIPYW' ,'AŁAZRPEIPYW' ,'LAZRPEIPYW' ,'ŁAZRPEIPYW'
,'AZRPEIPYW' ,'CAZRPEIPYW' ,'ĆAZRPEIPYW' ,'YMEIBEJYW' ,'EICEIBEJYW'
,'EIBEJYW' ,'ZSEIBEJYW' ,'AIBEJYW' ,'ĄIBEJYW' ,'EIBEJYW' ,'YŁABEJYW'
,'AŁABEJYW' ,'CABEJYW' ,'ŁABEJYW' ,'ILABEJYW' ,'CABEJYW' ,'ĆABEJYW'
,'UDZIPW' ,'CILODREIPW' ,'ĆILODREIPW' ,'LODREIPW' ,'YCAJALADREIPW'
,'YCĄJALADREIPW' ,'CALADREIPW' ,'ĆALADREIPW' ,'AIWRUKW' ,'CIWRUKW'
,'ĆIWRUKW' ,'EICAIWRUKW' ,'EICIWRUKW' ,'YMIWRUKW' ,'AIWRUKW' ,'ĄIWRUKW'
,'ILAIWRUKW' ,'ĄJAIWRUKW' ,'EICAIWRUKW' ,'IWRUKW' ,'CIWRUKW' ,'ĆIWRUKW'
,'ACAJAIWRUKW' ,'ACĄJAIWRUKW' ,'YCAJAIWRUKW' ,'YCĄJAIWRUKW' ,'LAIWRUKW'
,'ŁAIWRUKW' ,'AIWRUKW' ,'IWRUKW' ,'CAIWRUKW' ,'ĆAIWRUKW' ,'EICEIBEJW'
,'YMEIBEJW' ,'AIBEJW' ,'ĄIBEJW' ,'EIBEJW' ,'CABEJW' ,'ĆABEJW'
,'INELODREIPU' ,'ALODREIPU' ,'ĄLODREIPU' ,'ILODREIPU' ,'CILODREIPU'
,'ĆILODREIPU' ,'ILODREIPU' ,'ALADREIPU' ,'CALADREIPU' ,'ĆALADREIPU'
,'ALABEJU' ,'AŁABEJU' ,'EIBEJU' ,'YNABEJU' ,'ANABEJU' ,'LABEJU'
,'ŁABEJU' ,'CABEJU' ,'ĆABEJU' ,'ĆIPUDU' ,'LEIZDREIMŚ' ,'WONYSNIKUS'
,'WÓNYSNIKUS' ,'IWONYSNIKUS' ,'MONYSNIKUS' ,'YNYSNIKUS' ,'NYSNIKUS'
,'JARS' ,'CAJARS' ,'CĄJARS' ,'YCAJARS' ,'YCĄJARS' ,'CARS' ,'ĆARS'
,'ALODREIPS' ,'ĄLODREIPS' ,'OŁILODREIPS' ,'AŁILODREIPS' ,'ILODREIPS'
,'CILODREIPS' ,'ĆILODREIPS' ,'YCAJALADREIPS' ,'YCĄJALADREIPS'
,'ALALADREIPS' ,'EICLALADREIPS' ,'LALADREIPS' ,'AŁALADREIPS'
,'ŁALADREIPS' ,'ALADREIPS' ,'CALADREIPS' ,'ĆALADREIPS' ,'ACAJAZRPEIPS'
,'ACĄJAZRPEIPS' ,'YCAJAZRPEIPS' ,'YCĄJAZRPEIPS' ,'AJAZRPEIPS'
,'ĄJAZRPEIPS' ,'EICJAZRPEIPS' ,'JAZRPEIPS' ,'AZRPEIPS' ,'CAZRPEIPS'
,'ĆAZRPEIPS' ,'OWTSNYSYWRUKS' ,'OWTSŃYSYWRUKS' ,'IKSNYSYWRUKS'
,'IKSŃYSYWRUKS' ,'YNYSYWRUKS' ,'UNYSYWRUKS' ,'MENYSYWRUKS'
,'ANYSYWRUKS' ,'WONYSYWRUKS' ,'WÓNYSYWRUKS' ,'NYSYWRUKS' ,'ULEIWRUKS'
,'MELEIWRUKS' ,'ALEIWRUKS' ,'LEIWRUKS' ,'ĆIWRUKS' ,'AHCUDREIPZOR'
,'ILODREIPZOR' ,'ELODREIPZOR' ,'CILODREIPZOR' ,'ĆILODREIPZOR'
,'ALADREIPZOR' ,'CALADREIPZOR' ,'ĆALADREIPZOR' ,'ĄIBEJZOR' ,'AŁABEJZOR'
,'EIBEJZOR' ,'CABEJZOR' ,'ĆABEJZOR' ,'AWRQ' ,'CILODREIPYZRP'
,'ĆILODREIPYZRP' ,'YCAJALADREIPYZRP' ,'YCĄJALADREIPYZRP'
,'ILODREIPYZRP' ,'ALADREIPYZRP' ,'CALADREIPYZRP' ,'ĆALADREIPYZRP'
,'ACAJAZRPEIPYZRP' ,'ACĄJAZRPEIPYZRP' ,'YCAJAZRPEIPYZRP'
,'YCĄJAZRPEIPYZRP' ,'CAZRPEIPYZRP' ,'ĆAZRPEIPYZRP' ,'LABEJYZRP'
,'ŁABEJYZRP' ,'ALABEJYZRP' ,'AŁABEJYZRP' ,'EIBEJYZRP' ,'CABEJYZRP'
,'ĆABEJYZRP' ,'CILODREIPEZRP' ,'ĆILODREIPEZRP' ,'ACAJALADREIPEZRP'
,'ACĄJALADREIPEZRP' ,'YCAJALADREIPEZRP' ,'YCĄJALADREIPEZRP'
,'ALADREIPEZRP' ,'CALADREIPEZRP' ,'ĆALADREIPEZRP' ,'ILABEJYZRP'
,'CABEJEZRP' ,'ENABEJEZRP' ,'ĆABEJEZRP' ,'ĆAHCUROP' ,'CAHCUROP'
,'CALADREIPZOROP' ,'ALADREIPZOROP' ,'ĆALADREIPZOROP' ,'YNOLODREIPOP'
,'INELODREIPOP' ,'ENOLODREIPOP' ,'MYNOLODREIPOP' ,'UMENOLODREIPOP'
,'OGENOLODREIPOP' ,'ILODREIPOP' ,'CILODREIPOP' ,'ĆILODREIPOP'
,'ĆALADREIPOP' ,'CALADREIPOP' ,'ALADREIPOP' ,'OLABEJOP' ,'CABEJOP'
,'ĆABEJOP' ,'MEBEJOP' ,'IMYNABEJOP' ,'MYNABEJOP' ,'HCYNABEJOP'
,'YNABEJOP' ,'INABEJOP' ,'UMENABEJOP' ,'OGENABEJOP' ,'INABEJOP'
,'IMABEJOP' ,'ABEJOP' ,'BEJOP' ,'ILODREIPDOP' ,'CILODREIPDOP'
,'ĆILODREIPDOP' ,'YCAJALADREIPDOP' ,'YCĄJALADREIPDOP' ,'ALADREIPDOP'
,'CALADREIPDOP' ,'ĆALADREIPDOP' ,'UDZIP' ,'CANDZIP' ,'ĆĄNDZIP'
,'EIZDZIP' ,'EIZDŹIP' ,'ĘDZIP' ,'EDZIP' ,'ĄDZIP' ,'ADZIP' ,'CEIZDREIP'
,'ĆEIZDREIP' ,'YCĄZDREIP' ,'IKŁODREIP' ,'YNOLODREIP' ,'ENOLODREIP'
,'ANOLODREIP' ,'KINLODREIP' ,'JINLODREIP' ,'YTĘINLODREIP' ,'EINLODREIP'
,'ALENLODREIP' ,'AŁĘNLODREIP' ,'LANLODREIP' ,'ŁĄNLODREIP' ,'CANLODREIP'
,'ĆĄNLODREIP' ,'ZSILODREIP' ,'YTEINLODREIP' ,'YTĘINLODREIP'
,'ILODREIP' ,'ALILODREIP' ,'AŁILODREIP' ,'LILODREIP' ,'ŁILODREIP'
,'CILODREIP' ,'EICILODREIP' ,'ĆILODREIP' ,'ĄLODREIP' ,'ALODREIP'
,'CELODREIP' ,'ĘLODREIP' ,'UINELODREIP' ,'MEINELODREIP' ,'EINELODREIP'
,'ELODREIP' ,'LODREIP' ,'ACALODREIP' ,'ACĄLODREIP' ,'YCALODREIP'
,'YCĄLODREIP' ,'ALODREIP' ,'ĄLODREIP' ,'ULDREIP' ,'LEDREIP' ,'YNOZRPEIP'
,'YTEINZRPEIP' ,'YTĘINZRPEIP' ,'AKZCIP' ,'ALODREIPO' ,'ĄLODREIPO'
,'ILODREIPO' ,'CILODREIPO' ,'ĆILODREIPO' ,'LODREIPO' ,'YCAJALADREIPO'
,'YCĄJALADREIPO' ,'ALADREIPO' ,'CALADREIPO' ,'ĆALADREIPO'
,'YCĄJAZRPEIPO' ,'ŁILODREIPDO' ,'ILODREIPDO' ,'CILODREIPDO'
,'ĆILODREIPDO' ,'ACAJALADREIPDO' ,'ACĄJALADREIPDO' ,'YCAJALADREIPDO'
,'YCĄJALADREIPDO' ,'ILODREIPDO' ,'ALILODREIPDO' ,'AŁILODREIPDO'
,'LILODREIPDO' ,'ŁILODREIPDO' ,'LODREIPDO' ,'CALADREIPDO'
,'ĆALADREIPDO' ,'ALYZRPEIPDO' ,'AŁYZRPEIPDO' ,'LYZRPEIPDO'
,'ŁYZRPEIPDO' ,'YZRPEIPDO' ,'CAZRPEIPDO' ,'ĆAZRPEIPDO' ,'YCAJAWYRSBO'
,'YCĄJAWYRSBO' ,'CAWYRSBO' ,'ĆAWYRSBO' ,'ALALADREIPWAN' ,'AŁALADREIPWAN'
,'LALADREIPWAN' ,'ŁALADREIPWAN' ,'CALADREIPWAN' ,'ĆALADREIPWAN'
,'CILODREIPAN' ,'ĆILODREIPAN' ,'YCAJALADREIPAN' ,'YCĄJALADREIPAN'
,'CALADREIPAN' ,'ĆALADREIPAN' ,'AŁALADREIPOAN' ,'ALALADREIPOAN'
,'AŁALADREIPOAN' ,'LALADREIPOAN' ,'ŁALADREIPOAN' ,'CALADREIPOAN'
,'ĆALADREIPOAN' ,'AIBEJAN' ,'ĄIBEJAN' ,'EIBEJAN' ,'ANABEJAN'
,'ĄNABEJAN' ,'YNABEJAN' ,'ENABEJAN' ,'ALABEJAN' ,'AŁABEJAN' ,'LABEJAN'
,'ŁABEJAN' ,'CABEJAN' ,'ĆABEJAN' ,'ĆYŻOŁRABAN' ,'HCACBEJOKTAM'
,'IMACBEJOKTAM' ,'ACBEJOKTAM' ,'ĄCBEJOKTAM' ,'YCBEJOKTAM' ,'ACBEJOKTAM'
,'IMASATUK' ,'HCASATUK' ,'WOSATUK' ,'WÓSATUK' ,'YSATUK' ,'MESATUK'
,'EISATUK' ,'ASATUK' ,'SATUK' ,'YNOZSIWRUK' ,'MENOZSIWRUK' ,'ANOZSIWRUK'
,'NOZSIWRUK' ,'EZCZSIWRUK' ,'IKIWRUK' ,'KIWRUK' ,'KEŁODIWRUK'
,'CIWRUK' ,'ĆIWRUK' ,'ACIWRUK' ,'YCĄIWRUK' ,'ZRAIWRUK' ,'IKSWERUK'
,'IMAWRUK' ,'HCAWRUK' ,'YWRUK' ,'OWRUK' ,'AKSIWRUK' ,'EIWRUK' ,'ĘWRUK'
,'EWRUK' ,'ĄWRUK' ,'IMAWRUK' ,'AAWRUK' ,'AWRUK' ,'OWTSWERUK' ,'OKSWERUK'
,'AKSWERUK' ,'ĄKSWERUK' ,'JEIKSWERUK' ,'AKSWERUK' ,'IKSWERUK' ,'WERUK'
,'OWTSERUK' ,'AWRÓK' ,'AWROOK', 'AVROOC' ,'TUBEJ' ,'JINBEJ' ,'EINBEJ' ,'ALENBEJ'
,'AŁĘNBEJ' ,'ANBEJ' ,'ĄNBEJ' ,'LANBEJ' ,'ŁĄNBEJ' ,'ĆANBEJ' ,'CĄNBEJ'
,'CANBEJ' ,'ĆĄNBEJ' ,'YWILBEJ' ,'ĘIBEJ' ,'EIBEJ' ,'ĄIBEJ' ,'AIBEJ'
,'JECAIBEJ' ,'JECĄIBEJ' ,'OGECAIBEJ' ,'OGECĄIBEJ' ,'ACAIBEJ' ,'ACĄIBEJ'
,'YCAIBEJ' ,'YCĄIBEJ' ,'EICBEJ' ,'IMYNABEJ' ,'HCYNABEJ' ,'INABEJ'
,'ANABEJ' ,'ĄNABEJ' ,'JENABEJ' ,'MYNABEJ' ,'ANABEJ' ,'IMYNABEJ'
,'MEIKNABEJ' ,'OKNABEJ' ,'AKNABEJ' ,'ENABEJ' ,'YNABEJ' ,'ŁABEJ'
,'LABEJ' ,'AKABEJ' ,'KABEJ' ,'AIBEJ' ,'ĄIBEJ' ,'EIBEJ' ,'LABEJ' ,'ŁABEJ'
,'CABEJ' ,'ĆABEJ' ,'UJUH' ,'MEJUH' ,'EJUH' ,'AJUH' ,'AINJUH' ,'KEJUH'
,'JUH' ,'EPUD' ,'YPUD' ,'AKZCEPUD' ,'AICPUD' ,'ĄPUD' ,'EIPUD' ,'APUD'
,'CILODREIPOD' ,'ĆILODREIPOD' ,'YCAJALADREIPOD' ,'YCĄJALADREIPOD'
,'ILODREIPOD' ,'ELODREIPOD' ,'ĘLODREIPOD' ,'LILODREIPOD' ,'ŁILODREIPOD'
,'ILODREIPOD' ,'ALALADREIPOD' ,'AŁALADREIPOD' ,'LALADREIPOD'
,'ŁALADREIPOD' ,'ALADREIPOD' ,'CALADREIPOD' ,'ĆALADREIPOD'
,'CAZRPEIPOD' ,'ĆAZRPEIPOD' ,'EIBEJOD' ,'ĘIBEJOD' ,'MALABEJOD'
,'MAŁABEJOD' ,'MELABEJOD' ,'MEŁABEJOD' ,'ALABEJOD' ,'AŁABEJOD'
,'LABEJOD' ,'ŁABEJOD' ,'EIBEJOD' ,'CABEJOD','ĆABEJOD' ,'EIPIC'
,'ĄPIC' ,'EPIC' ,'ĘPIC' ,'APIC' ,'EWOJUHC' ,'AWOJUHC' ,'YWOJUHC'
,'AINJUHC' ,'MEJUHC' ,'UJUHC' ,'KEJUHC' ,'AJUHC','JUHC'];

let isInitial = true;
let arrayOfCitiesName = [];

async function main()
{
    addCity("Budapeszt");
    addCity("Zambrów");
    addCity("Grądy-Woniecko");
    addCity("Łomża");
    addCity("Ankara");
    addCity("Kraków");
    addCity("Ateny");
    addCity("Moskwa");
    addCity("Rzym");
    addCity("Gdańsk");
    isInitial = false;
}

async function getWeather(city)
{
    city = city.toUpperCase();
    if(city === "")
    {
        reportTheError("Nie możesz wyszukać pustej wartości w bazie danych");
        return null;
    }

    city = city.split("").reverse().join("");
    if(arrayOfUncensoredWords.includes(city))
    {
        citiesBoard.style.display = "none";
        closePopupButton.style.display = "none";
        errorWindow.style.height = "85px";
        reportTheError("Ty gnoju, matka Cię kultury nie nauczyła? Kończymy zabawę za 3 sekundy");
        await sleep(3000);
        window.close();
    }
    city = city.split("").reverse().join("");

    const URL = "https://" + LINK_TO_API + city + KEY_API + UNITS_API;
    const URL_IMG_FIRST_QUERY = "https://" + placesRequestURL_start_firstQuery + city + KEY_API_IMG + placesRequestURL_end_firstQuery;

    let weatherInformator = new Object();
    let photoReference = '';

    //by making the request through a CORS proxy server I avoid problem with the lack of the necessary Access-Control-Allow-Origin header
    await axios.get(PROXY_URL + URL_IMG_FIRST_QUERY)                        
        .then(resp => photoReference = resp.data.candidates[0].photos[0].photo_reference)        
        .catch(console.error);                                              
    
    const URL_IMG_SECOND_QUERY = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoReference}${KEY_API_IMG}&maxwidth=400&maxheight=400`;

    let image;
    let imgBlob;

    if(photoReference)
    {
        // now I use 'fetch' cause 'axios' transform image to text format
        //fetch method is perfectly suited to handling raw image data
        imgBlob = await fetch(PROXY_URL + URL_IMG_SECOND_QUERY)
            .then(resp => resp.blob()) // blob() is a constructor which returns new Blob object
            .catch(console.error);
        
        image = (window.URL || window.webkitURL).createObjectURL(imgBlob);
    }
    weatherInformator.image = image;

    await axios.get(URL)
        .then(resp =>
        {
            weatherInformator.cityName = resp.data.name;
            weatherInformator.temperature = resp.data.main.temp;
            weatherInformator.humidity = resp.data.main.humidity;
            weatherInformator.pressure = resp.data.main.pressure;
        })
        .catch(error => console.log(error));

    if(typeof weatherInformator.cityName === 'undefined')
    {
        reportTheError("Podane miasto nie widnieje w naszej bazie danych lub w ogóle nie istnieje");
        return null;
    }

    if(arrayOfCitiesName.includes(weatherInformator.cityName.toUpperCase()))
    {
        reportTheError("To miasto zostało już dodane przez Ciebie lub przez inicjalizator");
        return null;
    }

    arrayOfCitiesName.push(weatherInformator.cityName.toUpperCase());
    
    return weatherInformator;
}

async function addCity(city)
{
    let weatherInformator;

    if(isInitial)
        weatherInformator = await getWeather(city);
    else
    { 
        let cityName = input.value;
        input.value = "";
        console.log(cityName);
        weatherInformator = await getWeather(cityName);
    }

    if(weatherInformator === null)
    {
        return;
    }

    let newCityCard = document.createElement("div");
    newCityCard.className = "cityCard";
    let newBgImg = document.createElement("div");
    newBgImg.className = "imageContainer";

    if(weatherInformator.image === null)
        newBgImg.style.backgroundImage = "Graphics/city.png";
    else    
        newBgImg.style.backgroundImage = `url(${weatherInformator.image})`;

    let newHeader = document.createElement("h1");
    newHeader.textContent = weatherInformator.cityName.toUpperCase();

    if(weatherInformator.cityName == "Grądy-Woniecko")
        newHeader.textContent = "Grądy".toUpperCase(); // no co? jestem lokalnym patriotą

    let newGridMiniContainer = document.createElement("div");
    newGridMiniContainer.className = "miniContainer";

    for(let i = 0; i < 6 ; i++)
    {
        let newP = document.createElement("p");
        newGridMiniContainer.appendChild(newP);
    }

    newGridMiniContainer.children[0].textContent = "TEMPERATURA";
    newGridMiniContainer.children[1].textContent = weatherInformator.temperature + "°C";
    newGridMiniContainer.children[2].textContent = "WILGOTNOŚĆ";
    newGridMiniContainer.children[3].textContent = weatherInformator.humidity + "%";
    newGridMiniContainer.children[4].textContent = "CIŚNIENIE";
    newGridMiniContainer.children[5].textContent = weatherInformator.pressure + " hpa";

    let newButton = document.createElement("button");
    newButton.textContent = "x";
    newButton.className = "deleteBtn";
    newButton.addEventListener("click", deleteCity);

    newCityCard.appendChild(newBgImg);
    newCityCard.appendChild(newHeader);
    newCityCard.appendChild(newGridMiniContainer);
    newCityCard.appendChild(newButton);
    
    citiesBoard.appendChild(newCityCard);
}

function sleep(miliseconds)
{
    return new Promise(resolve => setTimeout(resolve, miliseconds));
}

function deleteCity(e)
{
    let nameToRemove = e.target.parentNode.children[1].textContent;
    arrayOfCitiesName = arrayOfCitiesName.filter(item => {return item !== nameToRemove});
    citiesBoard.removeChild(e.target.parentNode);
}

function closeErrorWindow()
{
    errorWindow.style.display = "none";
}

function reportTheError(errorMessage)
{
    errorWindow.style.display = "flow-root";
    errorWindow.children[1].textContent = errorMessage;
}

function checkIsItEnter(e)
{
    if(e.key === 'Enter')
        addCity();
    return;
}

main();