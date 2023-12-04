const form = document.getElementById("novoItem")
const lista = document.getElementById("lista")
const itens = JSON.parse(localStorage.getItem("itens")) || [] // JSON.parse() converte string em valores JS

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

// criando a função/evento de criar/adicionar elementos/itens na nossa "mochila de viagem"
form.addEventListener("submit", (evento) => { // submit é o "enviar" do formulário
    evento.preventDefault()

    const nome = evento.target.elements['nome']
    const quantidade = evento.target.elements['quantidade']

    const existe = itens.find(elemento => elemento.nome === nome.value)

    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    }

    if (existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual
    } else {
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 : 0;

        criaElemento(itemAtual)

        itens.push(itemAtual)
    }

    localStorage.setItem("itens", JSON.stringify(itens))
    // localStorage armazena dados do tipo string e, para armazenar objetos, arrays, e listas, é preciso convertê-los utilizando o método JSON.stringify() que converte valores em JavaScript para string

    // para limpar o input após clicar no botão "Adicionar"
    nome.value = ""
    quantidade.value = ""
})

// inserindo dados no localStorage
function criaElemento(item) {
    const novoItem = document.createElement('li')
    novoItem.classList.add("item")

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem) // appendChild() insere um novo "nó" na estrutura do DOM de um documento

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)

}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

// adicionando um botão de deletar em cada elemento da lista
function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function () {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

// adicionando a função que ao clicar no botão "X", deletará certo elemento da lista
function deletaElemento(tag, id) {
    tag.remove()

    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    localStorage.setItem("itens", JSON.stringify(itens))
}
