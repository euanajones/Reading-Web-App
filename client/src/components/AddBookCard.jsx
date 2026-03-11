import './AddBookCard.css';

function AddBookForm() {

    const currentPage = () => {
        // var checkbox = document.querySelector('.add-book-form__checkbox');
        // var currentValue = 
        // if (checkbox.checked) {
        //     checkbox.value = "true";
        // } else {
        //     checkbox.value = "false";
        // }
    };


    return (
        <div className="add-book-card">
            <div className="add-book-card__corner-accent" />

            <p className="add-book-card__eyebrow">Library</p>
            <h1 className="add-book-card__heading">Add New Book</h1>

            <div className="add-book-card__divider">
                <div className="add-book-card__divider-line" />
                <div className="add-book-card__divider-dot" />
                <div className="add-book-card__divider-line add-book-card__divider-line--reverse" />
            </div>

            <form>
                <div className="add-book-card__layout">

                    {/* Left — cover upload */}
                    <div className="add-book-cover">
                        <div className="add-book-cover__dropzone">
                            <input
                                type="file"
                                accept="image/*"
                            />
                                <>
                                    <span className="add-book-cover__icon">📷</span>
                                    <span className="add-book-cover__hint">Upload Cover</span>
                                </>
                        </div>
                        <p className="add-book-cover__limit">3MB max</p>
                    </div>

                    {/* Right — fields */}
                    <div className="add-book-fields">
                        <div>
                            <div className="add-book-form__field-group">
                                <label className="add-book-form__label">Title</label>
                                <input
                                    type="text"
                                    required
                                    className="add-book-form__input"
                                />
                            </div>

                            <div className="add-book-form__field-group">
                                <label className="add-book-form__label">Author</label>
                                <input
                                    type="text"
                                    required
                                    className="add-book-form__input"
                                />
                            </div>

                            <div className="add-book-form__pages-row">
                                <div className="add-book-form__field-group" style={{ marginBottom: 0 }}>
                                        <label className="add-book-form__label">Pages</label>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <input
                                                type="number"
                                                min="1"
                                                required
                                                className="add-book-form__input"
                                            />
                                            <span className="add-book-form__checkbox-label" style={{ padding: '0 10px'}}> of </span>
                                            <input
                                                type="number"
                                                min="1"
                                                required
                                                className="add-book-form__input"
                                            />
                                        </div>  
                                </div>
                            </div>

                            <label className="add-book-form__checkbox-group" style={{justifyContent: 'center'}}>
                                <input
                                    type="checkbox"
                                    className="add-book-form__checkbox"
                                />
                                <span className="add-book-form__checkbox-label">Currently Reading?</span>
                            </label>
                        </div>

                        <button type="submit" className="add-book-form__button">
                            Add Book
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddBookForm;