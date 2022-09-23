

export const CategoryColorList = ({ updateCategoryColor }) => {



    return (
        <section className="category-color-list menu-item flex" >
            {[...Array(20)].map((val, idx) => <div
                name={`lb${idx + 1}`}
                className="color-label"
                key={idx}
                style={{ backgroundColor: `var(--lb${idx + 1})` }}
                onClick={updateCategoryColor}>
            </div>)}
        </section>
    )
}

