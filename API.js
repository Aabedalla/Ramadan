 let citys = [
  {
    arabicName: 'الخليل',
    name:'Al Khalīl'
  },
  {
    arabicName: "بيت لحم",
    name:'Bayt Laḩm'
  },
  {
    arabicName: 'القدس',
    name:'Al Quds'
  },
  {
    arabicName: 'رام الله',
    name:'Ramallah'
  }
 ]

 for (city of citys){
    const content = `<option>${city.arabicName}</option>`
    document.getElementById('city').innerHTML += content
 }

document.getElementById('city').addEventListener("change", function(){
    let CityName = ""
    for (city of citys){
    if(city.arabicName == this.value){
      CityName = city.name
    }
  }
  GetPrayerTimeByCity(CityName)
  document.getElementById('CityChange').innerHTML = this.value  
})

function GetPrayerTimeByCity(CityName){
let params = {
    country: 'PS',
    city: CityName
}

// Optionally the request above could also be done as
axios.get('https://api.aladhan.com/v1/timingsByCity', {
    params: params
  })
  .then(function (response) {
    const tims = response.data.data.timings
    const redabul = response.data.data.date.readable
    const weakDay = response.data.data.date.hijri.weekday.ar

    console.log(weakDay)
    filTime('fajr-time', tims.Fajr)
    filTime('sunrise-time', tims.Sunrise)
    filTime('dhuhr-time', tims.Dhuhr)
    filTime('asr-time', tims.Asr)
    filTime('maghrib-time', tims.Maghrib)
    filTime('isha-time', tims.Isha)
    document.getElementById('dataToday').innerHTML = redabul;
    document.getElementById('today').innerHTML = weakDay;
  })
  .catch(function (error) {
    console.log(error);
  }) 

}
 
GetPrayerTimeByCity('Al Khalīl')
function filTime(id, time){
    document.getElementById(id).innerHTML = time
}