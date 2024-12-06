import { CartCounter } from "@/shopping-cart";


export const metadata = {
 title: 'Shopping Cart',
 description: 'Un simple contador',
};


export default function CounterPage() {

  

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <span>Productos en el carrito</span>
      <CartCounter value={ 20 } />
    </div>
  );
}