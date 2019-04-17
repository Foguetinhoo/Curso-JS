// -------------- Variaveis de Elementos HTML -------------|

// Div que recebe o conteudo da lista
const $divTodo =  document.querySelector('.Todos');
//input que recebe os itens da lista
const $inputValue =  document.querySelector('.inputItem');
// Elemento que agrupará os list-itens
const $ulElement =  document.createElement('ul');
$ulElement.setAttribute('class','list-group list-group-flush');
// span que notifica se há itens ou não na lista
const $spanAviso = document.createElement('span');
$spanAviso.setAttribute('class','text-muted');
$spanAviso.setAttribute('id','avisoitem');
// span que serve como alerts referente a validação de input
const $erro = document.createElement('span');
//icone dos alerts
const $icone =  document.createElement('i');
// a variavel recebe o array do session Storage
const listaTodo =  JSON.parse(sessionStorage.getItem('lista-todo')) || [];
// span  que informa 
const $spanDelete =  document.createElement('span');
$spanDelete.setAttribute('id','spanDelete');
//------------------------ Funções ---------------------------------------|

const listaTodos = listaTodo.slice();

//---- Função pra renderizar a lista
function renderTodo()
{
    $spanAviso.innerHTML = "";
    $ulElement.innerHTML = "";
    if(listaTodo == "" )
    {
        let textSpan =  document.createTextNode('Nenhum item na lista');
        $spanAviso.appendChild(textSpan);
        document.getElementsByClassName('card-body')[1].append($spanAviso);
        console.log($spanAviso)
    }
    else
    {
        for (const todo of listaTodo) 
        {    
            let $listaItem =  document.createElement('li');
            $listaItem.setAttribute('class','list-group-item');
            let iconeBotao = document.createElement('i');
            iconeBotao.setAttribute('class','fas fa-trash');
            let nomeItem = document.createTextNode(todo); 
            let pos = listaTodo.indexOf(todo);
            let $botaoDelete =  document.createElement('button');   
            let $textBotao =  document.createTextNode('Excluir');
            $botaoDelete.setAttribute('class','removeItem');
            $botaoDelete.setAttribute('onclick','deleteTodo('+ pos+')');

            $botaoDelete.appendChild(iconeBotao);
            $botaoDelete.appendChild($textBotao); 
            $listaItem.appendChild(nomeItem);
            $listaItem.appendChild($botaoDelete);
            $ulElement.appendChild($listaItem);
            $divTodo.appendChild($ulElement);      
            console.log($botaoDelete);
        }
    }
}
renderTodo();
//------ Função para adicionar itens ao array(lista)
function AddTodo()
{    
    $spanAviso.innerHTML = "";
    listaTodo.push($inputValue.value.trim());
    setTimeout(function(){
        $erro.remove()
    },2000)
    $inputValue.value = "";
    renderTodo();
    salvarStorage();
}
//------ Função para remover itens do array(lista) apartir da posição atual
function deleteTodo(pos)
{
    $spanDelete.innerHTML="";
    listaTodo.splice(pos,1);
    mensagemDelete();
    renderTodo();
    salvarStorage();
}
$inputValue.focus();
//------- Função que exibe a mensagem  informando a deleção
function mensagemDelete()
{
    let textSpan =  document.createTextNode('O todo foi excluído com sucesso');
    $spanDelete.setAttribute('class','valid');
    $icone.setAttribute('class','fas fa-check');
    $spanDelete.appendChild(textSpan);
    $spanDelete.append($icone);   
    document.querySelector('.ulElement').appendChild($spanDelete);
                setTimeout(function(){
                    $spanDelete.remove();
                },2000)
}

//------ função para validar o formulário e inserir os itens
document.querySelector('#addTodo').addEventListener('click',function(e) 
{
    e.preventDefault(); 

    $erro.innerHTML =""; 
        if($inputValue.value.trim() === "")
        {
          
                $erro.setAttribute('class','error');
                $icone.setAttribute('class','fas fa-times');    
            
                let textSpan = document.createTextNode(`preencha o campo por favor`);
                $erro.appendChild(textSpan);
                $erro.appendChild($icone);
                document.querySelector('.input-group').insertAdjacentElement('afterend',$erro);
                $inputValue.focus();
                setTimeout(function(){
                    $erro.remove()
                },2000)
                
        }else
        {   
            if(listaTodo.indexOf($inputValue.value.trim()) > -1)
            {         
                $erro.setAttribute('class','warning');
                $icone.setAttribute('class','fas fa-exclamation');
                
                let textSpan = document.createTextNode(`Item já existente na lista`);
                $erro.appendChild(textSpan);
                $erro.appendChild($icone);
                document.querySelector('.input-group').insertAdjacentElement('afterend',$erro);
                setTimeout(function(){
                    $erro.remove()
                },2000)
            }
            else
            {
                $erro.setAttribute('class','valid');
                $icone.setAttribute('class','fas fa-check');
                let textSpan = document.createTextNode(`item adicionado com sucesso`);
                $erro.appendChild(textSpan);
                $erro.appendChild($icone);
                document.querySelector('.input-group').insertAdjacentElement('afterend',$erro);  
                AddTodo();
            }   
    }
});
//------ Função para salvar itens na sessão
function salvarStorage(){
    sessionStorage.setItem('lista-todo', JSON.stringify(listaTodo));
}

  