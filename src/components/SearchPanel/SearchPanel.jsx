import React, { useState, useContext } from 'react';
import './SearchPanel.css';
import Input from '../UI/Input/Input';
import Button from '../UI/Button/Button';
import { MainContext } from '../../MainContext';

const SearchPanel = props => {
  const { changeSearchString } = useContext(MainContext);

  const { changeTheme } = useContext(MainContext);

  const [field, setField] = useState('');

  const [buttons] = useState([
    {
      text: '',
      type: 'button',
    },
    {
      text: '',
      type: 'submit',
    },
  ]);

  const handleSubmit = (event) => {
    event.preventDefault();
    changeSearchString(field);
  };

  const changeThemeHandler = () => {
    changeTheme()
  }

  return (
    <div className="SearchPanel">
      <form onSubmit={handleSubmit}>
        <Input value={field} onChange={e => setField(e.target.value)} className='Test' />
        {
          buttons.map((item, index) => (
            <Button key={index} text={item.text} type={item.type} />
          ))
        }
        <button onClick={() => changeThemeHandler()}>lol</button>
      </form>
    </div>
  );
};

export default SearchPanel;
