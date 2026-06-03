// Forma única de un pedido, compartida entre el checkout (cliente) y el servidor.
// El cliente envía un `Order`; el servidor lo valida y devuelve un `ValidatedOrder`
// con los precios recalculados desde Sanity (nunca se confía en los del cliente).

export interface OrderItem {
  slug: string;
  name: string;
  price: number; // precio enviado por el cliente — se revalida en el servidor
  qty: number;
}

export interface OrderCustomer {
  name: string;
  phone: string;
  email: string;
}

export interface OrderDelivery {
  address: string;
  floor?: string;
  notes?: string;
}

export interface Order {
  items: OrderItem[];
  method: "delivery" | "pickup";
  payMethod: "online" | "local";
  pickupTime: string; // "asap" o "HH:MM"
  customer: OrderCustomer;
  delivery?: OrderDelivery;
}

// Pedido ya validado en el servidor: precios y totales son de fiar.
export interface ValidatedOrderItem extends OrderItem {
  lineTotal: number;
}

export interface ValidatedOrder extends Omit<Order, "items"> {
  items: ValidatedOrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}
