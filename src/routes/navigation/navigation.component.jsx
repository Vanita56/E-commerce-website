import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';

import CartIcon from '../../Components/cart-icon/cart-icon.component';
import CartDropdown from '../../Components/cart-dropdown/cart-dropdown.component';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import { signOutUser } from '../../firebase/firebase.utils';
import { NavigationContainer,
          NavLinks,
          NavLink,
          LogoContainer,} from './navigation.styles';

const Navigation = () => {
const {currentUser, setCurrentUser}= useContext(UserContext);
const {isCartOpen} =useContext(CartContext);

const signOutHandler =async()=>{
  await signOutUser();
  setCurrentUser(null);
}

  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
          <NavLink to='/shop'>
            SHOP
          </NavLink>

          {currentUser ? (
            <NavLink as ='span' onChange={signOutHandler}>
              {' '}
              SIGN OUT{' '}
            </NavLink>
          ) : (
            <NavLink to='/auth'>
            SIGN IN
          </NavLink>
          )
          }
          <CartIcon />
        </NavLinks>
       {isCartOpen &&  <CartDropdown /> }   
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;