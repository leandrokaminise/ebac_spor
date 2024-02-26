import { useEffect, useState } from 'react'
import Header from './components/Header'
import Produtos from './containers/Produtos'
import { useDispatch, useSelector } from 'react-redux'

import { GlobalStyle } from './styles'
import { adicionar } from './redux/reducers/carrinho'
import { RootState } from './redux/store'
import  { favoritar } from './redux/reducers/favorito'
import { useGetProdutosQuery } from './services/api'

export type Produto = {
  id: number
  nome: string
  preco: number
  imagem: string
}

function App() {
  const [produtos, setProdutos] = useState<Produto[]>([])  

  const carrinho = useSelector((state: RootState) => state.carrinho)
  const favoritos = useSelector((state: RootState) => state.favorito)

  const dispatch = useDispatch()

  const {
    data
  } = useGetProdutosQuery() 

  useEffect(() => {
    if (data) {
      setProdutos(data as Produto[]) 
    }
  }, [data])

  function adicionarAoCarrinho(produto: Produto) {
    dispatch(adicionar(produto))
  }

  function favoritarFn(produto: Produto) {
    dispatch(favoritar(produto))
  }

  return (
    <>
      <GlobalStyle />
      <div className="container">
        <Header favoritos={favoritos.itens} itensNoCarrinho={carrinho.itens} />
        <Produtos
          produtos={produtos}
          favoritos={favoritos.itens}
          favoritar={favoritarFn}
          adicionarAoCarrinho={adicionarAoCarrinho}
        />
      </div>
    </>
  )
}

export default App
