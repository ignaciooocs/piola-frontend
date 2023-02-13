import search from '../assets/search2.png'

const SearchEmpty = () => {
  return (
    <div className='empty-container'>
      <div className='search-img-container'>
        <img className='search-img' src={search} />
      </div>
      <p>busca a tus amigos</p>
    </div>
  )
}
export default SearchEmpty
