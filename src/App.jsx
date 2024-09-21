import { useState, useEffect } from "react";
import Header from "./components/Header";
import Guitar from "./components/Guitar";
import Footer from "./components/footer";
import { db } from "./data/db";

function App() { // mi funcion principal 

  const initial = () =>{
    const localStorageCard = localStorage.getItem('card')
    return localStorageCard ? JSON.parse(localStorageCard) : []
  }

  const [data] = useState(db);
  const [card, setCard] = useState(initial);

  const MAX_ITEMS = 5
  const MIN_ITEM = 1
  useEffect(()=> {
    localStorage.setItem('card', JSON.stringify(card))
  }, [card])

  //funcion para agregar al carrito mis productosd
  function addToCard (item){ //funcion que ayuda agregar elementos al carrito 
    const itemExist = card.findIndex(guitar => guitar.id === item.id)
      if (itemExist >= 0) { //comprovobacion si existe en el carrito
        if (card[itemExist].quantity >= MAX_ITEMS) return
        const updateCard = [...card]
        updateCard[itemExist].quantity++
        setCard(updateCard)
      }else{
        item.quantity = 1
        setCard([...card, item])
      }  
      
  }
//funcion para eliminar elementos de mi carrrito 
  function removeToCard(id){
  setCard(prevCard => prevCard.filter(guitar=> guitar.id != id))  
}

//FUNCION PARA DECREMETAR 
function DecreaseQuantity (id){
  const decrementCard = card.map(item => {
    if (item.id === id && item.quantity > MIN_ITEM) {
      return {
        ...item,
        quantity: item.quantity - 1
      }
    }
    return item
  })
  setCard(decrementCard)
}

//funcion que me ayude a incremetar en el carrito 
function increaseQuantity (id){
  const updateCard = card.map(item => {
    if (item.id === id && item.quantity < MAX_ITEMS) {
      return {
        ...item,
        quantity: item.quantity + 1
      }
    }
    return item
  })
  setCard(updateCard)
}

//funcion para limpiar el carrito 
function clearCard (){
  setCard([])
}



  return (// retorna lo que queremos mostrart en pantalla 
    <>
          <Header 
            card = {card}
            removeToCard = {removeToCard}
            DecreaseQuantity = {DecreaseQuantity}
            increaseQuantity = {increaseQuantity}
            clearCard = {clearCard}
          />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
            <Guitar 
            key={guitar.id}
            guitar={guitar} 
            addToCard = {addToCard}
            setCard = {setCard}
            />
          ))}
        </div>
      </main>
          <Footer/>
      
    </>
  );
}

export default App;
