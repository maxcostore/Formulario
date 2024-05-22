// import { callAuth, postApi} from './postAPI.js'

// ANIMAÇÃO AJUSTE
let fix_section = document.querySelector('.fix-section')
let form_section = document.querySelector('.form-section')

fix_section.addEventListener('click', () =>{
    fix_section.classList.add('clicado')
})
form_section.addEventListener('click', () =>{
    fix_section.classList.remove('clicado')
})
// pegar dados do formulario
function dataForms(){
  let nNF = document.querySelector('#nf').value
  let nSKU = document.querySelector('#sku').value
  let nCUSTO = document.querySelector('#custo').value
  let nDESCONTO = document.querySelector('#desconto').value
  let nDESCRICAO = document.querySelector('#descricao').value

  return [nNF, nSKU, nCUSTO, nDESCONTO, nDESCRICAO]
}

// ação ao clicar em enviar
let formulario = document.querySelector('form')
formulario.addEventListener('submit', (e)=>{
  e.preventDefault()
  dataForms().forEach((i) => {  
    console.log(i); // pega os dados do forms
  })

  //adicionar animação do botão de enviar
  let anim = document.querySelector('.aaa')
  let su = document.querySelector('#sub')
  su.value = ""
  anim.classList.add('icon-carr')
  
  let frag = String(window.location.hash)
  let tokken = frag.slice(14,231)
  console.log(tokken)

  postSheet(tokken)
})
async function postSheet(tk){

  const linkPlanilha = '18IwAfmhFimL3vO4JG81ZJPUxGJmsI2A_QUD0U93qBLI'
  const range = 'sheet1!A2'
  const endPoint = `https://sheets.googleapis.com/v4/spreadsheets/${linkPlanilha}/values/${range}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`
  
  let payload = JSON.stringify({
    value: {
      row: ['saymor']
    }
  })
  
  const options = {
    'method': 'POST',
    'mode': 'no-cors',
    'headers':{
      'Content-Type': "applications/json",
      'Authorizations': `Bearer ${tk}`
    },

    'payload': payload
  }

  let result = await fetch(endPoint,options)
  .then(response => response.json())
  .then(data =>{ return data})
  console.log(result)
}