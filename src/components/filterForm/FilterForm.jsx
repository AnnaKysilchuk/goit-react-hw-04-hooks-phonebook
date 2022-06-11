import PropTypes from 'prop-types';
import style from './FilterForm.module.css';

export const FilterForm = ({ value, onChange }) => {
    return (
        <div>
            <label>
                <p>Find contacts by name</p>
                <input
                    type="text"
                    name="filterInput"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    required
                    className={style.filterInputArea}
                    value={value}
                    onChange={onChange}
                />
            </label>
        </div>
    );
};

FilterForm.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};
