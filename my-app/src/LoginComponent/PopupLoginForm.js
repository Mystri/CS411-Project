import Popup from 'reactjs-popup';
import LoginForm from "./LoginForm"

export default () => (
    <Popup trigger={<button> Login</button>} position="right center">
        <div>
            <LoginForm/>
        </div>
    </Popup>
  );