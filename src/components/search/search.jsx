import './search.css'

export const Search = ({ setSearch }) => {
    return (
        <input
            placeholder="Поиск товара..."
            onChange={(e) => setSearch(e.target.value)}
            className="search__input"
        >
        </input>
    )
}