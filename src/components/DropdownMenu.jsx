import chevron from '../assets/icon-arrow-down.svg';
import { CSSTransition } from 'react-transition-group';
import {useRef} from 'react';
import PropTypes from 'prop-types';
import useOutside from '../js/useOutside';


function DropdownMenu(props) {

  const wrapperRef = useRef(null)
  useOutside(wrapperRef, props.isExpanded, props.toggle)

  DropdownMenu.propTypes = {
    fontCurr: PropTypes.string.isRequired,
    setFont: PropTypes.func.isRequired,
    children : PropTypes.array.isRequired,
    isExpanded : PropTypes.bool.isRequired,
    toggle : PropTypes.func.isRequired
    
  };

  return (
    <div className='relative'  ref={wrapperRef}>
      <button className='h-[32px] font-bold text-body-s tablet:text-[1.125rem] flex items-center px-4 tablet:px-[1.625rem] border-r-gray-2 border-r-[1px]'
      onClick={props.toggle} aria-expanded={props.isExpanded}>
        <span className="mr-4">{props.fontCurr}</span>
        <img className="w-[12px]" src={chevron} alt="chevron"></img>
      </button>
      <CSSTransition 
      in={props.isExpanded} 
      timeout={150} 
      unmountOnExit 
      classNames="select-box-body">
        <ul className="select-box-body absolute p-6 font-bold shadow-dropdown dark:shadow-dropdown-dark rounded-2xl min-w-[183px] mt-[0.625rem] right-0 flex flex-col gap-4 bg-white dark:bg-black-2">
          {props.children}
        </ul>
      </CSSTransition>
    </div>
  )
}

export default DropdownMenu