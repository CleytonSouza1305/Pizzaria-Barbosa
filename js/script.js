document.getElementById('finish-btn').addEventListener('click', function() {
   const open = checkOpen()
   if (!open) {
      const data = new Date()
      const actualtime = data.getHours()
      let horasRest = 17 - actualtime

      Toastify({
         text: `Ops, o restaurante esta fechado no momento, volte daqui à ${horasRest} hrs`,
         duration: 3000,
         close: true,
         gravity: "top", 
         position: "right", 
         stopOnFocus: true, 
         style: {
         background: "#ef4444",
         borderRadius: "6px",
         fontWeight: 'bold',
         },
      }).showToast()
   }
})

const openModal = () => {
   const janelaModal = document.getElementById('modal')
   janelaModal.classList.remove('display-none')
   janelaModal.classList.add('display-flex')

   janelaModal.addEventListener('click', function(ev) {
     if (ev.target === janelaModal) {
      janelaModal.classList.remove('display-flex')
      janelaModal.classList.add('display-none')
     }
   })

   document.getElementById('back-btn').addEventListener('click', function() {
      janelaModal.classList.remove('display-flex')
      janelaModal.classList.add('display-none')
   })

   const open = checkOpen()

  if (open && cart.length !== 0) {
   document.getElementById('finish-btn').addEventListener('click', function() {
      const finalWindow = document.getElementById('finish-window')

      finalWindow.classList.remove('display-none')
      finalWindow.classList.add('display-flex')

      finalWindow.addEventListener('click', function(ev) {
         if (ev.target === finalWindow) {
            finalWindow.classList.remove('display-flex')
            finalWindow.classList.add('display-none')
            const label = document.getElementById('error-label')
            const input = document.getElementById('address')
               label.classList.remove('error-txt')
               input.classList.remove('error')
               input.value = ''
         }

         document.getElementById('voltar-btn').addEventListener('click',function() {
            finalWindow.classList.remove('display-flex')
            finalWindow.classList.add('display-none')
            const label = document.getElementById('error-label')
               label.classList.remove('error-txt')
               input.classList.remove('error')
               input.value = ''
         })

         const input = document.getElementById('address')

         document.getElementById('submit').addEventListener('click', function() {

            input.addEventListener('input', function() {
               const label = document.getElementById('error-label')
               label.classList.remove('error-txt')
               this.classList.remove('error')
            })

            if (input.value !== '') {
               const cartItems = cart.map(function(item) {
                  return (
                     `Item: ${item.name}
                     Quantidade: ${item.quantity} 
                     Preço: R$${item.price * item.quantity} | `
                  )
               }).join("")
            
               const message = encodeURIComponent(cartItems)
               const phone = '11985961027'
            
               window.open(`https://wa.me/${phone}?text=${message} Endereço: ${input.value}`, '_blank')
               const label = document.getElementById('error-label')
               label.classList.remove('error-txt')
               input.classList.remove('error')
            
               cart.length = 0
               input.value = ''
               renderCart()
            } else {
               const label = document.getElementById('error-label')
               label.classList.add('error-txt')
               input.classList.add('error')
            }
         })
      })
   })
  } 

}

const openWindow = document.querySelector('.div-cart').addEventListener('click', openModal)

const cart = []

const checkOpen = () => {

   let isOpen = false

   const data = new Date()
   const actualHour = data.getHours()

   if (actualHour >= 17 || actualHour < 0) {
      const elementTimer = document.getElementById('el-timer')
      elementTimer.classList.remove('close')
      elementTimer.classList.add('open')
      isOpen = true
   } else {
      const elementTimer = document.getElementById('el-timer')
      elementTimer.classList.remove('open')
      elementTimer.classList.add('close')
      isOpen = false
   }

   renderCart()
   return isOpen
}

function renderCart() {
   const totalItens = document.getElementById('itens-lenth')
      totalItens.textContent = cart.length   

      const divItens = document.getElementById('itens-information')

      divItens.textContent = ''

      const divOverflow = document.createElement('div')
      divOverflow.className = 'divOverflow'

      let indice = 0
      let totalFinal = 0

   for (let i = 0; i < cart.length; i++) {
      const dadDiv = document.createElement('div')
      dadDiv.className = 'div-pai'
      const secondDiv = document.createElement('div')
      secondDiv.className = 'second-div'

      const image = cart[i].image
      const img = document.createElement('img')
      img.className = 'image-cart'
      img.src = image

      const nameEl = document.createElement('p')
      nameEl.className = 'title-cart-item'
      nameEl.innerText = cart[i].name

      const priceEl = document.createElement('p')
      priceEl.className = 'price-cart-item'
      priceEl.innerText = 'R$ ' + cart[i].price * cart[i].quantity

      const quantityEl = document.createElement('span')
      quantityEl.className = 'quantity-cart-item'
      quantityEl.innerText = cart[i].quantity

      const removeItem = document.createElement('button')
      removeItem.innerText = 'REMOVER'
      removeItem.className = 'btns remove-cart-btn'
      removeItem.id = 'btn-remove'
      removeItem.setAttribute('data-index', indice)

      secondDiv.append(nameEl, priceEl, quantityEl)

      dadDiv.append(img, secondDiv, removeItem)

      divOverflow.append(dadDiv)

      indice++
   }

   for (let i = 0; i < cart.length; i++) {
      totalFinal += cart[i].price * cart[i].quantity
  }
  
  const totalPrice = document.getElementById('total-price');
  totalPrice.innerText = 'R$ ' + totalFinal.toFixed(2).replace('.', ',')

   divItens.append(divOverflow)

      const removeOfCart = document.querySelectorAll('.remove-cart-btn')
      removeOfCart.forEach(function(button) {
      button.addEventListener('click', function() {

      const index = button.dataset.index

      if (cart[index].quantity > 1) {
         cart[index].quantity -= 1
         renderCart()
      } else {
         parseInt(index)
         cart.splice(index, 1)
         renderCart()
      }
      
   })
   })
}

const addToCartBtns = document.querySelectorAll('.btn-add-to-cart')
addToCartBtns.forEach(function(btn) {
   btn.addEventListener('click', function() {
         const name = btn.dataset.name
         const price = btn.dataset.price
         const image = btn.dataset.image

         let itemFound = false

         cart.forEach(function(item) {
            if (item.name === name) {
               item.quantity += 1
               itemFound = true
            } 
         })

         if (!itemFound) {
            const item = {
               name: name,
               price: price,
               quantity: 1,
               image: image
            }
         
         cart.push(item)
         }
    
      console.log(cart);

      renderCart()
   })
})

checkOpen()
   
