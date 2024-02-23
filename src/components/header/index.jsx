import { useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Components
import Cart from "../cart/index";

// Styles
import * as Styles from "./styles";

import { loginUser, logoutUser } from "../../redux/user/actions";

function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);

  const { currentUser } = useSelector((rootReducer) => rootReducer.userReducer);
  const { products } = useSelector((rootReducer) => rootReducer.cartProduct);
  const dispatch = useDispatch();

  const productsCount = useMemo(() => {
    return products.reduce((acc, curr) => acc + curr.quantity, 0);
  }, [products]);

  const handleCartClick = () => {
    setCartIsVisible(true);
  };

  const logarAoClicarNoBotao = () => {
    dispatch(loginUser({ name: "Felipe", email: "felipe@rocha.com" }));
  };

  const sairAoClicarNoBotao = () => {
    dispatch(logoutUser());
  };

  return (
    <Styles.Container>
      <Styles.Logo>Redux Shopping</Styles.Logo>
      <Styles.Buttons>
        {currentUser ? (
          <div onClick={sairAoClicarNoBotao}>Sair</div>
        ) : (
          <div onClick={logarAoClicarNoBotao}>Login</div>
        )}
        <div onClick={handleCartClick}>Carrinho ({productsCount})</div>
      </Styles.Buttons>

      <Cart isVisible={cartIsVisible} setIsVisible={setCartIsVisible} />
    </Styles.Container>
  );
}

export default Header;
