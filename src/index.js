import "./styles.css";
import { cry as message} from "./message";
   
const test = document.createElement("div");
test.textContent = message;
   
document.body.appendChild(test);