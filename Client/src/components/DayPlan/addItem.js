import React, { PureComponent } from 'react';
import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import QuantitySelector from './quantitySelector';
import { Input } from '@mui/material';

class AddItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
      food_name: '',
      serving_unit: '',
      serving_weight_grams: 0,
      serving_qty: 1,
      nf_calories: 0,
      serving_size: 0,
      meal_type: '',
      thumb: '',
      total_grams: 0,
      total_calories: 0
    };
  }

  onComponentDidUpdate() {
    console.log('AddItem component updated:');
  }

  componentDidMount() {
    const data = this.props.data;
    this.setState({
      russian_name: data.russian_name,
      food_name: data.food_name,
      serving_unit: data.serving_unit,
      serving_weight_grams: data.serving_weight_grams,
      serving_qty: 1,
      nf_calories: data.nf_calories,
      serving_size: data.serving_size,
      meal_type: 'breakfast',
      thumb: data.thumb,
      total_grams: data.serving_weight_grams,
      total_calories: data.nf_calories,
      b: data.b,
      z: data.z,
      u: data.u
    });
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  handleMealTimeChange = event => {
    this.setState({ meal_type: event.target.value });
  };

  handleClose = () => {
    this.props.onClose();
  };

  handleUpdateQty = qty => {
    qty = Math.min(qty, 1000)/this.state.serving_weight_grams
    this.setState({
      total_grams: this.state.serving_weight_grams * qty,
      total_calories: this.state.nf_calories * qty,
      serving_qty: qty,
      b: this.props.data.b * qty,
      z: this.props.data.z * qty,
      u: this.props.data.u * qty,
    });
  };

  handleAddItem = () => {
    this.props.onSearchItemAdded(this.state);
    this.setState({
      open: false
    });
  };

  render() {
    return (
      <Modal
        aria-labelledby="add-item-modal"
        aria-describedby="add an item to your daily intake"
        className="modal"
        open={this.state.open}
        onClose={this.handleClose}
        closeAfterTransition
        disableAutoFocus={true}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500
        }}
      >
        <Fade in={this.state.open}>
          <div className="add-item-modal" style={{ zIndex: 9999 }}>
            <div className="modal__content">
              <div className="add-item-modal__row padding-bottom-16">
                <div className="modal__row-item">
                  <img src={this.state.thumb} alt="item name" title="item name" />
                  <div className="item-name">{this.state.russian_name}</div>
                </div>
                <div className="modal-close">
                  <CloseIcon onClick={this.handleClose} color="primary" />
                </div>
              </div>
              <div className="add-item-modal__row padding-bottom-20">
                <div className="calculated-weight">
                  <input type='number' value={Math.round(this.state.total_grams)}
                    onChange={(event) => {
                      this.handleUpdateQty(event.target.value) 
                    }} />
                  <span className="caption">Грамм</span>
                </div>
                <div className="calculated-calories">
                  <span className="large-text">{Math.round(this.state.total_calories)}</span>
                  <span className="caption">Калорий</span>
                </div>
              </div>
              <div className="add-item-modal__row padding-bottom-16 last-child">
                <div className="day-selector">
                  <div className="category-title" style={{ margin: '0', marginBottom: '10px' }}>
                    Добавить на сегодня
                  </div>
                  <Select
                    value={this.state.meal_type}
                    onChange={this.handleMealTimeChange}
                    input={<Input style={{ zIndex: 9999 }} />}
                    placeholder="Breakfast"
                  >
                    <MenuItem value="">
                      <em>Пусто</em>
                    </MenuItem>
                    <MenuItem value={'breakfast'}>Завтрак</MenuItem>
                    <MenuItem value={'lunch'}>Обед</MenuItem>
                    <MenuItem value={'dinner'}>Ужин</MenuItem>
                    <MenuItem value={'snack'}>Перекус</MenuItem>
                  </Select>
                </div>
                <Button
                  disabled={this.state.total_grams === 0}
                  variant="contained"
                  onClick={this.handleAddItem}
                  color="primary"
                // className={this.classes.button}
                >
                  ДОБАВИТЬ
                </Button>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    );
  }
}

export default AddItem;
