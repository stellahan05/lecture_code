import { buyCoffee } from "./cart";
import { BankCardReader } from "./bank";

console.log(buyCoffee(new BankCardReader(), "iced"));
