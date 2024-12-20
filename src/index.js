import "./styles.css";
import { greeting } from "./greeting.js";

console.log(greeting);

import odinImage from "./image.png";
   
const image = document.createElement("img");
image.src = odinImage;
   
document.body.appendChild(image);