//styles
import { DeleteBox, FixedContainer } from "../Modal.styles";
import { Container, TopBox, Box } from "./FiltersModal.styles";

//icon
import { FaTimes } from "react-icons/fa";

//redux
import { useDispatch } from "react-redux";
import { toggleFiltersModal } from "../../../features";

const FiltersModal = ({ handleFilter, handleClear, filter }) => {
  const dispatch = useDispatch();

  return (
    <FixedContainer>
      <Container>
        <DeleteBox
          onClick={() => dispatch(toggleFiltersModal(false))}
          className="filters__close"
        >
          <FaTimes />
        </DeleteBox>
        <TopBox>
          <div className="filters__title">ФИЛЬТРЫ</div>
          <small onClick={handleClear} className="filters__delete">
             ОЧИСТИТЬ
          </small>
        </TopBox>

        <Box>
          <div className="filters__subtitle">ПРИОРЕТЕТ</div>
          <div className="filters__check">
            <input
              type="radio"
              name="filter"
              value="low"
              id="low"
              checked={filter === "low"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor="low"> По возрастанию</label>
          </div>
          <div className="filters__check">
            <input
              type="radio"
              name="filter"
              value="high"
              id="high"
              checked={filter === "high"}
              onChange={(e) => handleFilter(e)}
            />
            <label htmlFor="high"> По убыванию</label>
          </div>

          <Box>
            <div className="filters__subtitle">Дата</div>
            <div className="filters__check">
              <input
                type="radio"
                name="filter"
                value="latest"
                id="new"
                checked={filter === "latest"}
                onChange={(e) => handleFilter(e)}
              />
              <label htmlFor="new"> Сортировать по последней</label>
            </div>
            <div className="filters__check">
              <input
                type="radio"
                name="filter"
                value="created"
                id="create"
                checked={filter === "created"}
                onChange={(e) => handleFilter(e)}
              />
              <label htmlFor="create"> Сортировать по дате создания</label>
            </div>

            <div className="filters__check">
              <input
                type="radio"
                name="filter"
                value="edited"
                id="edit"
                checked={filter === "edited"}
                onChange={(e) => handleFilter(e)}
              />
              <label htmlFor="edit">Сортировать по дате изменения</label>
            </div>
          </Box>
        </Box>
      </Container>
    </FixedContainer>
  );
};

export default FiltersModal;
