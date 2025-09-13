export interface orderWelcome {
    shippingAddress?:  ShippingAddress;
    taxPrice:          number;
    shippingPrice:     number;
    totalOrderPrice:   number;
    paymentMethodType: string;
    isPaid:            boolean;
    isDelivered:       boolean;
    _id:               string;
    user:              orderUser;
    cartItems:         orderCartItem[];
    paidAt?:           Date;
    createdAt:         Date;
    updatedAt:         Date;
    id:                number;
    __v:               number;
}

export interface orderCartItem {
    count:   number;
    _id:     string;
    product: orderProduct;
    price:   number;
}

export interface orderProduct {
    subcategory:     orderBrand[];
    ratingsQuantity: number;
    _id:             string;
    title:           string;
    imageCover:      string;
    category:        orderBrand;
    brand:           orderBrand;
    ratingsAverage:  number;
    id:              string;
}

export interface orderBrand {
    _id:       string;
    name:      string;
    slug:      string;
    image?:    string;
    category?: string;
}

export interface ShippingAddress {
    details: string;
    phone:   string;
    city:    string;
}

export interface orderUser {
    _id:   string;
    name:  string;
    email: string;
    phone: string;
}
