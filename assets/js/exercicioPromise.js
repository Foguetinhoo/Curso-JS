const inputValue = document.querySelector('.inputItem');
var $ulElement = document.querySelector('#ulElement');
$ulElement.setAttribute('class','list-group list-group-flush');
const btn =  document.getElementById('addTodo');

const $erro = document.createElement('span');
const $icone =  document.createElement('i');
let $loadingElement =  document.createElement('div');
$loadingElement.setAttribute('class','Loading');
$loadingElement.style.textAlign ="center";  

let $erroPromise = document.createElement('span');
$erroPromise.setAttribute('class','text-muted');
$erroPromise.setAttribute('id','erroPromise');
$erroPromise.style.textAlign ="center";

//  var $loadingElement = document.getElementsByClassName('.Loading')[0];
// $loadingElement.style.display ="none";


//Exercicio 1
//
//  function checkAge()
// {
//     return new Promise(function(resolve,reject)
//     {
//         setTimeout(function(){
//             var idade  = inputValue.value;
//             return idade >= 18 ? resolve():reject();
//         },200)
//     })
// };

// btn.addEventListener('click',function(){
//     checkAge()
// .then(function(response){
//     alert('Adulto');
// })
// .catch(function(error){
//     alert('Nao é adulto mano')});
// });

function renderLoading(loading)
{
    $loadingElement.innerHTML="";
    for(let cont= 0; cont <= 11; cont++)
    {
      var $div =  document.createElement('div');
       $loadingElement.append($div);
       document.getElementsByClassName('card-body')[1].appendChild($loadingElement);
    }
}

function renderError(loading)
{
  document.getElementsByClassName('card-body')[1].innerHTML = "";
  $ulElement.innerHTML ="";
  $erroPromise.style.color ="red";
  let erroText =  document.createTextNode('Usuario não encontrado');
  $erroPromise.appendChild(erroText);
  document.getElementsByClassName('card-body')[1].appendChild($erroPromise);

}
console.log(typeof inputValue ); 
function renderList(data) 
{
  $loadingElement.remove();
  $ulElement.innerHTML ="";
  $erroPromise.remove();

  if(data == "")
  {
    let textErro = document.createTextNode('Nenhum repositorio encontrado');
    $erroPromise.setAttribute('class','text-muted');
    $erroPromise.appendChild(textErro);
    document.getElementsByClassName('card-body')[1].appendChild($erroPromise); 
  }else
  {
    for(dado of data)
    {
      const $liElement = document.createElement('li');
      $liElement.setAttribute('class','list-group-item');
      const liText = document.createTextNode(`repositorio ID ${dado.id}:  ${dado.name}`);
      $liElement.appendChild(liText);
      $ulElement.appendChild($liElement);
        console.log($liElement)
    }   
  }
}

 function enviaPromise() 
 {
  
    $erro.innerHTML = "";
    $ulElement.innerHTML = "";
    $erroPromise.innerHTML = "";
    document.getElementById('user').innerHTML ="";
    const usuario =  inputValue.value;
      if(usuario !== "")
      {
        renderLoading();
        axios.get(`https://api.github.com/users/${usuario}/repos`)
        .then((response)=>{
          console.log(response.data);
          document.getElementById('user').innerHTML =` - ${usuario}`;
          renderList(response.data);
          inputValue.value="";
        })
        .catch(function(){
            renderError();
        })
       
      }else
      {
        $erro.setAttribute('class','error');
        $icone.setAttribute('class','fas fa-times');        
        let textSpan = document.createTextNode(`preencha o campo por favor`);
        $erro.appendChild(textSpan);
        $erro.appendChild($icone);
        document.querySelector('.input-group').insertAdjacentElement('afterend',$erro);
        return ;
      }  
  }
btn.addEventListener('click',enviaPromise);
