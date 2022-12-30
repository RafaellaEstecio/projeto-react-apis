import { HeaderContainer } from "./HeaderStyle";
import imgLogo from "../../assets/img/logoimg.png";
import ClickMe from "../Chakra/ClickMe";

function Header(props){

    return(
        <HeaderContainer>
            <div className="navegar-home">
                <div></div>
            <div className="logo">
                <img className="img-logo" src={imgLogo} alt="Logo icon"/>
            </div>
                <ClickMe text={'Pokédex'}/>
            </div>
          
        </HeaderContainer>
    );

}

export default Header;
