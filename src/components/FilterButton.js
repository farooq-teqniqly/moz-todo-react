function FilterButton({ text, setFilter, isPressed }) {
    return (<button type="button" className="btn toggle-btn" aria-pressed={isPressed} onClick={() => setFilter(text)}>
        <span className="visually-hidden">Show </span>
        <span>{text} </span>
        <span className="visually-hidden">tasks</span>
    </button>);
}

export default FilterButton;