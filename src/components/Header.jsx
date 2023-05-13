import logo from '../assets/logo.svg'
import moon from '../assets/icon-moon.svg';
import purpleMoon from '../assets/icon-moon-purple.svg'
import Switch from './Switch';
import DropdownMenu from './DropdownMenu';
import fonts from '../js/fonts';
import PropTypes from 'prop-types';
import useToggle  from '../js/useToggle';
import {useEffect} from 'react';


function Header(props) {

  Header.propTypes = {
    fontCurr: PropTypes.string.isRequired,
    setFont: PropTypes.func.isRequired,
  };

  const [isDropdownExpanded, toggleDropdown] = useToggle(false);
  const [isDarkTheme, toggleMode] = useToggle(localStorage.getItem('theme-color') === 'dark');

  useEffect(()=> {
    document.documentElement.className = isDarkTheme ? 'dark':'';
    localStorage.setItem('theme-color', isDarkTheme ? 'dark' : 'light');
  },[isDarkTheme])

  function selectItem(value) {
    props.setFont(value)
    toggleDropdown()
  }

  const fontList = Object.entries(fonts).map(([key, value]) => (
    <li key={key} className={`${value} hover:text-purple cursor-pointer`} onClick={() => selectItem(key)}>
      <button>{key}</button>
    </li>
  ))

  return (
    <header  className="flex justify-between mt-6 mb-6 tablet:mt-[3.625rem] tablet:mb-[3.25rem] " >
      <img src={logo} alt="logo-icon" className="w-[28px] tablet:w-[32px]" ></img>
      <div className='flex items-center'>
        <DropdownMenu fontCurr={props.fontCurr} setFont={props.setFont} toggle={toggleDropdown} isExpanded={isDropdownExpanded}>
          {fontList}
        </DropdownMenu> 
        <div className='flex items-center gap-[12px]'>
         <Switch checked={isDarkTheme} toggle={toggleMode}/>
          <img src={isDarkTheme ? purpleMoon : moon} className="ml-3 tablet:ml-5" alt="moon-icon" aria-hidden="true"></img>
        </div>
      </div>
    </header>
  )
}

export default Header