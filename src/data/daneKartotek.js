import daneZPliku from '../firmy3.json'
export const data=daneZPliku.map((firma)=>{
    return{
        ...firma,
        getAdres(){
            let adres=""
            adres=this.ulica+", "+this.kodPocztowy+" "+this.miasto
            return adres
        }
    }
})